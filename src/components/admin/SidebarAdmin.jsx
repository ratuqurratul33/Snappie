import { useNavigate, useLocation } from "react-router-dom";
import { MdPhotoLibrary, MdPayment, MdColorLens } from "react-icons/md";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: "/admin/frame", label: "Kelola Frame", icon: MdPhotoLibrary },
    { path: "/admin/colour", label: "Kelola Colour", icon: MdColorLens },
    { path: "/admin/transaction", label: "Transaction", icon: MdPayment },
  ];

  return (
    <div
      className="
        flex flex-col
        w-full lg:w-[300px] xl:w-[380px]
        lg:min-h-screen bg-[#FBFDFC]
        border-b-2 lg:border-b-0 lg:border-r-2 border-black
        transition-all duration-300
      "
    >
      {/* HEADER */}
      <div
        className="
          w-full h-[52px] sm:h-[64px] lg:h-[76px]
          bg-[#F9ADB0]
          border-b-2 border-black
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          flex items-center justify-center
        "
      >
        <h1
          className="
            font-pixel text-lg sm:text-2xl lg:text-[32px] text-[#FAE446]
            drop-shadow-[4px_4px_0px_#000]
          "
        >
          SNAPPIE
        </h1>
      </div>

      {/* MENU */}
      <div
        className="
          mx-2 sm:mx-4 lg:mx-6 mt-2 mb-2 lg:mt-8 lg:mb-0
          lg:h-[750px] lg:min-h-[600px] lg:max-h-[90vh]
          bg-[#FFE98A]
          rounded-xl lg:rounded-3xl
          border-2 border-black
          px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-8
          flex flex-row lg:flex-col
          gap-2 lg:gap-0
          overflow-x-auto lg:overflow-visible
        "
      >
        <p className="hidden lg:block font-pixel text-[16px] mb-8 mt-4 shrink-0">
          Navigation Utama
        </p>

        {items.map(({ path, label, icon: Icon }) => ( // eslint-disable-line no-unused-vars -- Icon is used in JSX below
          <div
            key={path}
            onClick={() => navigate(path)}
            className={`shrink-0 lg:w-full flex items-center gap-2 h-[40px] font-pixel text-[10px] sm:text-[12px] lg:text-[13px] px-3 lg:mt-3 first:lg:mt-0 cursor-pointer whitespace-nowrap
              hover:bg-[#F9ADB0] hover:border-[2px] hover:border-black hover:rounded-lg transition-all
              ${location.pathname === path ? "bg-[#F9ADB0] border-[2px] border-black rounded-lg" : ""}
            `}
          >
            <Icon className="text-[18px] sm:text-[20px] lg:text-[24px]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
