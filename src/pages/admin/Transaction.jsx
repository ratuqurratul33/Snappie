import { useState, useEffect } from "react";
import TransactionList from "../../components/admin/TransactionList";
import { MdSearch, MdFilterAlt, MdDateRange } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { supabase } from "../../lib/supabaseClient";

// Statistic Cards
import TotalRevenueCard from "../../components/admin/transactions/TotalRevenueCard";
import TotalSuccessTransactionCard from "../../components/admin/transactions/TotalSuccessTransactionCard";
import TotalVisitorsCard from "../../components/admin/transactions/TotalVisitorsCard";

// date
import DatePicker from "react-datepicker";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Gagal memuat data transaksi.");
    } else {
      setTransactions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from("transactions").delete().eq("id", id);
    if (deleteError) {
      setError("Gagal menghapus transaksi.");
      return;
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // STATS (dihitung dari data transaksi asli)
  const stats = {
    revenue: transactions
      .filter((t) => t.status === "Premium")
      .reduce((sum, t) => sum + (t.harga || 0), 0),
    success: transactions.length,
    visitors: transactions.length,
  };

  // Date filter
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // SEARCH & FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // TAMPILAN untuk TransactionList
  const tableData = transactions.map((t) => ({
    id: t.kode,
    _id: t.id,
    frame: t.frame_name,
    filter: t.filter,
    date: new Date(t.created_at).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    rawDate: t.created_at,
    status: t.status,
    harga: t.status === "Gratis" ? "Rp 0" : `Rp ${Number(t.harga).toLocaleString("id-ID")}`,
  }));

  // FILTERING LOGIC
  const filteredData = tableData.filter((item) => {
    const matchSearch =
      item.frame.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = selectedDate
      ? new Date(item.rawDate).toDateString() === selectedDate.toDateString()
      : true;

    const matchStatus = filterStatus ? item.status === filterStatus : true;

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="w-full min-h-[calc(100vh-76px)] py-8 px-10">
      <div className="max-w-[1500px] mx-auto">

        {/* TITLE */}
        <h1 className="font-pixel text-[28px] mb-8">Transaksi</h1>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-[10px] border-2 border-black bg-red-200 font-semantic text-[13px]">
            {error}
          </div>
        )}

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
        {loading ? (
          <p className="font-semantic text-[13px]">Memuat transaksi...</p>
        ) : (
          <TransactionList data={filteredData} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
