import { supabase } from "../lib/supabaseClient";

// Upload sebuah File ke bucket "frames" dan kembalikan public URL-nya.
export async function uploadFrameImage(file, folder = "misc") {
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("frames").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("frames").getPublicUrl(path);
  return data.publicUrl;
}
