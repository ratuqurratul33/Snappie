export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
  const colors = frames.filter((f) => f.type === "color");
  const stickers = frames.filter((f) => f.type === "image");

  return (
    <div className="w-full max-w-[500px] bg-white rounded-[14px] sm:rounded-[28px] shadow-2xl border-2 sm:border-[2.5px] border-black overflow-hidden">

      <div className="bg-[#F4A9B8] px-2 sm:px-6 py-2 sm:py-3 border-b-2 border-black flex items-center justify-center">
        <h2
          className="font-press text-[9px] sm:text-xl md:text-2xl text-[#FFE97F] tracking-wide text-center leading-relaxed"
          style={{ textShadow: "2px 4px 5px #000" }}
        >
          CHOOSE YOUR FRAME
        </h2>
      </div>

      <div className="p-2 sm:p-6 md:p-10 flex flex-col gap-2 sm:gap-5">
        {/* WARNA — border polos satu warna */}
        {colors.length > 0 && (
          <div>
            <p className="font-press text-[7px] sm:text-[11px] text-black/60 mb-1 sm:mb-2 px-1">
              Warna
            </p>
            <div className="bg-[#FFE97F] rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-black p-2 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-9 justify-center">
                {colors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onPickFrame(f)}
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-[3px] overflow-hidden hover:scale-110 transition shrink-0
                        ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}`}
                  >
                    <div className="w-full h-full" style={{ backgroundColor: f.color }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FRAME / STICKER — gambar yang diupload admin */}
        {stickers.length > 0 && (
          <div>
            <p className="font-press text-[7px] sm:text-[11px] text-black/60 mb-1 sm:mb-2 px-1">
              Frame / Sticker
            </p>
            <div className="bg-[#FFE97F] rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-black p-2 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-6 justify-center">
                {stickers.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onPickFrame(f)}
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl border-2 sm:border-[3px] overflow-hidden hover:scale-110 transition shrink-0
                        ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}`}
                  >
                    <img src={f.thumb} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {colors.length === 0 && stickers.length === 0 && (
          <p className="font-press text-[9px] sm:text-xs text-center text-black/50 py-4">
            Belum ada frame tersedia
          </p>
        )}
      </div>
    </div>
  );
}
