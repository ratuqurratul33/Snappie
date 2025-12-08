import { useState } from "react";

export default function SelectPhotoMode({ onChange }) {
  const [mode, setMode] = useState(4); // default number
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    const numericValue = Number(value);
    setMode(numericValue);
    setOpen(false);
    onChange && onChange(numericValue); // kirim number ke parent
  };

  const getModeLabel = (value) => `${value} Photo${value > 1 ? "s" : ""}`;

  const options = [1, 3, 4];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`font-press px-6 py-3 bg-[#F3D7A5] hover:bg-amber-300 rounded-full border-4 border-black font-bold text-xl text-black shadow-md transition-all ${open ? 'scale-105' : 'hover:scale-105'}`}
      >
        {getModeLabel(mode)}
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-5 w-60 bg-[#F3D7A5] rounded-[25px] shadow-xl border border-black p-6 space-y-4 z-20"
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`font-press block w-full text-center px-4 py-2 text-lg rounded-full transition-all border border-black ${
                mode === option 
                  ? "bg-[#D9D9D9] text-black shadow-inner" 
                  : "bg-[#D9D9D9] text-black"
              }`}
              role="menuitem"
              tabIndex="-1"
            >
              {getModeLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
