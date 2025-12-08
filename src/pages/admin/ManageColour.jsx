import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColourAddForm from "../../components/admin/ColourAddForm";

export default function ManageColour() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("semua");
  const [showAddForm, setShowAddForm] = useState(false);

  const [colours, setColours] = useState([
    { id: "CLR-001", name: "Pastel Pink", hex: "#F9ADB0" },
    { id: "CLR-002", name: "Mint Green", hex: "#A7DA70" },
    { id: "CLR-003", name: "Sky Blue", hex: "#7EC9F5" },
  ]);

  const handleAddColour = (newData) => {
    const newColour = {
      id: `CLR-${String(colours.length + 1).padStart(3, "0")}`,
      ...newData,
    };
    setColours([...colours, newColour]);
    setShowAddForm(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-76px)] px-10 pt-10">
      {/* TITLE */}
      <h1 className="font-pixel text-[28px] mb-8">Manage Content</h1>

      {/* TAB SWITCH */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => navigate("/admin/frame")}
          className="w-[150px] h-[55px] border-[2px] border-black rounded-[14px]
          font-pixel bg-white hover:bg-snappiePink hover:text-white transition"
        >
          Frame
        </button>

        <button
          className="w-[150px] h-[55px] border-[2px] border-black rounded-[14px]
          font-pixel bg-snappiePink text-white shadow-[0_4px_0_#000]"
        >
          Colour
        </button>
      </div>

      {/* WRAP BUTTON */}
      <div className="w-full max-w-[1500px] bg-white rounded-[12px] border-[2px] border-black shadow-[0_4px_0_#000] flex justify-center gap-10 px-12 py-6 mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-[300px] h-[65px] font-pixel border-[2px] border-black
          rounded-[10px] bg-white hover:bg-snappiePink hover:text-white
          shadow-[0_4px_0_#000] transition"
        >
          + Tambah Colour
        </button>

        <button
          onClick={() => setActiveTab("semua")}
          className={`w-[300px] h-[65px] font-pixel border-[2px] border-black
          rounded-[10px] shadow-[0_4px_0_#000] transition
          ${activeTab === "semua" ? "bg-snappiePink text-white" : "bg-white hover:bg-snappiePink hover:text-white"}`}
        >
          Semua
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full bg-white rounded-[12px] border-[2px] border-black shadow-[0_4px_0_#000] overflow-hidden">
        <div className="bg-snappiePink border-b-[2px] border-black grid grid-cols-3 text-center font-roboto text-[17px] py-3 px-6">
          <span>Preview</span>
          <span>Nama Colour</span>
          <span>Hex Code</span>
        </div>

        {colours.map((c) => (
          <div key={c.id} className="grid grid-cols-3 text-center border-b border-black/20 py-4 px-6 font-roboto text-[14px]">
            <div className="w-[45px] h-[45px] mx-auto rounded-[8px] border-[2px] border-black" style={{ backgroundColor: c.hex }}></div>
            <span>{c.name}</span>
            <span>{c.hex}</span>
          </div>
        ))}
      </div>

      {/* POPUP FORM */}
      {showAddForm && (
        <ColourAddForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddColour}
        />
      )}
    </div>
  );
}
