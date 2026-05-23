import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../../api/axiosInstance";


interface Category {
  id: number;
  name: string;
}

interface Pembicara {
  id: number;
  name: string;
}

interface EventData {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;
  categoryId: number;
  pembicaraId: number | null;
  category: Category;
  pembicara: Pembicara | null;
}

export default function EventIndex() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk kontrol inline edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    dateEvent: "",
    description: "",
    categoryId: "",
    pembicaraId: ""
  });

  // Load seluruh data relasi dari Backend secara paralel
  useEffect(() => {
    Promise.all([
      api.get("/events"),
      api.get("/categories"),
      api.get("/pembicara")
    ])
      .then(([resEvent, resCategory, resPembicara]) => {
        setEvents(resEvent.data);
        setCategories(resCategory.data);
        setSpeakers(resPembicara.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data event.");
        setLoading(false);
      });
  }, []);

  // Membuka mode edit dan mem-parsing data lama ke dalam form input
  const startEdit = (event: EventData) => {
    setEditingId(event.id);
    const formattedDate = event.dateEvent ? new Date(event.dateEvent).toISOString().slice(0, 16) : "";

    setEditForm({
      name: event.name,
      location: event.location,
      dateEvent: formattedDate,
      description: event.description,
      categoryId: String(event.categoryId),
      pembicaraId: event.pembicaraId ? String(event.pembicaraId) : ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // Tembak API PUT ke Backend untuk memperbarui database
  const handleUpdateSubmit = async (id: number) => {
    if (!editForm.name.trim() || !editForm.location.trim() || !editForm.categoryId || !editForm.dateEvent) {
      alert("Semua field wajib (kecuali pembicara) harus diisi!");
      return;
    }

    setSaveLoading(true);
    try {
      const payload = {
        name: editForm.name,
        location: editForm.location,
        dateEvent: editForm.dateEvent,
        description: editForm.description,
        categoryId: Number(editForm.categoryId),
        pembicaraId: editForm.pembicaraId ? Number(editForm.pembicaraId) : null
      };

      await api.put(`/events/${id}`, payload);
      alert("Event berhasil diperbarui!");
      
      setEditingId(null);
      window.location.reload(); // Reload halaman untuk memuat ulang relasi kategori/pembicara yang baru dari database
    } catch (err) {
      console.error("Gagal update event:", err);
      alert("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Tembak API DELETE ke Backend
  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus event ini?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(e => e.id !== id));
        alert("Event berhasil dihapus!");
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus event.");
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Event</h1>
          <p className="text-gray-600 text-sm">Daftar schedule pelaksanaan kegiatan Invofest</p>
        </div>
        <Link 
          to="/dashboard/event/create" 
          className="p-2 bg-green-800 text-white rounded hover:bg-green-700 transition cursor-pointer text-sm font-semibold shadow"
        >
          Tambah Event
        </Link>
      </div>

      <hr className="mb-6 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse">Sedang memuat data event...</p>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-4">Belum ada jadwal event.</p>
          ) : (
            events.map((event) => {
              const isEditing = editingId === event.id;

              return (
                <div 
                  key={event.id} 
                  className={`bg-white p-5 rounded-xl shadow-md border flex flex-col justify-between transition duration-200 ${
                    isEditing ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-100 hover:shadow-lg"
                  }`}
                >
                  {/* --- KONDISI JIKA SEDANG DIEDIT INLINE --- */}
                  {isEditing ? (
                    <div className="space-y-3 w-full">
                      <h4 className="text-xs font-bold text-pink-600 uppercase tracking-wider">Edit Informasi Event</h4>
                      
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Nama Event:</label>
                        <input 
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Kategori:</label>
                        <select
                          value={editForm.categoryId}
                          onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        >
                          <option value="">-- Pilih Kategori --</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Pembicara:</label>
                        <select
                          value={editForm.pembicaraId}
                          onChange={(e) => setEditForm({ ...editForm, pembicaraId: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        >
                          <option value="">-- Tanpa Pembicara --</option>
                          {speakers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Lokasi:</label>
                        <input 
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Waktu Pelaksanaan:</label>
                        <input 
                          type="datetime-local"
                          value={editForm.dateEvent}
                          onChange={(e) => setEditForm({ ...editForm, dateEvent: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Deskripsi:</label>
                        <textarea 
                          rows={2}
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-pink-500"
                          disabled={saveLoading}
                        />
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleUpdateSubmit(event.id)}
                          disabled={saveLoading}
                          className="flex-1 py-1.5 px-3 bg-green-700 text-white text-xs font-semibold rounded hover:bg-green-800 transition cursor-pointer text-center disabled:bg-gray-300"
                        >
                          {saveLoading ? "..." : "Simpan"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          disabled={saveLoading}
                          className="flex-1 py-1.5 px-3 bg-gray-500 text-white text-xs font-semibold rounded hover:bg-gray-600 transition cursor-pointer text-center disabled:bg-gray-300"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* --- KONDISI NORMAL (MENAMPILKAN DATA CARD) --- */
                    <>
                      <div className="w-full">
                        {/* Baris Kategori Badge & Jam */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700 uppercase tracking-wider">
                            {event.category?.name || "Uncategorized"}
                          </span>
                          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            ⏰ {new Date(event.dateEvent).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                          </span>
                        </div>

                        {/* Judul & Detail */}
                        <h3 className="text-xl font-bold text-gray-800 mb-1 wrap-break-words line-clamp-1">{event.name}</h3>
                        
                        <p className="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1">
                          📅 {new Date(event.dateEvent).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <p className="text-sm text-gray-600 mb-3 font-medium flex items-center gap-1 text-ellipsis overflow-hidden whitespace-nowrap">
                          📍 {event.location}
                        </p>
                        
                        <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed wrap-break-words">
                          {event.description || "Tidak ada deskripsi event."}
                        </p>
                      </div>

                      {/* Informasi Pembicara & Tombol Menu Terbawah */}
                      <div className="border-t border-gray-100 pt-3 w-full">
                        <div className="flex justify-between items-end gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Speaker</p>
                            <p className="text-xs font-bold text-gray-700 truncate">
                              👤 {event.pembicara?.name || "Tanpa Pembicara"}
                            </p>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => startEdit(event)}
                              className="py-1 px-2.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition text-center cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="py-1 px-2.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition text-center cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}