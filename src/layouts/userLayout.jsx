import { Outlet, useLocation } from "react-router-dom";

export default function UserLayout() {
  const location = useLocation();

  // halaman yang TIDAK pakai layout
  if (location.pathname === "/user/edit-frame") {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen w-full bg-[#3298E0] overflow-x-hidden">
      <Outlet />
    </div>
  );
}
