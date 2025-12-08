import { useState } from "react";

export default function ColourAddForm({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#ffffff");
  const [mode, setMode] = useState("hex"); // hex | picker

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ name, hex });
    setName("");
    setHex("#ffffff");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="w-[420px] bg-white rounded-[14px] border-[4px] border-black shadow-[0_6px_0_#000] overflow-hidden">

        {/* HEADER */}
        <div className="bg-snappiePink text-[#FFE97F] font-roboto text-[20px] px-6 py-3 flex justify-between items-center">
          Tambah Colour
          <button onClick={onClose} className="text-black text-[20px] hover:scale-110 transition">✖</button>
        </div>

        {/* CONTENT */}
        <form onSubmit={handleSubmit} className="bg-[#FFF5B8] px-6 py-6 flex flex-col gap-4">

          {/* INPUT NAME */}
          <input
            type="text"
            placeholder="Nama Colour"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 font-roboto text-[15px] rounded-[10px] border-[3px] border-black"
            required
          />

          {/* TOGGLE MODE */}
          <div className="flex gap-3 justify-center font-roboto text-[14px]">
            <button
              type="button"
              onClick={() => setMode("hex")}
              className={`px-4 py-2 border-[3px] rounded-[10px]
              ${mode === "hex" ? "bg-snappieYellow2" : "bg-white"}
              border-black`}
            >
              Input Hex
            </button>
            <button
              type="button"
              onClick={() => setMode("picker")}
              className={`px-4 py-2 border-[3px] rounded-[10px]
              ${mode === "picker" ? "bg-snappieYellow2" : "bg-white"}
              border-black`}
            >
              Color Picker
            </button>
          </div>

          {/* INPUT FIELD */}
          {mode === "hex" ? (
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full px-4 py-3 font-roboto text-[15px] rounded-[10px] border-[3px] border-black text-center"
            />
          ) : (
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full h-[50px] border-[3px] border-black rounded-[10px] cursor-pointer"
            />
          )}

          {/* SAVE BUTTON */}
          <button type="submit"
            className="w-full font-roboto text-[16px]
            bg-[#A7DA70] border-[3px] border-black rounded-[10px]
            shadow-[0_4px_0_#000] py-3 hover:brightness-95 active:translate-y-[2px]">
            Simpan Colour
          </button>
        </form>
      </div>
    </div>
  );
}
