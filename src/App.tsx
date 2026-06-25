import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RedirectTransition from "./components/RedirectTransition";

// Pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import StatutesPage from "./pages/StatutesPage";
import LeadershipPage from "./pages/LeadershipPage";
import ContactPage from "./pages/ContactPage";
import UVPage from "./pages/UVPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace("#/", "").replace("#", "");
    return ["home", "about", "statutes", "leadership", "contact", "uv"].includes(hash) ? hash : "home";
  });

  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      if (["home", "about", "statutes", "leadership", "contact", "uv"].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleExternalRedirectClicks = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }
      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");
        if (href && href.startsWith("https://acier-bj.bolt.host")) {
          e.preventDefault();
          setRedirectUrl(href);
          setTimeout(() => {
            window.location.href = href;
          }, 1800);
        }
      }
    };
    document.addEventListener("click", handleExternalRedirectClicks, true);
    return () => document.removeEventListener("click", handleExternalRedirectClicks, true);
  }, []);

  const navigateTo = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = `#/${pageId}`;
    // Scroll to top instantly for a fresh page render feel
    window.scrollTo(0, 0);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage />;
      case "statutes":
        return <StatutesPage />;
      case "leadership":
        return <LeadershipPage />;
      case "contact":
        return <ContactPage />;
      case "uv":
        return <UVPage />;
      case "home":
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-acier-50 flex flex-col font-sans overflow-x-hidden antialiased">
      {/* Full-screen Redirect Transition overlay */}
      {redirectUrl && <RedirectTransition targetUrl={redirectUrl} />}

      {/* Navigation Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Pages Container */}
      <main className="flex-grow pt-16">
        <div className="relative">
          {renderActivePage()}
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
