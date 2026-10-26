alter table public.vlog_posts
  add column if not exists category text not null default 'technical';
