# 📸 Snappie

Photobooth web app dengan tampilan **User** (ambil foto, pilih frame/colour, download) dan tampilan **Admin**
(kelola frame, kelola colour, lihat transaksi). Backend & database menggunakan **Supabase** (Postgres +
Auth + Storage), frontend deploy ke **Vercel**.

---

## 🏗️ Arsitektur

- **Frontend**: React + Vite + Tailwind (folder ini), deploy sebagai static site ke Vercel.
- **Backend**: [Supabase](https://supabase.com) — tidak perlu server terpisah. Supabase menyediakan:
  - **Database** (Postgres) untuk tabel `frames`, `colours`, `transactions`.
  - **Auth** untuk login admin (email + password).
  - **Storage** (bucket `frames`) untuk menyimpan gambar thumbnail & frame strip.
  - Semua akses diatur lewat **Row Level Security (RLS)**: data frame/colour bisa dibaca publik (dipakai
    halaman user), tapi hanya admin yang sudah login yang bisa menambah/menghapus.

## 🔧 Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql).
   File ini membuat tabel, RLS policy, dan bucket storage `frames`.
3. Buat akun admin: **Authentication > Users > Add user** (isi email + password). Akun ini dipakai untuk
   login di `/admin/login`.
4. Ambil kredensial API: **Project Settings > API** → copy `Project URL` dan `anon public` key.

## 🔑 Environment Variables

Salin `.env.example` menjadi `.env` lalu isi dengan kredensial dari langkah di atas:

```sh
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 🌱 Seed Data Awal (Colour & Frame Contoh)

Supaya admin panel tidak kosong setelah setup, ada script seed opsional yang menambahkan beberapa
colour default + 1 contoh frame:

1. Copy `supabase/.seed.env.example` menjadi `supabase/.seed.env`.
2. Isi `SUPABASE_URL` (sama seperti `.env`) dan `SUPABASE_SERVICE_ROLE_KEY` (ambil dari
   **Project Settings > API**, bagian `service_role` — **jangan pernah** taruh key ini di frontend/`.env`
   biasa, karena bisa bypass semua RLS). File `.seed.env` sudah di-gitignore, aman tidak ke-commit.
3. Jalankan:
   ```sh
   npm run seed
   ```
4. Cek di `/admin/colour` dan `/admin/frame` — datanya sudah bisa langsung dipakai atau dihapus/diganti
   kapan saja lewat admin panel seperti biasa.

## 📌 Instalasi & Menjalankan Proyek

```sh
npm install
npm run dev
```

Buka http://localhost:5173

Build untuk production:

```sh
npm run build
npm run preview
```

## 🚀 Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import project di [vercel.com](https://vercel.com) (framework preset: **Vite**).
3. Tambahkan environment variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di
   **Project Settings > Environment Variables**.
4. Deploy. File `vercel.json` sudah mengatur SPA rewrite supaya route seperti `/admin/frame` tidak 404
   saat direfresh.

## 🚀 Fitur

### Tampilan User (`/user`)
- Ambil foto lewat webcam (dengan filter & delay), atau upload foto sendiri.
- Pilih frame (gambar) atau colour frame.
- Download hasil sebagai PNG. Setiap download otomatis tercatat sebagai transaksi di database.

### Tampilan Admin (`/admin`)
- **Login** — autentikasi asli via Supabase Auth.
- **Manage Frame** — tambah frame (upload thumbnail + gambar frame strip 1/3/4 ke Supabase Storage),
  lihat daftar, filter premium, hapus.
- **Manage Colour** — tambah colour (hex/color picker), lihat daftar, hapus.
- **Transaksi** — statistik pendapatan/transaksi sukses/kunjungan dihitung dari data transaksi asli,
  dengan filter search, status, dan tanggal.

## 🏗️ Tech Stack

| Teknologi | Fungsi |
|----------|--------|
| React.js + Vite | Frontend |
| Tailwind CSS | Styling |
| Supabase | Database, Auth, Storage (backend) |
| React Router DOM | Routing |
| React Icons / React Datepicker | UI |
| Vercel | Hosting |
