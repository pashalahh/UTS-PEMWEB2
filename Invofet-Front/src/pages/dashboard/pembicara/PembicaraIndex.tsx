import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import api from "../../../api/axiosInstance";


interface Pembicara {
  id: number | string; 
  name: string;        
  role: string;        
  image: string;        
}

export default function PembicaraIndex() {
  const [pembicaraList, setPembicaraList] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk manajemen inline edit
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("");
  const [editFoto, setEditFoto] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Mengambil data dari endpoint /pembicara
  useEffect(() => {
    api.get("/pembicara")
      .then((response) => {
        setPembicaraList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pembicara:", err);
        setError("Gagal memuat data pembicara.");
        setLoading(false);
      });
  }, []);

  const startEdit = (pembicara: Pembicara) => {
    setEditingId(pembicara.id);
    setEditName(pembicara.name);
    setEditRole(pembicara.role);
    setEditFoto(pembicara.image);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditRole("");
    setEditFoto("");
  };

  // Menyimpan update (PUT /pembicara/:id)
  const handleSaveEdit = async (id: number | string) => {
    if (!editName.trim() || !editRole.trim() || !editFoto.trim()) {
      alert("Semua data pembicara (Nama, Role, Foto) harus diisi!");
      return;
    }

    setSaveLoading(true);
    try {
      await api.put(`/pembicara/${id}`, {
        name: editName,
        role: editRole,
        image: editFoto,
      });

      // Update state lokal agar UI React langsung sinkron secara reaktif
      setPembicaraList(
        pembicaraList.map((p) =>
          p.id === id ? { ...p, name: editName, role: editRole, image: editFoto } : p
        )
      );

      setEditingId(null);
      alert("Data pembicara berhasil diperbarui!");
    } catch (err) {
      console.error("Gagal mengupdate pembicara:", err);
      alert("Gagal menyimpan perubahan ke server.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Menghapus data (DELETE /pembicara/:id)
  const handleDelete = async (id: number | string) => {
    if (confirm("Apakah kamu yakin ingin menghapus pembicara ini?")) {
      try {
        await api.delete(`/pembicara/${id}`);
        setPembicaraList(pembicaraList.filter((p) => p.id !== id));
        alert("Pembicara berhasil dihapus!");
      } catch (err) {
        console.error("Gagal menghapus pembicara:", err);
        alert("Gagal menghapus pembicara dari server.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pembicara</h1>
          <p className="text-gray-600 text-sm">Kelola daftar pembicara acara Invofest!</p>
        </div>
        
        <Link 
          to="/dashboard/pembicara/create" 
          className="p-2 bg-green-800 text-white rounded hover:bg-green-700 transition cursor-pointer text-sm font-semibold shadow"
        >
          Tambah Pembicara
        </Link>
      </div>

      <hr className="mb-6 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse">Sedang memuat data...</p>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pembicaraList.map((pembicara) => {
            const isEditing = editingId === pembicara.id;

            return (
              <div 
                key={pembicara.id} 
                className={`bg-white p-5 rounded-xl shadow-md border flex flex-col justify-between transition duration-200 ${
                  isEditing ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-100 hover:shadow-lg"
                }`}
              >
                {/* --- KONDISI JIKA SEDANG DIEDIT --- */}
                {isEditing ? (
                  <div className="space-y-3 w-full">
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Nama Pembicara:</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-pink-500 text-gray-800"
                        disabled={saveLoading}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Role / Jabatan:</label>
                      <input
                        type="text"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-pink-500 text-gray-800"
                        disabled={saveLoading}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">URL Foto:</label>
                      <input
                        type="text"
                        value={editFoto}
                        onChange={(e) => setEditFoto(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-pink-500 text-gray-800"
                        disabled={saveLoading}
                      />
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleSaveEdit(pembicara.id)}
                        disabled={saveLoading}
                        className="flex-1 py-1.5 px-3 bg-green-700 text-white text-xs font-semibold rounded hover:bg-green-800 transition cursor-pointer disabled:bg-gray-300"
                      >
                        {saveLoading ? "..." : "Simpan"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={saveLoading}
                        className="flex-1 py-1.5 px-3 bg-gray-500 text-white text-xs font-semibold rounded hover:bg-gray-600 transition cursor-pointer disabled:bg-gray-300"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  /* --- KONDISI NORMAL (MENAMPILKAN DATA) --- */
                  <>
                    <div className="flex flex-col items-center text-center mb-4">
                      {/* Tampilan Foto dengan Fallback Gambar Rusak */}
                      <img 
                        src={pembicara.image} 
                        alt={pembicara.name}
                        onError={(e) => {
                          // Jika link gambar dari Supabase mati/salah, ganti otomatis ke gambar default
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
                        }}
                        className="w-24 h-24 rounded-full object-cover shadow-inner border-2 border-gray-100 mb-3"
                      />
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1 break-all">{pembicara.name}</h3>
                      <p className="text-xs font-semibold text-pink-600 tracking-wider uppercase mt-0.5">{pembicara.role}</p>
                    </div>

                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                      <button
                        onClick={() => startEdit(pembicara)}
                        className="flex-1 py-1.5 px-3 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition text-center cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pembicara.id)}
                        className="flex-1 py-1.5 px-3 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition text-center cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}