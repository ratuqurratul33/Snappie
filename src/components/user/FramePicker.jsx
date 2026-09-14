export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
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

      <div className="p-2 sm:p-6 md:p-10">
        <div className="bg-[#FFE97F] rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-black p-2 sm:p-6">
          <div className="flex flex-wrap gap-2 sm:gap-9 justify-center">

            {frames.map((f) => (
              <button
                key={f.id}
                onClick={() => onPickFrame(f)}
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-[3px] overflow-hidden hover:scale-110 transition shrink-0
                    ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}`}
              >
                {f.type === "color" ? (
                  <div className="w-full h-full" style={{ backgroundColor: f.color }} />
                ) : (
                  <img src={f.thumb} className="w-full h-full object-cover" />
                )}
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
