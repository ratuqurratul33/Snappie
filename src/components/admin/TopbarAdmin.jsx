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
    <div className="h-[72px] bg-[#F9ADB0] border-b-[2px]
     border-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
     flex items-center justify-end gap-4 px-4 md:px-8">

      <div className="relative flex items-center flex-1">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full max-w-[800px] md:max-w-[900px] h-[44px]
            bg-white
            rounded-full
            border-[1px] border-black
            px-10 pr-10
            font-pixel text-[14px]
            shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          "
        />
        <MdSearch className="absolute right-4 text-[35px] text-[#1E1E1E]" />
      </div>

      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2 h-[44px] px-5
          bg-white rounded-full border-[1px] border-black
          font-pixel text-[13px]
          shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          hover:bg-black hover:text-white transition
        "
      >
        <MdLogout size={18} />
        Logout
      </button>
    </div>
  );
}
