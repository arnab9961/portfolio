"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../src/lib/supabase";

const EMPTY_PROFILE = {
  name: "D.M. Rafiun Bin Masud",
  eyebrow: "AI Engineer · Dhaka, Bangladesh",
  headline: "I build practical AI systems for real-world problems.",
  summary: "",
  hero_image_url: "",
};

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState({ title: "", body: "", image_url: "", status: "draft" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadContent();
  }, [session]);

  async function loadContent() {
    const [{ data: profileData }, { data: postData }] = await Promise.all([
      supabase.from("site_profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("vlog_posts").select("*").order("created_at", { ascending: false }),
    ]);
    if (profileData) setProfile(profileData);
    if (postData) setPosts(postData);
  }

  async function login(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in.");
  }

  async function saveProfile(event) {
    event.preventDefault();
    const { error } = await supabase.from("site_profile").upsert({ ...profile, id: 1 });
    setMessage(error ? error.message : "Profile saved.");
  }

  async function uploadImage(file, onUploaded) {
    if (!file) return;
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error } = await supabase.storage.from("portfolio-images").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
    onUploaded(data.publicUrl);
  }

  async function savePost(event) {
    event.preventDefault();
    const payload = {
      ...draft,
      slug: draft.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      published_at: draft.status === "published" ? new Date().toISOString() : null,
    };
    const query = draft.id
      ? supabase.from("vlog_posts").update(payload).eq("id", draft.id)
      : supabase.from("vlog_posts").insert(payload);
    const { error } = await query;
    setMessage(error ? error.message : "Vlog saved.");
    if (!error) {
      setDraft({ title: "", body: "", image_url: "", status: "draft" });
      loadContent();
    }
  }

  async function deletePost(id) {
    const { error } = await supabase.from("vlog_posts").delete().eq("id", id);
    setMessage(error ? error.message : "Vlog deleted.");
    if (!error) loadContent();
  }

  if (!supabase) {
    return <main className="admin-page"><h1>Admin setup required</h1><p>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.</p></main>;
  }

  if (!session) {
    return (
      <main className="admin-page">
        <Link className="quiet" href="/">Back to portfolio</Link>
        <h1>Admin login</h1>
        <form className="admin-form" onSubmit={login}>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="btn" type="submit">Sign in</button>
          {message && <p className="err">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-header"><Link className="quiet" href="/">Back to portfolio</Link><button type="button" className="quiet" onClick={() => supabase.auth.signOut()}>Sign out</button></div>
      <h1>Portfolio admin</h1>
      <p>{message}</p>
      <section className="admin-section"><h2>Profile</h2><form className="admin-form" onSubmit={saveProfile}>
        {["name", "eyebrow", "headline", "summary", "hero_image_url"].map((field) => <label key={field}>{field.replaceAll("_", " ")}{field === "summary" ? <textarea value={profile[field] || ""} onChange={(event) => setProfile({ ...profile, [field]: event.target.value })} /> : <input value={profile[field] || ""} onChange={(event) => setProfile({ ...profile, [field]: event.target.value })} />}</label>)}
        <label>Upload hero image<input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files[0], (url) => setProfile({ ...profile, hero_image_url: url }))} /></label>
        <button className="btn" type="submit">Save profile</button>
      </form></section>
      <section className="admin-section"><h2>New vlog</h2><form className="admin-form" onSubmit={savePost}>
        <label>Title<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required /></label>
        <label>Text<textarea value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} required /></label>
        <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label>Image<input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files[0], (url) => setDraft({ ...draft, image_url: url }))} /></label>
        <button className="btn" type="submit">{draft.id ? "Update vlog" : "Save vlog"}</button>
      </form></section>
      <section className="admin-section"><h2>Existing vlogs</h2>{posts.map((post) => <article className="admin-post" key={post.id}><strong>{post.title}</strong><span>{post.status}</span><button type="button" className="quiet" onClick={() => setDraft(post)}>Edit</button><button type="button" className="quiet" onClick={() => deletePost(post.id)}>Delete</button></article>)}</section>
    </main>
  );
}
