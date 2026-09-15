# 📸 Snappie

A full-stack photobooth web app — take strip photos with a webcam, pick a color or custom sticker frame, and download the result. Comes with a complete admin panel to manage frames, colors, and transactions. 🎞️

---

## ✨ Features

- 🤳 **Webcam photobooth** — 1/3/4-photo strips, adjustable countdown timer (3s/5s/10s), live filters (mono, sepia, soft, pop, retro), and one-click auto-capture (no re-clicking the shutter between shots).
- 🖼️ **Frame picker** — choose a plain color border or an admin-uploaded sticker frame, shown in separate, clearly labeled sections.
- 📥 **Instant PNG download** — the final strip is rendered client-side on a `<canvas>`, matching the live preview pixel-for-pixel.
- 🔐 **Real admin authentication** — email/password login via Supabase Auth, protected routes.
- 🎛️ **Admin dashboard** — full CRUD for frames (with image upload to Supabase Storage) and colors, plus a transactions view with live stats (revenue, successful downloads, visits) and search/status/date filters.
- 📱 **Responsive by design** — usable from a small phone screen up to desktop, including the admin panel.
- 🌱 **One-command database seeding** — populate a fresh Supabase project with starter colors and a sample frame.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS |
| Backend | [Supabase](https://supabase.com) — Postgres, Auth, Storage (no custom server needed) |
| Routing | React Router DOM |
| UI utilities | React Icons, React Datepicker, react-webcam |
| Hosting | Vercel (static frontend) |

## 🎯 Project Purpose

This project was built to practice and demonstrate:

- **Client-side canvas compositing** — capturing webcam frames, clipping/cropping them into a computed strip layout, and correcting for mirrored front-camera feeds.
- **Backend-as-a-Service architecture** — using Supabase's Postgres + Auth + Storage directly from the frontend instead of hand-rolling a REST API, secured entirely with **Row Level Security (RLS)** policies (public read, authenticated-only write).
- **State machine design in React** — coordinating a multi-step, self-continuing capture sequence (countdown → capture → pause → repeat) using refs and effects without race conditions.
- **Mobile-first responsive UI** — one codebase adapting from a small phone to a desktop admin dashboard.
- **Shared derived logic** — a single geometry module (`frameLayout.js`) used by both the live preview and the final canvas render, so they can never visually drift apart.

## 📝 Notes

- [`adminSnappie`](https://github.com/ratuqurratul33/adminSnappie) is a separate, earlier repository — a standalone UI prototype of the admin dashboard (static dummy data, no backend). This `Snappie` repository is the current, fully-functional, unified app — it contains **both** the user-facing photobooth and the real admin panel in one codebase.
- Supabase acts as the backend; there is no separate Node/Express server to deploy.

## 🖼️ Preview

**Live demo:** [snappie-delta.vercel.app](https://snappie-delta.vercel.app)

| Start | Camera | Edit Frame | Admin Login |
|---|---|---|---|
| ![Start page](<docs/screenshots/Screenshot 2026-09-15 014724.png>) | ![Camera page](<docs/screenshots/Screenshot 2026-09-15 014757.png>) | ![Edit frame page](<docs/screenshots/Screenshot 2026-09-15 015156.png>) | ![Admin login](<docs/screenshots/Screenshot 2026-09-15 015449.png>) |

| Manage Frame | Add Frame/Colour popup | Manage Colour | Transactions |
|---|---|---|---|
| ![Manage frame](<docs/screenshots/Screenshot 2026-09-15 015228.png>) | ![Add popup](<docs/screenshots/Screenshot 2026-09-15 015248.png>) | ![Manage colour](<docs/screenshots/Screenshot 2026-09-15 015237.png>) | ![Transactions](<docs/screenshots/Screenshot 2026-09-15 015303.png>) |


## 🚀 How to Build

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql) — this creates the tables, RLS policies, and the `frames` storage bucket.
3. Create an admin account under **Authentication → Users → Add user** (this logs into `/admin/login`).
4. Grab your API credentials from **Project Settings → API** (`Project URL` and `anon public` key).

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```sh
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. (Optional) Seed starter data

```sh
cp supabase/.seed.env.example supabase/.seed.env
# fill in SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in supabase/.seed.env
npm run seed
```

### 4. Install & run

```sh
npm install
npm run dev
```

Open http://localhost:5173

Build for production:

```sh
npm run build
npm run preview
```

### 5. Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com) (framework preset: **Vite**).
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Project Settings → Environment Variables**.
4. Deploy — `vercel.json` already handles SPA rewrites so routes like `/admin/frame` don't 404 on refresh.

## 👩‍💻 Developer

**Ratu Qurratul Aini**
Informatics Engineering Student

- 📧 Email: [ratuquratul@gmail.com](mailto:ratuquratul@gmail.com)
- 🔗 LinkedIn: [linkedin.com/in/ratu-qurratul-aini-885b7a2a6](https://www.linkedin.com/in/ratu-qurratul-aini-885b7a2a6/)
