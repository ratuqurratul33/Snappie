import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { convertAdminFrames } from "../utils/convertAdminFrames";
import { convertAdminColours } from "../utils/colorConverter";

// Ambil daftar frame gambar + colour dari Supabase untuk halaman user
export function useFrames() {
  const [allFrames, setAllFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [{ data: frames }, { data: colours }] = await Promise.all([
        supabase.from("frames").select("*").order("created_at", { ascending: false }),
        supabase.from("colours").select("*").order("created_at", { ascending: false }),
      ]);

      if (cancelled) return;

      setAllFrames([
        ...convertAdminColours(colours || []),
        ...convertAdminFrames(frames || []),
      ]);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { allFrames, loading };
}
