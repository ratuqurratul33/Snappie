// src/utils/convertAdminFrames.js
export function convertAdminFrames(adminFrames) {
  return adminFrames.map((f) => ({
    id: f.id,
    type: "image",
    thumb: f.thumb_url,
    isFree: f.jenis === "gratis",
    harga: f.harga || 0,
    frameByStrip: {
      1: f.frame_1_url,
      3: f.frame_3_url,
      4: f.frame_4_url,
    },
  }));
}
