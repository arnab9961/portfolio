create policy "Admins can read their own membership"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));
