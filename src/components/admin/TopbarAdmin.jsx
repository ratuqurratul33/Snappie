import { MdSearch, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function TopBarAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="h-[56px] sm:h-[64px] lg:h-[72px] bg-[#F9ADB0] border-b-[2px]
     border-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
     flex items-center justify-end gap-2 sm:gap-4 px-3 sm:px-4 md:px-8">

      <div className="relative flex items-center flex-1 min-w-0">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full max-w-[800px] md:max-w-[900px] h-[36px] sm:h-[44px]
            bg-white
            rounded-full
            border-[1px] border-black
            pl-4 sm:pl-10 pr-8 sm:pr-10
            font-pixel text-[11px] sm:text-[14px]
            shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          "
        />
        <MdSearch className="absolute right-3 sm:right-4 text-[20px] sm:text-[35px] text-[#1E1E1E]" />
      </div>

      <button
        onClick={handleLogout}
        className="
          shrink-0 flex items-center gap-2 h-[36px] sm:h-[44px] px-3 sm:px-5
          bg-white rounded-full border-[1px] border-black
          font-pixel text-[11px] sm:text-[13px]
          shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          hover:bg-black hover:text-white transition
        "
      >
        <MdLogout size={16} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}
