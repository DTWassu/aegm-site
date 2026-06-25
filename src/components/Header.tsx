import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", id: "home" },
    { name: "À Propos & Missions", id: "about" },
    { name: "Statuts & Textes", id: "statutes" },
    { name: "Bureau National", id: "leadership" },
    { name: "Éditions UV", id: "uv" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3.5 border-b border-acier-200"
          : "bg-white/70 backdrop-blur-sm py-5 border-b border-acier-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => {
              onNavigate("home");
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-brand-blue rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
              {/* Spinning gear SVG */}
              <svg
                className="w-7 h-7 text-white animate-[spin_12s_linear_infinite]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              {/* Small marker inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] font-black text-brand-blue-light select-none">M</span>
              </div>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold font-display tracking-tight text-acier-900 group-hover:text-brand-blue transition-colors leading-none">
                AEGM – BÉNIN
              </span>
              <span className="block text-[8px] sm:text-[9px] uppercase font-bold font-mono tracking-wider text-acier-500 mt-1">
                Génie Mécanique
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "text-brand-blue bg-brand-blue-light"
                      : "text-acier-700 hover:text-brand-blue hover:bg-acier-50"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Portal Button matching ACIER portal blue login button */}
          <div className="hidden md:block">
            <a
              href="https://acier-bj.bolt.host/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-brand-blue-dark/10 group"
              id="desktop-portal-btn"
            >
              <span>Portail ACIER</span>
              <ExternalLink className="w-4 h-4 text-brand-blue-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-acier-700 hover:text-brand-blue hover:bg-acier-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[65px] bg-white border-b border-acier-200 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "text-brand-blue bg-brand-blue-light"
                    : "text-acier-800 hover:bg-acier-50 hover:text-brand-blue"
                }`}
              >
                {link.name}
              </button>
            );
          })}
          <div className="pt-4 border-t border-acier-100">
            <a
              href="https://acier-bj.bolt.host/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center space-x-2 w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <span>Accéder au Portail ACIER</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
