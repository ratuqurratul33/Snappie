import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex w-full min-h-screen bg-white overflow-hidden">
      
      {/* SIDEBAR */}
      <SidebarAdmin />

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col bg-white">
        <TopbarAdmin />

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            w-full max-w-[1500px] mx-auto
            px-10 py-10
          "
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}
