// Footer copyright kecil & simple — dipakai di halaman yang belum punya
// footer sama sekali (kamera, edit-frame, admin). Beda dengan
// components/Footer.jsx yang isinya kredit developer di halaman Start.
export default function CopyrightFooter({ light = false }) {
  return (
    <p
      className={`w-full text-center font-press text-[8px] sm:text-[9px] py-3 ${
        light ? "text-white/60" : "text-black/40"
      }`}
    >
      © {new Date().getFullYear()} Snappie. All rights reserved.
    </p>
  );
}
