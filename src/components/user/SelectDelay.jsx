import { useState } from "react";

export default function SelectDelay({ onChange }) {
  const [delay, setDelay] = useState(3);
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setDelay(value);
    setOpen(false);
    onChange && onChange(value);
  };

  // Definisikan opsi delay
  const options = [3, 5, 10];

  return (
    <div className="relative inline-block">
      
      {/* BUTTON UTAMA */}
      <button
        onClick={() => setOpen(!open)}
        className={`font-press px-8 py-3 rounded-full border-4 border-black font-bold text-xl transition-all ${
          open
            ? "bg-[#C35B61] text-black shadow-lg scale-105"
            : "bg-[#C35B61] text-black hover:bg-[#C35B68] hover:scale-105"
        }`}
      >
        DELAY 
      </button>

      {/* DROPDOWN - MUNCUL DI ATAS & GAYA CARD (Sesuai Gambar) */}
      {open && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-5 w-60 bg-[#C35B61] rounded-[25px] shadow-xl border border-black p-6 space-y-4 z-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          {/* Mapping opsi menjadi tombol-tombol pil yang besar */}
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              // Gaya Tombol Opsi: font-press, text-xl, rounded-full, border
              className={`font-press block w-full text-center px-4 py-2 text-sx rounded-full transition-all border border-black ${
                delay === option 
                  ? "bg-[#F9ADB0] text-black shadow-inner" // Saat dipilih: warna lebih gelap
                  : "bg-red-300 text-black hover:bg-red-400" // Default: warna terang, hover: warna lebih gelap
              }`}
              role="menuitem"
              tabIndex="-1"
            >
              {/* Logika penamaan: "3s Delay" atau "Delay" (untuk 10s/pilihan terakhir) */}
              {option !== options[options.length - 1] ? `${option}s Delay` : '10s Delay'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}