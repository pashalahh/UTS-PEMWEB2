import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function Dashboard() {
  // State untuk menyimpan total jumlah data dari database
  const [stats, setStats] = useState({
    events: 0,
    categories: 0,
    speakers: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Tarik semua data secara bersamaan agar loading-nya cepat
    Promise.all([
      api.get("/events"),
      api.get("/categories"),
      api.get("/pembicara")
    ])
      .then(([resEvent, resCategory, resPembicara]) => {
        setStats({
          events: resEvent.data.length,
          categories: resCategory.data.length,
          speakers: resPembicara.data.length,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat statistik dashboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      {/* 🌟 Bagian Atas: Header Halaman (Sesuai Template) */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Utama</h1>
          <p className="text-gray-600 text-sm">Selamat datang di halaman manajemen data sistem Invofest!</p>
        </div>
      </div>

      <hr className="mb-6 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse">Sedang memuat ringkasan data...</p>}

      {!loading && (
        /* Pembungkus grid disesuaikan responsive agar stabil di berbagai ukuran viewport */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Card Total Event */}
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between transition duration-200 hover:shadow-lg">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Jadwal Event</p>
              <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{stats.events}</h3>
              <p className="text-[11px] text-pink-700 font-bold mt-2">📅 Kegiatan Aktif</p>
            </div>
            <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center text-xl shrink-0">
              🎈
            </div>
          </div>

          {/* 2. Card Total Kategori */}
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between transition duration-200 hover:shadow-lg">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori Event</p>
              <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{stats.categories}</h3>
              <p className="text-[11px] text-purple-700 font-bold mt-2">🗂️ Pengelompokan Data</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-xl shrink-0">
              📦
            </div>
          </div>

          {/* 3. Card Total Pembicara */}
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between transition duration-200 hover:shadow-lg">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pembicara Utama</p>
              <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{stats.speakers}</h3>
              <p className="text-[11px] text-green-700 font-bold mt-2">👤 Pemateri Terdaftar</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl shrink-0">
              🎙️
            </div>
          </div>

        </div>
      )}
    </div>
  );
}