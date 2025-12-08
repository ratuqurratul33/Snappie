export default function TotalSuccessTransactionCard({ value }) {
  return (
    <div className="elative overflow-hidden
      w-full md:w-1/3
      bg-gradient-to-br from-[#FFFFFF] to-[#BBDA97]
      border-[2px] border-black/20
      rounded-[32px]
      shadow-[0_10px_25px_rgba(0,0,0,0.18)]
      py-6 px-8
      backdrop-blur-sm
      flex flex-col items-center text-center
      hover:scale-[1.02] transition-all duration-200"
    >
      <p className="text-[18px] font-semibold text-[#555]">Total Transaksi Sukses</p>
      <p className="text-[36px] mt-2 font-bold text-[#3D8E3C] tracking-wide">
        {value.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
