const DEVELOPERS = [
  { name: "Sabilla Anggraeni", github: "https://github.com/Sabillaagrn" },
  { name: "Ratu Qurratul Aini", github: "https://github.com/ratuqurratul33" },
];

export default function Footer() {
  return (
    <footer className="w-full px-4 pt-6 sm:pt-10 pb-6 sm:pb-8 text-center text-white">
      <p className="font-press text-[9px] sm:text-[11px] tracking-wide opacity-90 mb-3">
        Dibuat oleh
      </p>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
        {DEVELOPERS.map((dev) => (
          <a
            key={dev.github}
            href={dev.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-press text-[10px] sm:text-xs underline decoration-2 underline-offset-4 hover:text-[#FFE97F] transition-colors"
          >
            {dev.name}
          </a>
        ))}
      </div>

      <p className="font-press text-[8px] sm:text-[10px] opacity-70 leading-relaxed">
        Dibangun dengan React, Tailwind CSS &amp; Supabase
        <br />
        © {new Date().getFullYear()} Snappie Photobooth
      </p>
    </footer>
  );
}
