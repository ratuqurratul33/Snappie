import { MdEdit, MdDelete } from "react-icons/md";

export default function TransactionList({ data = [] }) {
  return (
    <div
      className="
        w-full
      bg-white
        border-[2px] border-black
        rounded-[15px]
        shadow-[drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]
        mt-0
        overflow-x-auto
        text-[#4B5563]
      "
    >
      <table className="w-full text-[14px]">
        <thead>
          <tr className="bg-snappiePink text-black border-b-[2px] border-black h-[58px]">
            <th className="px-6 text-left">Transaksi ID</th>
            <th className="px-6 text-left">Frame</th>
            <th className="px-6 text-left">Filter</th>
            <th className="px-6 text-left">Tanggal Unduhan</th>
            <th className="px-6 text-center">Status</th>
            <th className="px-6 text-right">Harga</th>
            <th className="px-6 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 h-[52px] hover:bg-gray-100 transition"
            >
              <td className="px-6">{item.id}</td>
              <td className="px-6">{item.frame}</td>
              <td className="px-6">{item.filter}</td>
              <td className="px-6">{item.date}</td>

              {/* STATUS BADGE */}
              <td className="text-center">
                <span
                  className={`
                  px-3 py-[4px] text-[11px] rounded-full font-medium
                  ${
                    item.status === "Gratis"
                      ? "bg-[#BBDA97] text-black"
                      : "bg-[#F9ADB0] text-black"
                  }
                `}
                >
                  {item.status}
                </span>
              </td>

              <td className="px-6 text-right">{item.harga}</td>

              {/* ACTION BUTTON */}
              <td className="px-6 text-center flex gap-3 justify-center">
                <MdEdit
                  size={18}
                  className="cursor-pointer hover:text-black"
                  onClick={() => console.log("Edit:", item.id)}
                />
                <MdDelete
                  size={18}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => console.log("Hapus:", item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
