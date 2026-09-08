// src/pages/admin/ManageFrame.jsx
import { useState, useEffect } from "react";
import FrameAddForm from "../../components/admin/FrameAddForm";
import FrameList from "../../components/admin/FrameList";
import { supabase } from "../../lib/supabaseClient";
import { uploadFrameImage } from "../../utils/uploadImage";

export default function ManageFrame() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const loadFrames = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("frames")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Gagal memuat data frame.");
    } else {
      setFrames(
        data.map((f) => ({
          id: f.id,
          namaFrame: f.nama_frame,
          jenis: f.jenis,
          harga: f.harga,
          thumb: f.thumb_url,
          frameByStrip: { 1: f.frame_1_url, 3: f.frame_3_url, 4: f.frame_4_url },
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFrames();
  }, []);

  const resetForm = () => {
    setNamaFrame("");
    setJenis("gratis");
    setHarga("");
    setThumb(null);
    setFrame1(null);
    setFrame3(null);
    setFrame4(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaFrame.trim()) return;

    setSaving(true);
    setError("");

    try {
      const [thumbUrl, f1Url, f3Url, f4Url] = await Promise.all([
        uploadFrameImage(thumb, "thumbs"),
        uploadFrameImage(frame1, "strip-1"),
        uploadFrameImage(frame3, "strip-3"),
        uploadFrameImage(frame4, "strip-4"),
      ]);

      const { error: insertError } = await supabase.from("frames").insert({
        nama_frame: namaFrame,
        jenis,
        harga: jenis === "gratis" ? 0 : Number(harga || 0),
        thumb_url: thumbUrl,
        frame_1_url: f1Url,
        frame_3_url: f3Url,
        frame_4_url: f4Url,
      });

      if (insertError) throw insertError;

      await loadFrames();
      resetForm();
      setShowAddForm(false);
    } catch (err) {
      setError(err.message || "Gagal menyimpan frame.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from("frames").delete().eq("id", id);
    if (deleteError) {
      setError("Gagal menghapus frame.");
      return;
    }
    setFrames((prev) => prev.filter((f) => f.id !== id));
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
                saving={saving}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-[calc(100vh-76px)]">
        <h1 className="font-pixel text-[28px] mb-10">Manage Frame</h1>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-[10px] border-2 border-black bg-red-200 font-semantic text-[13px]">
            {error}
          </div>
        )}

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
        {loading ? (
          <p className="font-semantic text-[13px] mt-8">Memuat frame...</p>
        ) : (
          <FrameList frames={filteredFrames} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
}
