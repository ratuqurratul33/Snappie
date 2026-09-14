// EditFrame.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FramePicker from "../../components/user/FramePicker";
import FramePreview from "../../components/user/FramePreview";
import CopyrightFooter from "../../components/CopyrightFooter";
import { useFrames } from "../../hooks/useFrames";
import { supabase } from "../../lib/supabaseClient";
import { getSlot } from "../../utils/frameLayout";

export default function EditFrame() {
  const location = useLocation();
  const photos = location.state?.photos || [];
  const selectedFilter = location.state?.filter || "normal";
  const [selectedFrame, setSelectedFrame] = useState(null);
  const { allFrames, loading: framesLoading } = useFrames();

  const stripCount = Math.min(photos.length, 4);

  // Geometri strip (posisi & ukuran tiap foto) dari satu sumber yang sama
  // dengan FramePreview, supaya hasil download selalu identik dengan preview.
  const SLOT = getSlot(stripCount);

  // Preview di-scale sesuai lebar layar supaya tidak overflow di HP
  // (dimensi asli dalam SLOT dihitung dari cm, jadi bisa ratusan px).
  const getScaleFor = (frameWidth) => {
    const w = window.innerWidth;
    let targetWidth;
    if (w < 480) targetWidth = 190;
    else if (w < 640) targetWidth = 230;
    else if (w < 768) targetWidth = 280;
    else if (w < 1024) targetWidth = 320;
    else targetWidth = 380;
    return Math.min(1, targetWidth / frameWidth);
  };

  // Lazy initializer -- dihitung SEBELUM render pertama, bukan lewat efek
  // setelah mount. Sebelumnya default-nya 1 (ukuran penuh, tidak di-scale)
  // lalu baru dikoreksi di useEffect SETELAH paint pertama, jadi sempat ada
  // satu frame "kilatan" preview kepentok gede/kepotong ke kiri sebelum
  // ke-render ulang dengan ukuran yang benar & center. Dengan lazy
  // initializer, render pertama sudah langsung pakai ukuran yang benar.
  const [previewScale, setPreviewScale] = useState(() => getScaleFor(SLOT.frameWidth));

  useEffect(() => {
    const handleResize = () => setPreviewScale(getScaleFor(SLOT.frameWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [SLOT.frameWidth]);

  // HANDLE DOWNLOAD FILE PNG
  const handleDownload = async () => {
    if (!selectedFrame) return alert("Pilih frame dulu!");

    // Ambil frame data dari daftar frame yang sudah dimuat dari Supabase.
    // Dicari DULU (sebelum menggambar) karena warnanya dipakai sebagai
    // background canvas.
    const frameData = allFrames.find(f => f.id === selectedFrame.id);
    if (!frameData) return alert("Frame tidak ditemukan!");

    const canvas = document.createElement("canvas");
    canvas.width = SLOT.frameWidth;
    canvas.height = SLOT.frameHeight;
    const ctx = canvas.getContext("2d");

    // Background = warna frame (untuk frame warna) atau putih (untuk frame
    // gambar). Sebelumnya background selalu putih lalu warna digambar
    // sebagai border tebal di atasnya — itu yang menyebabkan garis putih
    // tipis di tepi karena border tidak pernah pas menutupi sampai ke
    // pinggir foto. Dengan background = warna penuh dari awal, celah di
    // sekitar & antar foto otomatis terisi warna yang benar, sama seperti
    // di live preview (FramePreview.jsx).
    ctx.fillStyle = frameData.type === "color" ? frameData.color : "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar foto-foto, masing-masing di-clip ke kotak slotnya sendiri
    // supaya hasil crop "cover" tidak meluber ke slot foto sebelah atau
    // ke luar frame (penyebab strip 3/4 foto jadi tidak rapi).
    for (let i = 0; i < stripCount; i++) {
      const img = new Image();
      img.src = photos[i];

      const slotY = SLOT.yStart + i * (SLOT.height + SLOT.gap);

      await new Promise((resolve) => {
        img.onload = () => {
          const scale = Math.max(SLOT.width / img.width, SLOT.height / img.height);
          const w = img.width * scale;
          const h = img.height * scale;

          const x = SLOT.x + (SLOT.width - w) / 2;
          const y = slotY + (SLOT.height - h) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.rect(SLOT.x, slotY, SLOT.width, SLOT.height);
          ctx.clip();
          ctx.drawImage(img, x, y, w, h);
          ctx.restore();
          resolve();
        };
      });
    }

    // FRAME WARNA — tinggal watermark, border sudah jadi background di atas
    if (frameData.type === "color") {
      ctx.save();

      ctx.font = "26px 'Press Start 2P', system-ui";
      ctx.textAlign = "right";

      const x = SLOT.frameWidth - 22;
      const y = SLOT.frameHeight - 22;

      // Outline / shadow
      ctx.fillStyle = "#6E5100";
      ctx.fillText("Snappie", x + 2, y + 2);

      // Text gold
      ctx.fillStyle = "#F5D94E";
      ctx.fillText("Snappie", x, y);

      ctx.restore();
    }


    // FRAME GAMBAR
    if (frameData.type === "image") {
      const imgFrame = new Image();
      // Frame gambar sekarang dimuat dari Supabase Storage (beda origin) —
      // tanpa ini, canvas jadi "tainted" dan toDataURL() gagal saat download.
      imgFrame.crossOrigin = "anonymous";
      imgFrame.src = frameData.frameByStrip[stripCount];

      await new Promise((resolve) => {
        imgFrame.onload = () => {
          ctx.drawImage(imgFrame, 0, 0, SLOT.frameWidth, SLOT.frameHeight);
          resolve();
        };
      });
    }

    // Download file — selalu PNG (lossless, dan mendukung transparansi
    // kalau suatu saat frame gambar punya area transparan).
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `photobooth-${frameData.id}.png`;
    link.click();

    // Catat transaksi ke Supabase (dipakai untuk statistik di admin)
    const isPremium = frameData.type === "image" && !frameData.isFree;
    await supabase.from("transactions").insert({
      kode: `SNPP-${Date.now().toString().slice(-8)}`,
      frame_id: frameData.type === "image" ? frameData.id : null,
      frame_name: frameData.type === "image" ? "Frame" : "Colour Frame",
      filter: selectedFilter,
      status: isPremium ? "Premium" : "Gratis",
      harga: isPremium ? frameData.harga || 0 : 0,
    });
  };

  // UI LAYOUT
  return (
    <div
      className="min-h-screen bg-[#FFF3D8] flex flex-col"
      style={{
        backgroundImage: "url(/webImage/Camera.png)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="flex-1 flex flex-row items-start justify-center p-2 sm:p-8 lg:p-20 gap-2 sm:gap-8 lg:gap-16">
        {/* PREVIEW */}
        <div
          className="flex flex-col items-center gap-4 shrink-0"
          style={{ width: SLOT.frameWidth * previewScale, height: SLOT.frameHeight * previewScale }}
        >
          <div style={{ width: SLOT.frameWidth, height: SLOT.frameHeight, transform: `scale(${previewScale})`, transformOrigin: "top left" }}>
            <FramePreview
              photos={photos}
              selectedFrame={selectedFrame}
              stripCount={stripCount}
            />
          </div>
        </div>

        {/* PICKER + BUTTON — di samping preview, bukan di bawah, supaya
            ruang kosong di sebelah strip foto yang sempit ikut kepakai */}
        <div className="flex-1 min-w-0 max-w-[500px] flex flex-col items-center gap-2 sm:gap-4">
          {framesLoading ? (
            <p className="font-press text-[10px] sm:text-sm text-center">Memuat frame...</p>
          ) : (
            <FramePicker
              frames={allFrames}
              selectedFrame={selectedFrame}
              onPickFrame={setSelectedFrame}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              disabled={photos.length === 0 || framesLoading}
              className="font-press text-[10px] sm:text-sm mt-2 sm:mt-4 px-3 sm:px-10 py-2 rounded-[15px] font-bold border-2 sm:border-[2.5px] border-black shadow-lg transition bg-[#FFE97F] hover:scale-105 disabled:bg-[#BBDA97]"
            >
              Download
            </button>

            <button
              onClick={() => window.history.back()}
              className="font-press text-[10px] sm:text-sm mt-2 sm:mt-4 px-3 sm:px-10 py-2 rounded-[15px] font-bold border-2 sm:border-[2.5px] border-black shadow-lg transition bg-[#FF9999] hover:scale-105"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <CopyrightFooter />
    </div>
  );
}
