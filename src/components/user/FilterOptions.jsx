export default function FilterOptions({ selected, onSelect }) {
  const filters = [
    { id: "normal", label: "Normal" },
    { id: "mono", label: "Monokrom" },
    { id: "sepia", label: "Sepia" },
    { id: "soft", label: "Soft" },
    { id: "pop", label: "Pop Art" },
    { id: "retro", label: "Retro" }
  ];

  return (
    <div className="w-full flex flex-col gap-4 mt-10">

      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`font-press px-7 h-14 text-xs rounded-[50px] border font-semibold transition 
              ${selected === f.id ? "bg-black text-white" : "bg-white border-black"}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
