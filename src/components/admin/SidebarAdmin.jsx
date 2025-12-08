import { useNavigate, useLocation } from "react-router-dom";
import { MdPhotoLibrary, MdPayment, MdColorLens } from "react-icons/md";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="
      flex flex-col
      w-[260px] md:w-[300px] lg:w-[380px]
      min-h-screen bg-[#FBFDFC]
      border-r-[2px] border-black
      transition-all duration-300
    ">

      {/* HEADER */}
      <div className="
        w-full h-[76px]
        bg-[#F9ADB0]
        border-b-[2px] border-black
        drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        flex items-center justify-center
      ">
        <h1 className="
          font-pixel text-[32px] text-[#FAE446]
          drop-shadow-[4px_4px_0px_#000]
        ">
          SNAPPIE
        </h1>
      </div>

      {/* MENU */}
      <div className="
        mx-6 mt-8
        h-[750px] min-h-[600px] max-h-[90vh]
        bg-[#FFE98A]
        rounded-3xl
        border-[2px] border-black
        px-6 py-8
        flex flex-col
      ">

        <p className="font-pixel text-[16px] mb-8 mt-4">
          Navigation Utama
        </p>

        {/* FRAME */}
        <div
          onClick={() => navigate("/admin/frame")}
          className={`w-full flex items-center gap-2 h-[40px] font-pixel text-[13px] px-3 cursor-pointer
            hover:bg-[#F9ADB0] hover:border-[2px] hover:border-black hover:rounded-lg transition-all
            ${location.pathname === "/admin/frame" ? "bg-[#F9ADB0] border-[2px] border-black rounded-lg" : ""}
          `}
        >
          <MdPhotoLibrary className="text-[24px]" />
          Kelola Frame
        </div>

        {/* COLOUR */}
        <div
          onClick={() => navigate("/admin/colour")}
          className={`w-full flex items-center gap-2 h-[40px] font-pixel text-[13px] px-3 mt-3 cursor-pointer
            hover:bg-[#F9ADB0] hover:border-[2px] hover:border-black hover:rounded-lg transition-all
            ${location.pathname === "/admin/colour" ? "bg-[#F9ADB0] border-[2px] border-black rounded-lg" : ""}
          `}
        >
          <MdColorLens className="text-[24px]" />
          Kelola Colour
        </div>

        {/* TRANSACTION */}
        <div
          onClick={() => navigate("/admin/transaction")}
          className={`w-full flex items-center gap-2 h-[40px] font-pixel text-[13px] px-3 mt-3 cursor-pointer
            hover:bg-[#F9ADB0] hover:border-[2px] hover:border-black hover:rounded-lg transition-all
            ${location.pathname === "/admin/transaction" ? "bg-[#F9ADB0] border-[2px] border-black rounded-lg" : ""}
          `}
        >
          <MdPayment className="text-[24px]" />
          Transaction
        </div>

      </div>
    </div>
  );
}
