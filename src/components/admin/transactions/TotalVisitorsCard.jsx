export default function TotalVisitorsCard({ value }) {
  return (
    <div className="relative overflow-hidden
      w-full md:w-1/3
      bg-gradient-to-br from-[#FFFFFF] to-[#FDF1BF]
      border-[2px] border-black/20
      rounded-[32px]
      shadow-[0_10px_25px_rgba(0,0,0,0.18)]
      py-6 px-8
      backdrop-blur-sm
      flex flex-col items-center text-center
      hover:scale-[1.02] transition-all duration-200"
    >
      <p className="text-[18px] font-semibold text-[#555]">Total Kunjungan</p>
      <p className="text-[36px] mt-2 font-bold text-[#356FCD] tracking-wide">
        {value.toLocaleString("id-ID")}
        <span className="text-[16px] font-medium text-[#356FCD] ml-2">
          visitors
        </span>
      </p>
    </div>
  );
}
