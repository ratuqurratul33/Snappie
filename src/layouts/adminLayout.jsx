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
