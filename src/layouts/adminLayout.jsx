import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import { supabase } from "../lib/supabaseClient";

export default function AdminLayout() {
  const [session, setSession] = useState(undefined); // undefined = belum dicek

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center font-pixel">
        Memuat...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white overflow-x-hidden">

      {/* SIDEBAR */}
      <SidebarAdmin />

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <TopbarAdmin />

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            w-full max-w-[1500px] mx-auto
            px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10
          "
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}
