// 📌 LIST SEMUA FRAME — TABEL STYLE SNAPPIE

export default function FrameList({ frames }) {
  return (
    <div
      className="
        w-full max-w-[1500px]
        mt-8
        bg-white rounded-[12px]
        border-[2px] border-black
        shadow-[0_4px_0_#000]
        overflow-hidden
      "
    >
      {/* 🏷️ Header Tabel */}
      <div className="bg-snappiePink border-b-[2px] border-black grid grid-cols-5 font-semantic text-[13px] py-3 px-6">
        <span>Preview</span>
        <span>Nama Frame</span>
        <span>Jenis</span>
        <span>Harga</span>
        <span>Aksi</span>
      </div>

      {/* 📌 DATA FRAME DILOOP */}
      {frames.map((frame) => (
        <div
          key={frame.id}
          className="
            grid grid-cols-5 items-center gap-3
            font-semantic text-[12px]
            py-4 px-6
            border-b border-black/20
          "
        >
          {/* 🖼️ PREVIEW GAMBAR FRAME */}
          <img
            src={frame.file}
            alt={frame.namaFrame}
            className="w-[60px] h-[60px] object-cover rounded-[6px] border-[2px] border-black"
          />

          {/* 📝 Nama Frame */}
          <span>{frame.namaFrame}</span>

          {/* 🔖 BADGE STATUS PREMIUM/GRATIS */}
          {/* — jika jenis = premium → badge merah
              — jika gratis → badge hijau */}
         <span className="font-semantic text-[12px] text-[#4B5563]">
          {frame.jenis === "premium" ? "Premium" : "Gratis"}
        </span>


          {/* 💰 Harga */}
          <span>
            {frame.jenis === "gratis" ? "Rp 0" : `Rp ${frame.harga}.000`}
          </span>

          {/* ✏️🗑️ Edit & Delete placeholder */}
          <div className="flex gap-3 text-[14px]">
            ✏️ 🗑️
          </div>
        </div>
      ))}
    </div>
  );
}
