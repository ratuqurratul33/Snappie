import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrameAddForm from "../../components/admin/FrameAddForm";
import FrameList from "../../components/admin/FrameList";

export default function ManageFrame() {
  const [activeTab, setActiveTab] = useState("semua");
  const navigate = useNavigate();

  // Popup Form Tambah Frame
  const [showAddForm, setShowAddForm] = useState(false);

  // Input Form
  const [namaFrame, setNamaFrame] = useState("");
  const [jenis, setJenis] = useState("gratis");
  const [harga, setHarga] = useState("");
  const [lokasi, setLokasi] = useState("foto1");
  const [file, setFile] = useState(null);

  // Dummy Data
  const [frames, setFrames] = useState([
    {
      id: "FRM-001",
      namaFrame: "Classic Chic",
      jenis: "premium",
      harga: 1000,
      lokasi: "foto1",
      file: "https://via.placeholder.com/60",
    },
    {
      id: "FRM-002",
      namaFrame: "Retro Pop",
      jenis: "gratis",
      harga: 0,
      lokasi: "foto2",
      file: "https://via.placeholder.com/60",
    },
    {
      id: "FRM-003",
      namaFrame: "Minimalist White",
      jenis: "premium",
      harga: 2000,
      lokasi: "foto1",
      file: "https://via.placeholder.com/60",
    },
    {
      id: "FRM-004",
      namaFrame: "Pastel Dreams",
      jenis: "gratis",
      harga: 0,
      lokasi: "foto2",
      file: "https://via.placeholder.com/60",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFrames([
      ...frames,
      {
        id: `FRM-${frames.length + 1}`,
        namaFrame,
        jenis,
        harga: jenis === "gratis" ? 0 : harga,
        lokasi,
        file: file ? URL.createObjectURL(file) : null,
      },
    ]);

    setNamaFrame("");
    setJenis("gratis");
    setHarga("");
    setLokasi("foto1");
    setFile(null);
    setShowAddForm(false);
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    document.getElementById("frame-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 🌟 POPUP TAMBAH FRAME */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[650px] bg-[#FFF3AA] border-[4px] border-black rounded-3xl shadow-[0_8px_0_#000]">
            <div className="bg-snappiePink border-b-[4px] border-black rounded-t-3xl p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[18px] text-[#FAE446]">Tambah Frame</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-black font-bold text-[18px] hover:scale-110 transition"
              >
                ✖
              </button>
            </div>

            <div className="p-6">
              <FrameAddForm
                namaFrame={namaFrame} setNamaFrame={setNamaFrame}
                jenis={jenis} setJenis={setJenis}
                harga={harga} setHarga={setHarga}
                lokasi={lokasi} setLokasi={setLokasi}
                setFile={setFile}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="w-full min-h-[calc(100vh-76px)]">
        <h1 className="font-pixel text-[28px] mb-10">Manage Content</h1>

        {/* TAB */}
        <div className="flex gap-6 mb-10">
          <button className="w-[150px] h-[55px] bg-snappiePink text-white border-2 border-black rounded-[14px] font-pixel shadow-[0_4px_0_#000]">
            Frame
          </button>

          <button
            onClick={() => navigate("/admin/colour")}
            className="w-[150px] h-[55px] bg-white hover:bg-snappiePink hover:text-white border-2 border-black rounded-[14px] font-pixel transition"
          >
            Colour
          </button>
        </div>

        {/* BUTTON */}
        <div className="w-full bg-white border-2 border-black rounded-[12px] shadow-[0_4px_0_#000] px-12 py-6 flex justify-center gap-10">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-[340px] h-[70px] font-pixel border-2 border-black rounded-[12px] hover:bg-snappiePink hover:text-white transition"
          >
            + Tambah Frame Baru
          </button>

          <button
            onClick={() => handleTab("semua")}
            className={`w-[240px] h-[70px] font-pixel border-2 border-black rounded-[12px]
              ${activeTab === "semua"
                ? "bg-snappiePink text-white"
                : "bg-white hover:bg-snappiePink hover:text-white"}`}
          >
            Semua
          </button>

          <button
            onClick={() => handleTab("premium")}
            className={`w-[240px] h-[70px] font-pixel border-2 border-black rounded-[12px]
              ${activeTab === "premium"
                ? "bg-snappiePink text-white"
                : "bg-white hover:bg-snappiePink hover:text-white"}`}
          >
            Premium
          </button>
        </div>

        {/* LIST */}
        <div id="frame-content">
          {activeTab === "semua" && <FrameList frames={frames} />}
          {activeTab === "premium" && (
            <FrameList frames={frames.filter(f => f.jenis === "premium")} />
          )}
        </div>
      </div>
    </>
  );
}
