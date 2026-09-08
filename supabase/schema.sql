-- ============================================================
-- SNAPPIE — Supabase schema
-- Jalankan file ini di Supabase Dashboard > SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- TABLES
-- ------------------------------------------------------------

create table if not exists public.frames (
  id uuid primary key default gen_random_uuid(),
  nama_frame text not null,
  jenis text not null default 'gratis' check (jenis in ('gratis', 'premium')),
  harga integer not null default 0,
  thumb_url text,
  frame_1_url text,
  frame_3_url text,
  frame_4_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.colours (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hex text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  kode text not null unique,
  frame_id uuid references public.frames(id) on delete set null,
  frame_name text not null default 'Colour Frame',
  filter text not null default 'normal',
  status text not null default 'Gratis' check (status in ('Gratis', 'Premium')),
  harga integer not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------

alter table public.frames enable row level security;
alter table public.colours enable row level security;
alter table public.transactions enable row level security;

-- Frame & colour dibaca publik (dipakai di halaman user tanpa login)
create policy "public read frames" on public.frames
  for select using (true);

create policy "public read colours" on public.colours
  for select using (true);

-- Hanya admin (login via Supabase Auth) yang boleh mengubah frame & colour
create policy "admin insert frames" on public.frames
  for insert to authenticated with check (true);
create policy "admin update frames" on public.frames
  for update to authenticated using (true);
create policy "admin delete frames" on public.frames
  for delete to authenticated using (true);

create policy "admin insert colours" on public.colours
  for insert to authenticated with check (true);
create policy "admin update colours" on public.colours
  for update to authenticated using (true);
create policy "admin delete colours" on public.colours
  for delete to authenticated using (true);

-- Transaksi: user (anon) boleh mencatat transaksi saat download hasil foto,
-- tapi hanya admin yang boleh membaca/mengubah/menghapus daftar transaksi.
create policy "public insert transactions" on public.transactions
  for insert to anon, authenticated with check (true);
create policy "admin read transactions" on public.transactions
  for select to authenticated using (true);
create policy "admin update transactions" on public.transactions
  for update to authenticated using (true);
create policy "admin delete transactions" on public.transactions
  for delete to authenticated using (true);

-- ------------------------------------------------------------
-- GRANTS
-- Perlu di-set eksplisit kalau opsi "Automatically expose new tables"
-- dimatikan saat membuat project (RLS policy di atas tidak cukup tanpa
-- privilege GRANT ini).
-- ------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on public.frames, public.colours to anon, authenticated;
grant insert, update, delete on public.frames, public.colours to authenticated;

grant insert on public.transactions to anon, authenticated;
grant select, update, delete on public.transactions to authenticated;

-- ------------------------------------------------------------
-- STORAGE (gambar frame: thumbnail + strip 1/3/4)
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('frames', 'frames', true)
on conflict (id) do nothing;

create policy "public read frame images" on storage.objects
  for select using (bucket_id = 'frames');
create policy "admin upload frame images" on storage.objects
  for insert to authenticated with check (bucket_id = 'frames');
create policy "admin update frame images" on storage.objects
  for update to authenticated using (bucket_id = 'frames');
create policy "admin delete frame images" on storage.objects
  for delete to authenticated using (bucket_id = 'frames');

-- ------------------------------------------------------------
-- SETELAH MENJALANKAN FILE INI:
-- 1. Buat akun admin di Authentication > Users > Add user
--    (pakai email + password, lalu login lewat /admin/login)
-- 2. Salin Project URL & anon public key dari Project Settings > API
--    ke file .env (lihat .env.example)
-- ------------------------------------------------------------
