// Seed data awal (colours + 1 contoh frame) ke Supabase.
// Jalankan SEKALI SAJA secara lokal: node supabase/seed.mjs
// Butuh supabase/.seed.env (copy dari .seed.env.example) berisi SERVICE ROLE KEY —
// JANGAN PERNAH commit file itu atau taruh service role key di frontend.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadSeedEnv() {
  const envPath = path.join(__dirname, ".seed.env");
  const env = {};
  let content;
  try {
    content = readFileSync(envPath, "utf-8");
  } catch {
    console.error(
      `Tidak menemukan ${envPath}.\nCopy dari supabase/.seed.env.example lalu isi SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY.`
    );
    process.exit(1);
  }
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadSeedEnv();
if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi di supabase/.seed.env");
  process.exit(1);
}

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const colours = [
  { name: "Hitam", hex: "#000000" },
  { name: "Putih", hex: "#FFFFFF" },
  { name: "Snappie Pink", hex: "#F9ADB0" },
  { name: "Snappie Yellow", hex: "#FFE97F" },
  { name: "Snappie Green", hex: "#A7DA70" },
  { name: "Sky Blue", hex: "#3298E0" },
];

const frameAssets = {
  thumb: "seed-assets/classic-thumb.svg",
  1: "seed-assets/classic-frame-1.svg",
  3: "seed-assets/classic-frame-3.svg",
  4: "seed-assets/classic-frame-4.svg",
};

async function uploadAsset(localPath, storagePath) {
  const fileBuffer = readFileSync(path.join(__dirname, localPath));
  const { error } = await supabase.storage.from("frames").upload(storagePath, fileBuffer, {
    contentType: "image/svg+xml",
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("frames").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  console.log("Seeding colours...");
  const { error: colourError } = await supabase.from("colours").insert(colours);
  if (colourError) {
    console.error("  Gagal insert colours:", colourError.message);
  } else {
    console.log(`  -> ${colours.length} colours ditambahkan.`);
  }

  console.log("Upload & seed contoh frame...");
  const [thumbUrl, f1Url, f3Url, f4Url] = await Promise.all([
    uploadAsset(frameAssets.thumb, "seed/classic-thumb.svg"),
    uploadAsset(frameAssets[1], "seed/classic-frame-1.svg"),
    uploadAsset(frameAssets[3], "seed/classic-frame-3.svg"),
    uploadAsset(frameAssets[4], "seed/classic-frame-4.svg"),
  ]);

  const { error: frameError } = await supabase.from("frames").insert({
    nama_frame: "Classic Pastel",
    jenis: "gratis",
    harga: 0,
    thumb_url: thumbUrl,
    frame_1_url: f1Url,
    frame_3_url: f3Url,
    frame_4_url: f4Url,
  });

  if (frameError) {
    console.error("  Gagal insert frame:", frameError.message);
  } else {
    console.log("  -> Frame 'Classic Pastel' ditambahkan.");
  }

  console.log("Selesai.");
}

main();
