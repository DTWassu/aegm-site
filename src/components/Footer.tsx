import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, Mail, Phone, MapPin, Copy, Check, X } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showContacts, setShowContacts] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowContacts(false);
        setIsLocked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showContacts) {
      setShowContacts(true);
      setIsLocked(true);
    } else {
      setIsLocked(!isLocked);
      if (isLocked) {
        setShowContacts(false);
      }
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContacts(false);
    setIsLocked(false);
  };

  return (
    <footer className="bg-acier-900 text-white border-t border-acier-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand/Slogan Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white animate-[spin_12s_linear_infinite]"
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
              </div>
              <div>
                <span className="block text-base font-bold font-display tracking-tight text-white group-hover:text-brand-blue-accent transition-colors leading-none">
                  AEGM – BÉNIN
                </span>
                <span className="block text-[8px] uppercase font-mono tracking-widest text-acier-400 mt-1">
                  Association Génie Mécanique
                </span>
              </div>
            </button>

            <p className="text-xs text-acier-400 leading-relaxed font-light max-w-sm">
              Organisation professionnelle et apolitique dédiée à l'enseignement de la construction mécanique et métallique en République du Bénin.
            </p>

            <p className="text-xs text-brand-blue-accent font-semibold italic">
              « Solides comme l'ACIER, unis pour la mécanique »
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-bold font-mono tracking-wider text-acier-400 uppercase mb-4">
                Découverte
              </span>
              <ul className="space-y-3 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate("home")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left"
                  >
                    Accueil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("about")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left"
                  >
                    À Propos & Missions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("uv")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left text-xs"
                  >
                    Université de Vacances
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <span className="block text-xs font-bold font-mono tracking-wider text-acier-400 uppercase mb-4">
                Gouvernance
              </span>
              <ul className="space-y-3 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate("statutes")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left"
                  >
                    Les Statuts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("leadership")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left"
                  >
                    Bureau Exécutif
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="text-acier-300 hover:text-brand-blue-accent transition-colors cursor-pointer text-left"
                  >
                    Nous Contacter
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Portal Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-xs font-bold font-mono tracking-wider text-acier-400 uppercase mb-4">
              Espace Membre
            </span>
            <p className="text-xs text-acier-400 leading-relaxed font-light">
              Gérez votre adhésion de cellule de base, votez en ligne pour les résolutions en Assemblée Générale et accédez à l'espace de formation continue.
            </p>
            <a
              href="https://acier-connect.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 w-full justify-center px-4 py-3 text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all border border-brand-blue-dark/15 shadow-md"
            >
              <span>Portail ACIER Connect</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Legal copyrights */}
        <div className="pt-8 border-t border-acier-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-acier-500 font-light">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {currentYear} AEGM-BÉNIN. Tous droits réservés. Établi au Lycée Technique d'Akassato, Bénin.
            </p>
            <p className="text-acier-600">
              Loi 2025-19 relative à la liberté d'association
            </p>
          </div>
          
          {/* Developer Attribution with Polished ISKF Logo and Interactive Contacts */}
          <div 
            ref={containerRef}
            className="relative"
            onMouseEnter={() => setShowContacts(true)}
            onMouseLeave={() => {
              if (!isLocked) {
                setShowContacts(false);
              }
            }}
          >
            {/* Popover Card */}
            {showContacts && (
              <div className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 bg-acier-900 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md z-50 animate-fade-in text-white">
                {/* Decorative Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue to-brand-blue-accent rounded-t-2xl"></div>
                
                {/* Header with Close and Logo */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm">
                      <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                        <circle cx="50" cy="50" r="48" fill="#ffffff" />
                        <circle cx="24" cy="27" r="6" fill="#E31E24" />
                        <rect x="19.5" y="36" width="9" height="12" rx="1" fill="#0274B3" />
                        <text x="39" y="46" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="21" fontWeight="900" fill="#0274B3" textAnchor="middle">S</text>
                        <text x="34" y="78" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="36" fontWeight="900" fill="#000000" textAnchor="middle">K</text>
                        <text x="49" y="78" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="58" fontWeight="900" fill="#0274B3">F</text>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">ISKF Entreprises</h4>
                      <p className="text-[10px] text-brand-blue-accent font-medium">Solutions Numériques</p>
                    </div>
                  </div>
                  
                  {/* Close button for explicit close/unlock */}
                  <button 
                    onClick={handleClose}
                    className="p-1 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                    title="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact List */}
                <div className="space-y-3 text-xs">
                  {/* Email */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group/item">
                    <a 
                      href="mailto:iskf.entreprises@gmail.com" 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors flex-1 pr-2 truncate cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-brand-blue-accent shrink-0" />
                      <span className="truncate">iskf.entreprises@gmail.com</span>
                    </a>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy("iskf.entreprises@gmail.com", "email");
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white/80 transition-all cursor-pointer animate-none"
                      title="Copier l'adresse email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-fade-in" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group/item">
                    <a 
                      href="tel:+2290197647095" 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors flex-1 pr-2 font-mono cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-brand-blue-accent shrink-0" />
                      <span>+229 01 97 64 70 95</span>
                    </a>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy("+2290197647095", "phone");
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white/80 transition-all cursor-pointer animate-none"
                      title="Copier le numéro"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-fade-in" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.02] border border-transparent select-none">
                    <MapPin className="w-4 h-4 text-brand-blue-accent shrink-0" />
                    <span className="text-white/75 leading-tight">Cotonou, République du Bénin</span>
                  </div>
                </div>

                {/* Arrow indicator at bottom */}
                <div className="absolute top-full right-10 -mt-1 w-3 h-3 bg-acier-900 border-r border-b border-white/10 rotate-45"></div>
              </div>
            )}

            {/* Main trigger button */}
            <button
              onClick={handleButtonClick}
              className="flex items-center space-x-3 bg-white/[0.02] hover:bg-white/[0.05] active:scale-95 transition-all duration-300 px-4 py-2.5 rounded-xl border border-white/5 shadow-inner group text-left cursor-pointer"
            >
              <span className="text-[10px] text-acier-400 font-mono tracking-wider uppercase select-none">Développé par</span>
              <div className="flex items-center space-x-2.5">
                {/* Logo matches exact png structure */}
                <div className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                    {/* Circle background */}
                    <circle cx="50" cy="50" r="48" fill="#ffffff" />
                    
                    {/* Letter i */}
                    {/* Red Dot */}
                    <circle cx="24" cy="27" r="6" fill="#E31E24" />
                    {/* Blue stem */}
                    <rect x="19.5" y="36" width="9" height="12" rx="1" fill="#0274B3" />
                    
                    {/* Letter S */}
                    <text x="39" y="46" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="21" fontWeight="900" fill="#0274B3" textAnchor="middle">S</text>
                    
                    {/* Letter K */}
                    <text x="34" y="78" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="36" fontWeight="900" fill="#000000" textAnchor="middle">K</text>
                    
                    {/* Letter F */}
                    <text x="49" y="78" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="58" fontWeight="900" fill="#0274B3">F</text>
                  </svg>
                </div>
                <div className="flex flex-col text-left select-none">
                  <span className="text-xs font-bold text-white tracking-tight leading-none group-hover:text-brand-blue-accent transition-colors">ISKF Entreprises</span>
                  <span className="text-[9px] text-brand-blue-accent font-medium mt-0.5">Solutions Numériques</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
