export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
  return (
    <div className="w-full max-w-[500px] bg-white rounded-[20px] sm:rounded-[28px] shadow-2xl border-2 sm:border-[2.5px] border-black overflow-hidden">

      <div className="bg-[#F4A9B8] px-4 sm:px-6 py-2 sm:py-3 border-b-2 border-black flex items-center justify-center">
        <h2
          className="font-press text-sm sm:text-xl md:text-2xl text-[#FFE97F] tracking-wide text-center"
          style={{ textShadow: "2px 4px 5px #000" }}
        >
          CHOOSE YOUR FRAME
        </h2>
      </div>

      <div className="p-4 sm:p-6 md:p-10">
        <div className="bg-[#FFE97F] rounded-2xl border-2 sm:border-[2.5px] border-black p-4 sm:p-6">
          <div className="flex flex-wrap gap-4 sm:gap-9 justify-center">

            {frames.map((f) => (
              <button
                key={f.id}
                onClick={() => onPickFrame(f)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-[3px] overflow-hidden hover:scale-110 transition
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
