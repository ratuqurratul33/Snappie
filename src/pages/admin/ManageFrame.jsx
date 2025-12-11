// src/pages/admin/ManageFrame.jsx
import { useState, useEffect } from "react";
import FrameAddForm from "../../components/admin/FrameAddForm";
import FrameList from "../../components/admin/FrameList";

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ManageFrame() {
  const [showAddForm, setShowAddForm] = useState(false);

  // TAB FILTER: all / premium
  const [activeTab, setActiveTab] = useState("all");

  const [namaFrame, setNamaFrame] = useState("");
  const [jenis, setJenis] = useState("gratis");
  const [harga, setHarga] = useState("");
  const [thumb, setThumb] = useState(null);

  const [frame1, setFrame1] = useState(null);
  const [frame3, setFrame3] = useState(null);
  const [frame4, setFrame4] = useState(null);

  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("frames");
    if (saved) setFrames(JSON.parse(saved));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [thumbData, f1Data, f3Data, f4Data] = await Promise.all([
      thumb ? fileToDataUrl(thumb) : Promise.resolve(null),
      frame1 ? fileToDataUrl(frame1) : Promise.resolve(null),
      frame3 ? fileToDataUrl(frame3) : Promise.resolve(null),
      frame4 ? fileToDataUrl(frame4) : Promise.resolve(null),
    ]);

    const newFrame = {
      id: `FRM-${String(frames.length + 1).padStart(3, "0")}`,
      namaFrame,
      jenis,
      harga: jenis === "gratis" ? 0 : Number(harga || 0),
      thumb: thumbData,
      frameByStrip: { 1: f1Data, 3: f3Data, 4: f4Data },
    };

    const updated = [...frames, newFrame];
    setFrames(updated);
    localStorage.setItem("frames", JSON.stringify(updated));

    setNamaFrame("");
    setJenis("gratis");
    setHarga("");
    setThumb(null);
    setFrame1(null);
    setFrame3(null);
    setFrame4(null);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updated = frames.filter((f) => f.id !== id);
    setFrames(updated);
    localStorage.setItem("frames", JSON.stringify(updated));
  };

  // FILTER PREMIUM
  const filteredFrames =
    activeTab === "premium"
      ? frames.filter((f) => f.jenis === "premium")
      : frames;

  return (
    <>
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
                namaFrame={namaFrame}
                setNamaFrame={setNamaFrame}
                jenis={jenis}
                setJenis={setJenis}
                harga={harga}
                setHarga={setHarga}
                setThumbnail={setThumb}
                setFrame1={setFrame1}
                setFrame3={setFrame3}
                setFrame4={setFrame4}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-[calc(100vh-76px)]">
        <h1 className="font-pixel text-[28px] mb-10">Manage Frame</h1>

        {/* ACTION AREA — Tambah Frame + Tabs */}
        <div className="w-full bg-white border-2 border-black rounded-[12px] shadow-[0_4px_0_#000] px-12 py-6 flex justify-between items-center">

          <button
            onClick={() => setShowAddForm(true)}
            className="w-[260px] h-[60px] font-pixel border-2 border-black rounded-[12px] bg-white hover:bg-snappiePink hover:text-white transition"
          >
            + Tambah Frame Baru
          </button>

          {/* TAB FILTER */}
          <div className="flex gap-3">
            <button
              className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
                activeTab === 'all'
                  ? 'bg-snappiePink border-black text-white'
                  : 'bg-white border-black'
              }`}
              onClick={() => setActiveTab("all")}
            >
              Semua
            </button>

            <button
              className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
                activeTab === 'premium'
                  ? 'bg-snappiePink border-black text-white'
                  : 'bg-white border-black'
              }`}
              onClick={() => setActiveTab("premium")}
            >
              Premium
            </button>
          </div>
        </div>

        {/* TABEL FRAME */}
        <FrameList frames={filteredFrames} onDelete={handleDelete} />
      </div>
    </>
  );
}
