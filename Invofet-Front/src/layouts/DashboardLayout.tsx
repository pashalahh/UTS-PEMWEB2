import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/UseAuthStore";
import { useState } from "react";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  // State untuk mengontrol buka/tutup sidebar di perangkat mobile
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* TOP BAR MOBILE: Hanya muncul di layar kecil */}
      <div className="flex items-center justify-between bg-pink-100 p-4 md:hidden border-b border-pink-200 shadow-xs">
        <h1 className="text-xl font-bold text-pink-800 tracking-wider">INVOFEST</h1>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-pink-800 hover:bg-pink-200 rounded-lg focus:outline-none transition-colors cursor-pointer"
        >
          {/* Icon Hamburger (jika tutup) / X (jika buka) */}
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* BACKDROP MOBILE: Layar hitam transparan saat menu mobile aktif */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR: Responsif (Slide-in di mobile, permanen di desktop) */}
      <div className={`
        fixed inset-y-0 left-0 bg-pink-100 w-64 flex flex-col justify-between p-4 z-50 transform transition-transform duration-300 ease-in-out border-r border-pink-200
        md:relative md:transform-none md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Atas: Logo */}
        <div>
          <h1 className="text-2xl font-bold text-center text-pink-800 tracking-widest hidden md:block py-2">
            INVOFEST
          </h1>
          {/* Tombol tutup tambahan di dalam sidebar khusus mobile */}
          <div className="flex justify-between items-center md:hidden mb-4 pb-2 border-b border-pink-200">
            <span className="font-bold text-pink-800">Menu Navigasi</span>
          </div>
        </div>

        {/* Tengah: Menu Links */}
        <div className="flex-1 my-6 overflow-y-auto">
          <ul className="flex flex-col gap-3 w-full">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/dashboard/category", label: "Category" },
              { to: "/dashboard/event", label: "Event" },
              { to: "/dashboard/pembicara", label: "Pembicara" },
              { to: "/dashboard/biodata", label: "Biodata" },
            ].map((menu) => (
              <li key={menu.to}>
                <Link
                  to={menu.to}
                  onClick={() => setIsOpen(false)} // Otomatis tutup sidebar di mobile setelah klik
                  className="p-3 text-sm font-semibold bg-white text-pink-800 border border-pink-200 rounded-xl block text-center shadow-xs hover:bg-pink-700 hover:text-white hover:border-pink-700 transition duration-200 cursor-pointer"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bawah: Tombol Logout */}
        <div className="pt-2 border-t border-pink-200 md:border-none">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full p-3 bg-red-600 text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-red-500 shadow-md transition duration-200 active:scale-98"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KANAN: Konten Utama (Outlet) */}
      <div className="flex-1 w-full overflow-x-hidden">
        <main className="w-full min-h-full">
          <Outlet />
        </main>
      </div>

    </div>
  );
}