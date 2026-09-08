import { useState, useEffect } from "react";
import ColourAddForm from "../../components/admin/ColourAddForm";
import ColourList from "../../components/admin/ColourList";
import { supabase } from "../../lib/supabaseClient";

export default function ManageColour() {
  const [colours, setColours] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadColours = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("colours")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Gagal memuat data colour.");
    } else {
      setColours(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadColours();
  }, []);

  const handleAddColour = async ({ name, hex }) => {
    const { error: insertError } = await supabase
      .from("colours")
      .insert({ name, hex });

    if (insertError) {
      setError("Gagal menyimpan colour.");
      return;
    }

    await loadColours();
    setShowAddForm(false);
  };

  const handleDeleteColour = async (id) => {
    const { error: deleteError } = await supabase.from("colours").delete().eq("id", id);
    if (deleteError) {
      setError("Gagal menghapus colour.");
      return;
    }
    setColours((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full min-h-[calc(100vh-76px)] px-10 pt-10">

      <h1 className="font-pixel text-[28px] mb-8">Manage Colour</h1>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-[10px] border-2 border-black bg-red-200 font-semantic text-[13px]">
          {error}
        </div>
      )}

      {/* ACTION BAR */}
      <div className="w-full bg-white border-2 border-black rounded-[12px] shadow-[0_4px_0_#000] px-12 py-6 flex justify-center gap-10 mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-[300px] h-[65px] font-pixel border-[2px] border-black
          rounded-[10px] bg-white hover:bg-snappiePink hover:text-white
          shadow-[0_4px_0_#000] transition"
        >
          + Tambah Colour
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="font-semantic text-[13px] mt-8">Memuat colour...</p>
      ) : (
        <ColourList colours={colours} onDelete={handleDeleteColour} />
      )}

      {/* POPUP */}
      {showAddForm && (
        <ColourAddForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddColour}
        />
      )}
    </div>
  );
}
