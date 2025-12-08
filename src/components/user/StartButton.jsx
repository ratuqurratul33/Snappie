export default function StartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-press px-10 py-3 bg-[#BBDA97] rounded-full font-bold text-2xl text-black shadow-lg border-4 border-black hover:scale-105 transition-all"
    >
      START
    </button>
  );
}