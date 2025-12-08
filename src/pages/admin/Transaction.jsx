import { useState } from "react";
import TransactionList from "../../components/admin/TransactionList";
import { MdSearch, MdFilterAlt, MdDateRange } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

// Statistic Cards
import TotalRevenueCard from "../../components/admin/transactions/TotalRevenueCard";
import TotalSuccessTransactionCard from "../../components/admin/transactions/TotalSuccessTransactionCard";
import TotalVisitorsCard from "../../components/admin/transactions/TotalVisitorsCard";

// date
import DatePicker from "react-datepicker";

export default function TransactionPage() {
  // Dummy STATS
  const [stats] = useState({
    revenue: 500000,
    success: 500,
    visitors: 150000,
  });

  // Dummy TRANSACTION DATA
  const dummyData = [
    {
      id: "SNPP-001095",
      frame: "Classic Chic",
      filter: "Monokrom",
      date: "March 12, 2023",
      status: "Premium",
      harga: "Rp 1.000",
    },
    {
      id: "SNPP-002201",
      frame: "Retro Pop",
      filter: "Sepia",
      date: "April 2, 2023",
      status: "Gratis",
      harga: "Rp 0",
    },
  ];

  // Date filter
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // SEARCH & FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // FILTERING LOGIC
  const filteredData = dummyData.filter((item) => {
    const matchSearch =
      item.frame.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = selectedDate
      ? new Date(item.date).toDateString() === selectedDate.toDateString()
      : true;

    const matchStatus = filterStatus ? item.status === filterStatus : true;

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="w-full min-h-[calc(100vh-76px)] py-8 px-10">
      <div className="max-w-[1500px] mx-auto">

        {/* TITLE */}
        <h1 className="font-pixel text-[28px] mb-8">Transaksi</h1>

        {/* STAT CARDS */}
        <div className="w-full flex justify-between gap-6 mt-8 mb-10">
          <TotalRevenueCard value={stats.revenue} />
          <TotalSuccessTransactionCard value={stats.success} />
          <TotalVisitorsCard value={stats.visitors} />
        </div>

        {/* FILTER BAR */}
        <div className="w-full flex items-center gap-4 bg-snappiePink border-[2px] border-black rounded-[25px] px-6 py-4 mb-8 shadow-md relative">

          {/* SEARCH */}
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[45px] border-[2px] border-black rounded-[12px] pl-10 pr-4 bg-white font-pixel text-[11px]"
            />
          </div>

          {/* FRAME FILTER (dummy) */}
          <button className="flex items-center justify-center gap-2 w-[110px] h-[45px] bg-white border-[2px] border-black rounded-[12px] font-pixel text-[11px] hover:bg-[#FFE97F] transition-all">
            <MdFilterAlt size={16} /> Frame <IoIosArrowDown size={14} />
          </button>

          {/* DATE FILTER */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center justify-center gap-2 w-[110px] h-[45px] bg-white border-[2px] border-black rounded-[12px] font-pixel text-[11px] hover:bg-[#FFE97F] transition-all"
            >
              <MdDateRange size={18} /> Date <IoIosArrowDown size={14} />
            </button>

            {showDatePicker && (
              <div className="absolute top-[50px] left-0 z-[100] bg-white p-2 border-[2px] border-black rounded-[12px]">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowDatePicker(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>

          {/* STATUS FILTER */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center justify-center gap-2 w-[110px] h-[45px] bg-white border-[2px] border-black rounded-[12px] font-pixel text-[11px] hover:bg-[#FFE97F] transition-all"
            >
              <MdFilterAlt size={16} /> Status <IoIosArrowDown size={14} />
            </button>

            {showStatusDropdown && (
              <div className="absolute top-[52px] left-0 w-[120px] bg-white border-[2px] border-black rounded-[12px] shadow-md z-[100]">
                <button
                  onClick={() => {
                    setFilterStatus("Premium");
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-4 py-2 font-pixel text-[11px] hover:bg-[#FFD1D1] border-b border-black/20"
                >
                  Premium
                </button>

                <button
                  onClick={() => {
                    setFilterStatus("Gratis");
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-4 py-2 font-pixel text-[11px] hover:bg-[#D9F5B5]"
                >
                  Gratis
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        <TransactionList data={filteredData} />
      </div>
    </div>
  );
}
