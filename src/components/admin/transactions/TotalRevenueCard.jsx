export default function TotalRevenueCard({ value }) {
  return (
    <div className="elative overflow-hidden
      w-full md:w-1/3
      bg-gradient-to-br from-[#FFFFFF] to-[#FFD5D5]
      border-[2px] border-black/20
      rounded-[32px]
      shadow-[0_10px_25px_rgba(0,0,0,0.18)]
      py-6 px-8
      backdrop-blur-sm
      flex flex-col items-center text-center
      hover:scale-[1.02] transition-all duration-200"
    >
      <p className="text-[18px] font-semibold text-[#555]">Total Pendapatan</p>
      <p className="text-[36px] mt-2 font-bold text-[#C54646] tracking-wide">
        Rp {value.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
