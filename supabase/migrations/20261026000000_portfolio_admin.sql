create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.site_profile (
  id integer primary key check (id = 1),
  name text not null,
  eyebrow text not null,
  headline text not null,
  summary text not null,
  hero_image_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.vlog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  body text not null check (char_length(body) between 1 and 30000),
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vlog_posts_published_idx
  on public.vlog_posts (published_at desc)
  where status = 'published';

alter table public.admin_users enable row level security;
alter table public.site_profile enable row level security;
alter table public.vlog_posts enable row level security;

create policy "Public can read the profile"
  on public.site_profile for select to anon, authenticated using (true);

create policy "Admins can manage the profile"
  on public.site_profile for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Public can read published vlogs"
  on public.vlog_posts for select to anon, authenticated
  using (status = 'published' or exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can manage vlogs"
  on public.vlog_posts for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

insert into public.site_profile (id, name, eyebrow, headline, summary)
values (
  1,
  'D.M. Rafiun Bin Masud',
  'AI Engineer · Dhaka, Bangladesh',
  'I build practical AI systems for real-world problems.',
  'I am an AI Engineer at SM Technology, working across machine learning, computer vision, language models, backend APIs and production-ready deployment.'
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

create policy "Public can view portfolio images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-images');

create policy "Admins can upload portfolio images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can update portfolio images"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (bucket_id = 'portfolio-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can delete portfolio images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
