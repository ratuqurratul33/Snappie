import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import UploadPhotoPopup from "../../components/user/UploadPhotoPopup.jsx";
import FilterOptions from "../../components/user/FilterOptions";
import { useNavigate } from "react-router-dom";

export default function TakeCamera() {
  const location = useLocation();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const delay = Number(location.state?.delay) || 3;
  const photosCount = Number(location.state?.photoMode) || 3;

  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCounting, setIsCounting] = useState(false);
  const [selectFilterOpen, setSelectFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const navigate = useNavigate();

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // start countdown
  const startCountdown = () => {
    if (capturedImages.length >= photosCount) return;
    setCountdown(delay);
    setIsCounting(true);
  };

  // filter list
  const filterStyles = {
    normal: "none",
    mono: "grayscale(100%) contrast(1)",
    sepia: "sepia(70%) contrast(1) brightness(1.1)",
    soft: "brightness(1.1) blur(1px) contrast(0.9) saturate(1.4)",
    pop: "saturate(2) contrast(1) brightness(1.1)",
    retro: "contrast(1.1) sepia(0.7) saturate(0.8) hue-rotate(-10deg)",
  };

  // countdown logic + capture with filter
  useEffect(() => {
    if (!isCounting) return;

    if (countdown <= 0) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      // apply CSS filter
      ctx.filter = filterStyles[selectedFilter] || "none";

      // draw frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // extract image
      const filteredImage = canvas.toDataURL("image/jpeg");

      setCapturedImages(prev => {
        if (prev.length >= photosCount) return prev;
        return [...prev, filteredImage];
      });

      setIsCounting(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCounting, photosCount, selectedFilter]);

  return (
    <div
      className="min-h-screen h-fit pb-40 w-full flex justify-center items-start bg-cover bg-center bg-no-repeat py-10 pt-20"
      style={{ backgroundImage: "url(/webImage/Camera.png)" }}
    >
      <div className="flex gap-10 relative">

        {/* CAMERA FRAME */}
        <div className="relative w-[800px] bg-white rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">

          {/* TOP BAR */}
          <div className="bg-[#F4A9B8] w-full px-6 py-3 border-b-2 border-black relative flex items-center justify-center">
            <div className="absolute left-6 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[#E30C10] shadow-lg shadow-black/40"></div>
              <div className="w-4 h-4 rounded-full bg-[#3298E0] shadow-lg shadow-black/40"></div>
              <div className="w-4 h-4 rounded-full bg-[#28BB45] shadow-lg shadow-black/40"></div>
            </div>

            <h3
              className="font-press text-xl font-bold text-[#FFE97F] tracking-wider"
              style={{ 
                WebkitTextStroke: "0.5px black",
                textShadow: "1px 1px 3px #000" }}
            >
              SNAPPIE
            </h3>
          </div>

          {/* CAMERA AREA */}
          <div className="bg-[#FFE97F] m-6 h-[420px] rounded-2xl border-[2.5px] border-black flex items-center justify-center relative overflow-hidden">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover rounded-xl"
              videoConstraints={{ facingMode: "user" }}
              style={{ filter: filterStyles[selectedFilter] }}
            />

            {isCounting && countdown > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-7xl font-bold drop-shadow-xl">
                  {countdown}
                </span>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="font-press text-xs w-full flex justify-center items-center gap-10 pb-6">

            <button
              className="bg-[#BBDA97] px-8 py-4 rounded-[30px] text-black font-bold border-[2.5px] border-black shadow-lg hover:scale-105 transition"
              onClick={() => setIsUploadOpen(true)}
            >
              UPLOAD PHOTO
            </button>

            {!isCounting && capturedImages.length < photosCount && (
              <button
                onClick={startCountdown}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
              >
                <img src="/webImage/icon-camera.png" className="w-7" />
              </button>
            )}

            <button
              onClick={() => setSelectFilterOpen(true)}
              className="bg-[#F3D7A5] px-10 py-4 rounded-[50px] text-black font-bold border-[2.5px] border-black shadow-lg hover:scale-105 transition"
            >
              EFFECTS
            </button>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="flex flex-col gap-5 items-center">
          {Array.from({ length: photosCount }).map((_, i) => (
            <div
              key={i}
              className="w-[220px] h-[120px] bg-white border-[2.5px] border-black rounded-2xl shadow-xl overflow-hidden flex items-center justify-center"
            >
              {capturedImages[i] ? (
                <img src={capturedImages[i]} className="w-full h-full object-cover" />
              ) : (
                <div className="opacity-30 text-sm font-semibold">YOUR PHOTOS</div>
              )}
            </div>
          ))}

          {/* NEXT BUTTON */}
          <button
            disabled={capturedImages.length < photosCount}
              onClick={() =>
                navigate("../edit-frame", { state: { photos: capturedImages } })
              }
              className={`font-press mt-4 px-20 py-3 rounded-[50px] font-bold border-[2.5px] border-black shadow-lg transition
                ${capturedImages.length < photosCount 
                  ? "bg-[#BBDA97] text-black cursor-not-allowed"
                  : "bg-[#FFE97F] text-black hover:scale-105"}
              `}
            >
              NEXT
          </button>
          
        </div>

        {/* FILTER OPTIONS */}
        {selectFilterOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] w-max">
            <FilterOptions
              selected={selectedFilter}
              onSelect={f => {
                setSelectedFilter(f);
                setSelectFilterOpen(false);
              }}
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

      {/* HIDDEN CANVAS FOR FILTERED CAPTURE */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
