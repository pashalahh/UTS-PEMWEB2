# 🚀 UTS Pemrograman Web 2 - Aplikasi Invofest

Aplikasi web *Full-Stack* manajemen kegiatan **Invofest** yang dibangun menggunakan arsitektur Monorepo. Aplikasi ini mencakup pengelolaan data Dashboard, Kategori, Event, Pembicara, hingga Biodata secara dinamis dan terintegrasi dengan database cloud.

---

## 🔗 Tautan Penting
* **🌐 Website Live (Frontend):** [https://uts-pemweb-2-7qga.vercel.app](https://uts-pemweb-2-7qga.vercel.app)
* **⚙️ API Server (Backend):** [https://uts-pemweb-2-w4wu.vercel.app](https://uts-pemweb-2-w4wu.vercel.app)
* **🎥 Video Demo & Penjelasan Code:** [https://youtu.be/h_tHSNiV3t8](https://youtu.be/h_tHSNiV3t8)

---

## 🛠️ Teknologi yang Digunakan

### Frontend (`Invofet-Front`)
* **Framework:** React.js dengan Vite & TypeScript
* **HTTP Client:** Axios (Terintegrasi ke Vercel Backend)
* **Styling:** Tailwind CSS

### Backend (`Invofest-Back`)
* **Runtime:** Node.js dengan Express.js (TypeScript)
* **ORM:** Prisma
* **Database:** PostgreSQL (Hosted on Supabase Cloud)
* **Deployment:** Vercel Serverless Functions

---

## 📁 Struktur Monorepo
```text
PERTEMUAN 2/
├── Invofet-Front/      # Aplikasi Frontend (Vite + React)
├── Invofest-Back/       # API Server Backend (Express + Prisma)
└── README.md            # Dokumentasi Proyek