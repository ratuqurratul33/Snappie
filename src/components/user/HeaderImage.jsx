export default function HeaderImage() {
  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/webImage/Dashboard.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Title */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
        <h1
          className="font-press text-7xl font-bold text-[#FFE97F] tracking-wider"
          style={{
            textShadow: "4px 4px 0px #000, -2px -2px 0px rgba(0,0,0,0.3)",
          }}
        >
          SNAPPIE
        </h1>
      </div>
    </div>
  );
}
