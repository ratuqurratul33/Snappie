import { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import UploadPhotoPopup from "../../components/user/UploadPhotoPopup.jsx";
import FilterOptions from "../../components/user/FilterOptions";
import CopyrightFooter from "../../components/CopyrightFooter";
import { useNavigate } from "react-router-dom";

const FILTER_STYLES = {
  normal: "none",
  mono: "grayscale(100%) contrast(1)",
  sepia: "sepia(70%) contrast(1) brightness(1.1)",
  soft: "brightness(1.1) blur(1px) contrast(0.9) saturate(1.4)",
  pop: "saturate(2) contrast(1) brightness(1.1)",
  retro: "contrast(1.1) sepia(0.7) saturate(0.8) hue-rotate(-10deg)",
};

const PAUSE_BETWEEN_SHOTS = 1200; // jeda antar foto saat strip 3/4 lanjut otomatis

export default function TakeCamera() {
  const location = useLocation();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const photosCount = Number(location.state?.photoMode) || 3;

  const [delay, setDelay] = useState(Number(location.state?.delay) || 3);
  const [countdown, setCountdown] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCounting, setIsCounting] = useState(false);
  const [selectFilterOpen, setSelectFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const [filterLocked, setFilterLocked] = useState(false);
  const [autoCapturing, setAutoCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const navigate = useNavigate();

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const delayOptions = [3, 5, 10];

  // true selama satu strip (3/4 foto) sedang berjalan otomatis; dibaca lewat
  // ref (bukan cuma state) supaya efek di bawah selalu lihat nilai TERBARU
  // tanpa tergantung urutan render/efek lain -- ini yang bikin "lanjut
  // otomatis"-nya solid walau di device yang lambat.
  const sequenceActiveRef = useRef(false);
  const nextShotTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (nextShotTimeoutRef.current) clearTimeout(nextShotTimeoutRef.current);
    };
  }, []);

  // Ambil satu frame dari video sekarang jadi data URL (dengan filter CSS
  // yang lagi aktif ikut ter-bake ke gambarnya).
  const captureFrame = useCallback(() => {
    const video = webcamRef.current?.video;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.filter = FILTER_STYLES[selectedFilter] || "none";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  }, [selectedFilter]);

  // Mulai satu hitung mundur + capture. Dipakai baik untuk foto pertama
  // (klik shutter) maupun tiap foto berikutnya dalam strip yang sama.
  const fireShot = useCallback(() => {
    setCountdown(delay);
    setIsCounting(true);
  }, [delay]);

  // start countdown — dipicu klik tombol shutter (cuma sekali per strip;
  // sisa foto di strip 3/4 lanjut sendiri lewat efek capture di bawah)
  const startCountdown = () => {
    if (capturedImages.length >= photosCount) return;

    // Setelah mulai pertama kali, pilihan efek dikunci & ditutup permanen
    if (!filterLocked) {
      setFilterLocked(true);
      setSelectFilterOpen(false);
    }

    sequenceActiveRef.current = true;
    setAutoCapturing(true);
    fireShot();
  };

  // hapus salah satu hasil foto supaya bisa diulang (retake selalu manual,
  // tidak memicu lanjutan otomatis -- lihat pengecekan sequenceActiveRef
  // di bawah, cuma jalan kalau user klik shutter lagi)
  const handleRetake = (index) => {
    if (isCounting) return;
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // countdown -> capture -> kalau masih dalam sequence & strip belum penuh,
  // langsung jadwalkan foto berikutnya dari sini juga (satu efek yang sama,
  // jadi tidak ada celah waktu untuk gagal lanjut ke foto berikutnya).
  useEffect(() => {
    if (!isCounting) return;

    if (countdown <= 0) {
      const filteredImage = captureFrame();

      setCapturedImages((prev) => {
        if (prev.length >= photosCount || !filteredImage) return prev;
        return [...prev, filteredImage];
      });
      setIsCounting(false);

      const nextLength = capturedImages.length + (filteredImage ? 1 : 0);

      if (sequenceActiveRef.current && nextLength < photosCount) {
        nextShotTimeoutRef.current = setTimeout(fireShot, PAUSE_BETWEEN_SHOTS);
      } else {
        sequenceActiveRef.current = false;
        setAutoCapturing(false);
      }

      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCounting, photosCount, captureFrame, fireShot, capturedImages.length]);

  return (
    <div
      className="min-h-screen h-fit w-full flex flex-col items-center bg-cover bg-center bg-no-repeat py-4 sm:py-10 pt-6 sm:pt-20 px-3"
      style={{ backgroundImage: "url(/webImage/Camera.png)" }}
    >
      <div className="w-full flex justify-center pb-16 sm:pb-40">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative w-full max-w-[1100px]">

        {/* CAMERA FRAME */}
        <div className="relative w-full max-w-[500px] md:max-w-[800px] bg-white rounded-[20px] sm:rounded-[28px] shadow-2xl border-[2px] sm:border-[2.5px] border-black overflow-hidden">

          {/* TOP BAR */}
          <div className="bg-[#F4A9B8] w-full px-4 sm:px-6 py-2 sm:py-3 border-b-2 border-black relative flex items-center justify-center">
            <div className="absolute left-4 sm:left-6 flex gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E30C10] shadow-lg shadow-black/40"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#3298E0] shadow-lg shadow-black/40"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#28BB45] shadow-lg shadow-black/40"></div>
            </div>

            <h3
              className="font-press text-sm sm:text-lg md:text-xl font-bold text-[#FFE97F] tracking-wider"
              style={{
                WebkitTextStroke: "0.5px black",
                textShadow: "1px 1px 3px #000" }}
            >
              SNAPPIE
            </h3>
          </div>

          {/* CAMERA AREA */}
          <div className="bg-[#FFE97F] m-3 sm:m-6 h-[220px] sm:h-[320px] md:h-[420px] rounded-2xl border-[2px] sm:border-[2.5px] border-black flex items-center justify-center relative overflow-hidden">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover rounded-xl"
              videoConstraints={{ facingMode: "user" }}
              style={{ filter: FILTER_STYLES[selectedFilter] }}
              onUserMedia={() => setCameraError(false)}
              onUserMediaError={() => setCameraError(true)}
            />

            {isCounting && countdown > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-4xl sm:text-6xl md:text-7xl font-bold drop-shadow-xl">
                  {countdown}
                </span>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center px-6 gap-2">
                <p className="font-press text-white text-[10px] sm:text-xs">
                  Tidak bisa mengakses kamera
                </p>
                <p className="font-press text-white/70 text-[8px] sm:text-[10px] leading-relaxed">
                  Izinkan akses kamera lewat pengaturan browser, lalu muat ulang halaman ini.
                </p>
              </div>
            )}
          </div>

          {/* TIMER SELECTOR */}
          <div className="w-full flex justify-center items-center gap-2 pt-2 pb-1">
            {delayOptions.map((opt) => (
              <button
                key={opt}
                disabled={isCounting}
                onClick={() => setDelay(opt)}
                className={`font-press text-[9px] sm:text-[10px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-black transition
                  ${delay === opt ? "bg-[#F4A9B8] scale-105" : "bg-white hover:bg-[#FFE97F]"}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {opt}s
              </button>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="font-press text-[9px] sm:text-xs w-full flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-10 px-3 pb-4 sm:pb-6">

            <button
              className="bg-[#BBDA97] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-[20px] sm:rounded-[30px] text-black font-bold border-2 sm:border-[2.5px] border-black shadow-lg hover:scale-105 transition"
              onClick={() => setIsUploadOpen(true)}
            >
              UPLOAD PHOTO
            </button>

            {!isCounting && !autoCapturing && capturedImages.length < photosCount && (
              <button
                onClick={startCountdown}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
              >
                <img src="/webImage/icon-camera.png" className="w-5 sm:w-6 md:w-7" />
              </button>
            )}

            {autoCapturing && !isCounting && capturedImages.length < photosCount && (
              <p className="font-press text-[9px] sm:text-[10px] opacity-70">
                Bersiap untuk foto berikutnya...
              </p>
            )}

            <button
              disabled={filterLocked}
              onClick={() => setSelectFilterOpen((prev) => !prev)}
              className="bg-[#F3D7A5] px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 rounded-[20px] sm:rounded-[50px] text-black font-bold border-2 sm:border-[2.5px] border-black shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              EFFECTS
            </button>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="flex flex-row md:flex-col flex-wrap justify-center gap-3 sm:gap-5 items-center w-full max-w-[500px] md:w-auto md:max-w-none">
          {Array.from({ length: photosCount }).map((_, i) => (
            <div
              key={i}
              onClick={() => capturedImages[i] && handleRetake(i)}
              className={`group relative w-[140px] sm:w-[180px] md:w-[220px] h-[80px] sm:h-[100px] md:h-[120px] bg-white border-2 sm:border-[2.5px] border-black rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex items-center justify-center
                ${capturedImages[i] && !isCounting ? "cursor-pointer" : ""}`}
            >
              {capturedImages[i] ? (
                <>
                  <img src={capturedImages[i]} className="w-full h-full object-cover" />
                  {!isCounting && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 active:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-[9px] sm:text-xs font-press text-center px-2 sm:px-4">
                        Klik jika ingin mengulang
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="opacity-30 text-sm font-semibold">YOUR PHOTOS</div>
              )}
            </div>
          ))}

          {/* NEXT BUTTON */}
          <button
            disabled={capturedImages.length < photosCount}
              onClick={() =>
                navigate("../edit-frame", {
                  state: { photos: capturedImages, filter: selectedFilter },
                })
              }
              className={`w-full md:w-auto font-press text-xs sm:text-sm mt-2 md:mt-4 px-8 sm:px-14 md:px-20 py-2 sm:py-3 rounded-[30px] sm:rounded-[50px] font-bold border-2 sm:border-[2.5px] border-black shadow-lg transition
                ${capturedImages.length < photosCount
                  ? "bg-[#BBDA97] text-black cursor-not-allowed"
                  : "bg-[#FFE97F] text-black hover:scale-105"}
              `}
            >
              NEXT
          </button>

        </div>

        {/* FILTER OPTIONS — tetap terbuka setelah memilih, supaya bisa ganti-ganti;
            hanya dikunci/ditutup permanen setelah "mulai" (lihat startCountdown) */}
        {selectFilterOpen && !filterLocked && (
          <div className="w-full flex justify-center mt-2 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[-100px] md:w-max">
            <FilterOptions
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>
        )}

        {/* UPLOAD POPUP */}
        <UploadPhotoPopup
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={img => {
            setCapturedImages(prev => {
              if (prev.length >= photosCount) return prev;
              return [...prev, img];
            });
          }}
        />
      </div>
      </div>

      <CopyrightFooter />

      {/* HIDDEN CANVAS FOR FILTERED CAPTURE */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
