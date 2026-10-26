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

function getErrorMessage(error) {
  if (!error) return "";
  if (error.code === "42501") {
    return "আপনার account admin হিসেবে অনুমোদিত নয়। Supabase-এর public.admin_users table-এ আপনার Auth user UUID যোগ করুন।";
  }
  if (error.code === "23505") {
    return "এই title-এর vlog আগে থেকেই আছে। অন্য title ব্যবহার করুন।";
  }
  return error.message || "কাজটি সম্পন্ন করা যায়নি।";
}

function createSlug(title) {
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return slug || `vlog-${Date.now()}`;
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState({
    title: "",
    body: "",
    code_snippet: "",
    code_language: "javascript",
    image_url: "",
    status: "draft",
  });
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
    const [profileResult, postsResult] = await Promise.all([
      supabase.from("site_profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("vlog_posts").select("*").order("created_at", { ascending: false }),
    ]);
    if (profileResult.error) setMessage(getErrorMessage(profileResult.error));
    if (postsResult.error) setMessage(getErrorMessage(postsResult.error));
    if (profileResult.data) setProfile(profileResult.data);
    if (postsResult.data) setPosts(postsResult.data);
  }

  async function login(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? getErrorMessage(error) : "Signed in.");
  }

  async function saveProfile(event) {
    event.preventDefault();
    const { error } = await supabase.from("site_profile").upsert({ ...profile, id: 1 });
    setMessage(error ? getErrorMessage(error) : "Profile saved.");
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
      title: draft.title.trim(),
      body: draft.body.trim(),
      code_snippet: draft.code_snippet.trim() || null,
      code_language: draft.code_language.trim() || null,
      image_url: draft.image_url || null,
      status: draft.status,
      slug: createSlug(draft.title),
      published_at: draft.status === "published" ? new Date().toISOString() : null,
    };
    const query = draft.id
      ? supabase.from("vlog_posts").update(payload).eq("id", draft.id)
      : supabase.from("vlog_posts").insert(payload);
    const { error } = await query;
    setMessage(error ? getErrorMessage(error) : "Vlog saved.");
    if (!error) {
      setDraft({
        title: "",
        body: "",
        code_snippet: "",
        code_language: "javascript",
        image_url: "",
        status: "draft",
      });
      loadContent();
    }
  }

  async function deletePost(id) {
    const { error } = await supabase.from("vlog_posts").delete().eq("id", id);
    setMessage(error ? getErrorMessage(error) : "Vlog deleted.");
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
      {message && <p className={message === "Vlog saved." || message === "Profile saved." || message === "Vlog deleted." ? "" : "err"}>{message}</p>}
      <section className="admin-section"><h2>Profile</h2><form className="admin-form" onSubmit={saveProfile}>
        {["name", "eyebrow", "headline", "summary", "hero_image_url"].map((field) => <label key={field}>{field.replaceAll("_", " ")}{field === "summary" ? <textarea value={profile[field] || ""} onChange={(event) => setProfile({ ...profile, [field]: event.target.value })} /> : <input value={profile[field] || ""} onChange={(event) => setProfile({ ...profile, [field]: event.target.value })} />}</label>)}
        <label>Upload hero image<input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files[0], (url) => setProfile({ ...profile, hero_image_url: url }))} /></label>
        <button className="btn" type="submit">Save profile</button>
      </form></section>
      <section className="admin-section"><h2>New vlog</h2><form className="admin-form" onSubmit={savePost}>
        <label>Title<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required /></label>
        <label>Text<textarea value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} required /></label>
        <label>Code language<input value={draft.code_language || ""} onChange={(event) => setDraft({ ...draft, code_language: event.target.value })} placeholder="javascript, python, sql" /></label>
        <label>Code snippet<textarea className="code-input" value={draft.code_snippet || ""} onChange={(event) => setDraft({ ...draft, code_snippet: event.target.value })} placeholder="Paste an optional code snippet here" spellCheck="false" /></label>
        <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label>Image<input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files[0], (url) => setDraft({ ...draft, image_url: url }))} /></label>
        <button className="btn" type="submit">{draft.id ? "Update vlog" : "Save vlog"}</button>
      </form></section>
      <section className="admin-section"><h2>Existing vlogs</h2>{posts.map((post) => <article className="admin-post" key={post.id}><strong>{post.title}</strong><span>{post.status}</span><button type="button" className="quiet" onClick={() => setDraft(post)}>Edit</button><button type="button" className="quiet" onClick={() => deletePost(post.id)}>Delete</button></article>)}</section>
    </main>
  );
}
