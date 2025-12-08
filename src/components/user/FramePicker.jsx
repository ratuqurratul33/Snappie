import { FRAME_THUMBNAILS, FRAME_COLORS } from "../../data/frameLists.js";

export default function FramePicker({ onPickFrame, selectedFrame }) {
  return (
    <div className="w-[500px] bg-white rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">
      <div className="bg-[#F4A9B8] px-6 py-3 border-b-2 border-black flex items-center justify-center">
        <h2
          className="font-press text-2xl text-[#FFE97F] tracking-wide"
          style={{
            textShadow: "2px 4px 5px #000, -2px -2px 0px rgba(0,0,0,0.5)",
          }}
        >
          CHOOSE YOUR FRAME
        </h2>
      </div>

      <div className="p-10">
        <div className="bg-[#FFE97F] rounded-2xl border-[2.5px] border-black p-6">
          <div className="flex flex-wrap gap-9">

            {/* COLOR LIST */}
            {FRAME_COLORS.map((color, idx) => (
              <button
                key={idx}
                onClick={() =>
                  onPickFrame({ type: "color", value: color, id: color })
                }
                className={`w-10 h-10 rounded-full border-[3px] hover:scale-110 transition
                  ${selectedFrame?.id === color ? "ring-4 ring-black" : ""}
                `}
                style={{ backgroundColor: color }}
              />
            ))}

            {/* TRANSPARENT FRAMES */}
            {FRAME_THUMBNAILS.map((f) => (
              <button
                key={f.id}
                onClick={() =>
                  onPickFrame({
                    type: "image",
                    value: f.frameByStrip,
                    id: f.id,
                  })
                }
                className={`w-10 h-10 rounded-full border-[3px] overflow-hidden hover:scale-110 transition
                  ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}
                `}
              >
                <img src={f.thumb} className="w-full h-full object-cover" />
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
