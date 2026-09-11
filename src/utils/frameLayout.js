// Satu-satunya sumber kebenaran untuk geometri strip foto (dipakai oleh
// FramePreview -- live preview -- dan EditFrame -- render canvas saat
// download -- supaya keduanya selalu identik dan tidak drift lagi).
//
// Sebelumnya tiap strip count (1/3/4) punya angka margin & gap hasil
// tebak-tebakan sendiri-sendiri, dan untuk strip 4 hasilnya foto numpuk
// di atas dengan sisa ruang kosong besar di bawah (tidak sesuai frame).
// Sekarang tinggi tiap foto dihitung otomatis supaya strip SELALU
// mengisi penuh dari margin atas sampai margin bawah, untuk berapa pun
// jumlah fotonya.

const CM = 37.79527559;

// frameWidth/frameHeight: ukuran kertas hasil cetak.
// photoWidth: lebar tiap foto (sisa kiri-kanan otomatis jadi margin simetris).
// margin: jarak dari tepi atas & bawah frame ke foto pertama/terakhir.
// gap: jarak antar foto dalam satu strip.
const RAW_CONFIG = {
  1: { frameWidth: 14, frameHeight: 10.5, photoWidth: 12.5, margin: 1, gap: 0 },
  3: { frameWidth: 10.5, frameHeight: 22.5, photoWidth: 8.83, margin: 1, gap: 0.7 },
  4: { frameWidth: 10.5, frameHeight: 29.7, photoWidth: 8.83, margin: 1, gap: 0.7 },
};

export function getSlot(stripCount) {
  const cfg = RAW_CONFIG[stripCount] || RAW_CONFIG[1];
  const count = stripCount > 0 ? stripCount : 1;

  const frameWidth = cfg.frameWidth * CM;
  const frameHeight = cfg.frameHeight * CM;
  const width = cfg.photoWidth * CM;
  const gap = cfg.gap * CM;
  const yStart = cfg.margin * CM;

  // Tinggi foto dihitung mundur dari ruang yang tersisa, jadi strip selalu
  // pas mengisi frame -- tidak peduli berapa margin/gap yang dipakai.
  const height = (frameHeight - 2 * yStart - (count - 1) * gap) / count;
  const x = (frameWidth - width) / 2;

  return { width, height, x, yStart, gap, frameWidth, frameHeight };
}
