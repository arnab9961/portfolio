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
          <div className="vlog-intro">
            <p className="vlog-kicker">A small technical notebook</p>
            <p className="vlog-count">
              {selectedPost ? "Reading one note" : `${categoryPosts.length} ${categoryPosts.length === 1 ? "note" : "notes"}`}
            </p>
          </div>
          <div className="vlog-categories">
            <Link href="/vlogs/" aria-current={!selectedCategory ? "page" : undefined}>All</Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/vlogs/?category=${encodeURIComponent(category)}`}
                aria-current={selectedCategory === category ? "page" : undefined}
              >
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
