alter table public.vlog_posts
  add column if not exists category text not null default 'technical',
  add column if not exists code_snippet text,
  add column if not exists code_language text;
