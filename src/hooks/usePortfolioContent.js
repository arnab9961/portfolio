"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function usePortfolioContent() {
  const [profile, setProfile] = useState(null);
  const [vlogs, setVlogs] = useState([]);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    Promise.all([
      supabase.from("site_profile").select("*").eq("id", 1).maybeSingle(),
      supabase
        .from("vlog_posts")
        .select("id, title, category, body, code_snippet, code_language, image_url, slug, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false }),
    ]).then(([profileResult, vlogsResult]) => {
      if (!active) return;
      if (!profileResult.error && profileResult.data) setProfile(profileResult.data);
      if (!vlogsResult.error && vlogsResult.data) setVlogs(vlogsResult.data);
    });

    return () => {
      active = false;
    };
  }, []);

  return { profile, vlogs };
}
