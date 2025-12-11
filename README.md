🔧 Cara Instalasi & Menjalankan Proyek
### 📌 1️⃣ Clone Repository
git clone https://github.com/username/admin-snappie-fe.git
cd admin-snappie-fe

### 📌 2️⃣ Install Dependencies
npm install


Perintah ini akan mengunduh semua library yang dibutuhkan (React, Vite, Tailwind, Router, dsb).

### 📌 3️⃣ Jalankan Server Development
npm run dev


Setelah server berjalan, buka:

http://localhost:5173

### 📌 4️⃣ Build untuk Production
npm run build


Hasil build akan muncul di folder:

/dist

### 📌 5️⃣ Preview Hasil Build (Opsional)
npm run preview

### 📌 6️⃣ Reset Data LocalStorage (Jika diperlukan)

Halaman Admin Snappie menyimpan data berikut pada browser:

frames

colors

transactions (opsional)

Gunakan ini untuk mereset:

localStorage.removeItem("frames");
localStorage.removeItem("colors");
localStorage.removeItem("transactions");

### 📌 7️⃣ Pastikan Node.js & Git Sudah Terinstal
Tools	Minimal Version
Node.js	v16+
NPM	v8+
Git	Latest