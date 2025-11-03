-- Requires pgcrypto for gen_random_uuid on some hosts
create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  role text check (role in ('ADMIN','LEADER','MEMBER')) default 'MEMBER',
  created_at timestamp with time zone default now()
);

create table if not exists songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  ccli text,
  default_key text,
  bpm int,
  meter text,
  tags text[],
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);

create table if not exists song_assets (
  id uuid primary key default gen_random_uuid(),
  song_id uuid references songs(id) on delete cascade,
  kind text check (kind in ('pdf','chordpro','audio','image')) not null,
  url text not null,
  key text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_at timestamptz not null,
  end_at timestamptz,
  location text,
  call_time timestamptz,
  notes text,
  status text check (status in ('draft','published')) default 'draft',
  is_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists setlists (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  title text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists setlist_items (
  id uuid primary key default gen_random_uuid(),
  setlist_id uuid references setlists(id) on delete cascade,
  position int not null,
  song_id uuid references songs(id),
  key text,
  arrangement_notes text,
  transition_notes text
);

create table if not exists positions (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

insert into positions (id, name)
  values (gen_random_uuid(),'Lead Vocal'),(gen_random_uuid(),'BGV'),(gen_random_uuid(),'Acoustic'),
         (gen_random_uuid(),'Electric'),(gen_random_uuid(),'Bass'),(gen_random_uuid(),'Drums'),
         (gen_random_uuid(),'Keys'),(gen_random_uuid(),'FOH'),(gen_random_uuid(),'Lyrics')
  on conflict do nothing;

create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  position_id uuid references positions(id),
  user_id uuid references profiles(id),
  status text check (status in ('invited','accepted','declined','tentative')) default 'invited',
  notes text
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id),
  title text not null,
  body_md text not null,
  is_public boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table songs enable row level security;
alter table song_assets enable row level security;
alter table events enable row level security;
alter table setlists enable row level security;
alter table setlist_items enable row level security;
alter table assignments enable row level security;
alter table posts enable row level security;

-- Helper
create or replace function is_leader() returns boolean language sql stable as $$
  select exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('ADMIN','LEADER'))
$$;

-- Policies
create policy "profiles read self or leaders" on profiles
  for select using (auth.uid() = id or is_leader());
create policy "profiles admin manage" on profiles
  for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

create policy "songs read auth" on songs for select using (auth.role() = 'authenticated');
create policy "songs leaders write" on songs for all using (is_leader());

create policy "song_assets read auth" on song_assets for select using (auth.role() = 'authenticated');
create policy "song_assets leaders write" on song_assets for all using (is_leader());

create policy "events read auth or public" on events for select using (auth.role() = 'authenticated' or is_public = true);
create policy "events leaders write" on events for all using (is_leader());

create policy "setlists read auth" on setlists for select using (auth.role() = 'authenticated');
create policy "setlists leaders write" on setlists for all using (is_leader());

create policy "setlist_items read auth" on setlist_items for select using (auth.role() = 'authenticated');
create policy "setlist_items leaders write" on setlist_items for all using (is_leader());

create policy "assignments read auth" on assignments for select using (auth.role() = 'authenticated');
create policy "assignments leaders write" on assignments for all using (is_leader());

create policy "posts read auth or public" on posts for select using (auth.role() = 'authenticated' or is_public = true);
create policy "posts leaders write" on posts for all using (is_leader());

-- Storage policies to configure via Storage UI (SQL shown for clarity):
-- In Storage → Buckets, create 'media' (private). Then add policies similar to:
-- create policy "media read auth" on storage.objects for select using (bucket_id = 'media' and auth.role() = 'authenticated');
-- create policy "media write leaders" on storage.objects for insert to public, update, delete using (
--   bucket_id = 'media' and exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('ADMIN','LEADER'))
-- );
