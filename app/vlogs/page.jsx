"use client";

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

  return (
    <div className="overflow-x-clip antialiased">
      <Masthead homeHref="/" links={NAV_LINKS} />
      <main id="main-content" tabIndex="-1">
        <Vlogs posts={vlogs} />
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
