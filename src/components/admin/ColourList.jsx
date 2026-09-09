export default function ColourList({ colours, onDelete }) {
  return (
    <div
      className="
        w-full max-w-[1500px]
        bg-white rounded-[12px]
        border-[2px] border-black
        shadow-[0_4px_0_#000]
        overflow-x-auto mt-6 sm:mt-10
      "
    >
      <div className="min-w-[420px]">
        {/* Header */}
        <div
          className="
            bg-snappiePink border-b-[2px] border-black
            grid grid-cols-4 text-center
            font-semantic text-[12px] sm:text-[13px]
            py-3 px-3 sm:px-6
          "
        >
          <span>Preview</span>
          <span>Nama Colour</span>
          <span>Hex Code</span>
          <span>Aksi</span>
        </div>

        {/* Rows */}
        {colours.map((c) => (
          <div
            key={c.id}
            className="
              grid grid-cols-4 items-center justify-center text-center gap-2 sm:gap-3
              font-semantic text-[11px] sm:text-[12px]
              py-3 sm:py-4 px-3 sm:px-6
              border-b border-black/20
            "
          >
            {/* Preview Color */}
            <div
              className="
                w-[36px] h-[36px] sm:w-[50px] sm:h-[50px]
                mx-auto rounded-[6px]
                border-[2px] border-black
              "
              style={{ backgroundColor: c.hex }}
            ></div>

            <span>{c.name}</span>
            <span>{c.hex}</span>

            <button
              type="button"
              onClick={() => onDelete?.(c.id)}
              className="hover:scale-110 transition text-[13px] sm:text-[14px]"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
