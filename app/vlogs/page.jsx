"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Masthead from "../../src/components/layout/Masthead/Masthead";
import Vlogs from "../../src/components/sections/Vlogs/Vlogs";
import usePortfolioContent from "../../src/hooks/usePortfolioContent";

const NAV_LINKS = [
  { label: "Portfolio", href: "/" },
  { label: "Admin", href: "/admin/" },
];

export default function VlogsPage() {
  const { vlogs } = usePortfolioContent();
  const [query] = useState(() => {
    if (typeof window === "undefined") return { category: "", post: "" };
    const params = new URLSearchParams(window.location.search);
    return { category: params.get("category") || "", post: params.get("post") || "" };
  });
  const selectedCategory = query.category;
  const selectedSlug = query.post;

  const categories = useMemo(
    () => [...new Set(vlogs.map((post) => post.category || "uncategorized"))],
    [vlogs],
  );
  const categoryPosts = selectedCategory
    ? vlogs.filter((post) => (post.category || "uncategorized") === selectedCategory)
    : vlogs;
  const selectedPost = selectedSlug ? vlogs.find((post) => post.slug === selectedSlug) : null;

  return (
    <div className="overflow-x-clip antialiased">
      <Masthead homeHref="/" links={NAV_LINKS} />
      <main id="main-content" tabIndex="-1">
        <section className="vlog-browser wrap" aria-label="Vlog categories">
          <div className="vlog-categories">
            <Link href="/vlogs/">All</Link>
            {categories.map((category) => (
              <Link key={category} href={`/vlogs/?category=${encodeURIComponent(category)}`}>
                {category}
              </Link>
            ))}
          </div>
          {selectedPost ? (
            <>
              <Link className="quiet" href={`/vlogs/${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : ""}`}>
                ← Back to vlogs
              </Link>
              <Vlogs posts={[selectedPost]} />
            </>
          ) : (
            <>
              <Vlogs posts={categoryPosts} />
              <div className="vlog-links">
                {categoryPosts.map((post) => (
                  <Link key={post.id} href={`/vlogs/?post=${encodeURIComponent(post.slug)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ""}`}>
                    Read {post.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
        {!vlogs.length && (
          <div className="wrap" style={{ paddingBottom: "5rem" }}>
            <p>No published vlogs yet.</p>
            <Link href="/">Return to portfolio</Link>
          </div>
        )}
      </main>
    </div>
  );
}
