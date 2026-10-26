"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ui/common/ErrorBoundary";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { createSkipLink } from "./utils/accessibility";
import { ToastProvider } from "./components/ui/common/Toast";
import Masthead from "./components/layout/Masthead/Masthead";
import Hero from "./components/sections/Hero/Hero";
import Work from "./components/sections/Work/Work";
import FurtherOut from "./components/sections/FurtherOut/FurtherOut";
import Contact from "./components/sections/Contact/Contact";
import Vlogs from "./components/sections/Vlogs/Vlogs";
import usePortfolioContent from "./hooks/usePortfolioContent";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Further out", href: "#further-out" },
  { label: "Vlogs", href: "#vlogs" },
  { label: "Contact", href: "#contact" },
];

function AppContent() {
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  const { profile, vlogs } = usePortfolioContent();

  // Add skip link for accessibility
  useEffect(() => {
    const skipLink = createSkipLink();
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return (
    <div className="overflow-x-clip antialiased">
      <Masthead homeHref="#hero" links={NAV_LINKS} name={profile?.name} />

      <main id="main-content" tabIndex="-1">
        <ErrorBoundary sectionName="hero section">
          <section id="hero">
            <Hero profile={profile} />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="work section">
          <section id="projects" className="day">
            <Work />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="further out section">
          <section id="further-out" className="out">
            <FurtherOut />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="vlogs section">
          <Vlogs posts={vlogs} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="contact section">
          <section id="contact" className="contact">
            <Contact />
          </section>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;
