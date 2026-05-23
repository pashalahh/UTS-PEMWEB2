import { Outlet } from "react-router-dom";
import Header from "../component/header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      {/* Header Komponen Utama */}
      <Header />

      {/* Konten Utama Halaman Publik */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex-1">
        <Outlet />
      </main>

      {/* Footer Halaman */}
      <footer className="bg-pink-100 text-pink-800 text-center p-4 text-sm font-medium border-t border-pink-200">
        &copy; 2026 Invofest Universitas Harapan Bersama
      </footer>
    </div>
  );
}