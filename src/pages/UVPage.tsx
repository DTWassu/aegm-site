import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, ArrowRight, ExternalLink, Image as ImageIcon, Sparkles, BookOpen, MessageSquare, ChevronRight, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../lib/supabase";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function UVPage() {
  const [activeEdition, setActiveEdition] = useState<"2026" | "2025" | "history">("2026");
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [editions, setEditions] = useState<any[]>([]);
  const [galleryMap, setGalleryMap] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUVData() {
      try {
        const { data: editionsData, error: editionsError } = await supabase
          .from("editions_uv")
          .select("*")
          .order("annee", { ascending: false });

        if (editionsError) throw editionsError;

        if (editionsData && editionsData.length > 0) {
          setEditions(editionsData);

          // For each edition, fetch its gallery items
          for (const edition of editionsData) {
            const { data: galleryData, error: galleryError } = await supabase
              .from("galerie_uv")
              .select("*")
              .eq("edition_id", edition.id)
              .order("ordre_affichage", { ascending: true });

            if (!galleryError && galleryData) {
              setGalleryMap(prev => ({
                ...prev,
                [edition.id]: galleryData,
              }));
            }
          }
        }
      } catch (err) {
        console.warn("Could not retrieve UV data from Supabase (using default fallback values):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUVData();
  }, []);

  // Target Date for UV 2026: 25 August 2026 at 08:00:00 UTC+1 (Benin Time)
  useEffect(() => {
    const targetDate = new Date("2026-08-25T08:00:00+01:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const fallbackProgram2026 = [
    {
      day: "Jour 1",
      date: "Mardi 25 Août 2026",
      title: "Accueil & Installation des participants",
      desc: "Enregistrement au LTP de Natitingou, attribution des hébergements et mot d'ouverture par le Bureau Exécutif National (BEN).",
      sessions: ["08:00 - Accueil et Enregistrement", "14:30 - Briefing technique initial", "18:00 - Cocktail de bienvenue"],
    },
    {
      day: "Jour 2",
      date: "Mercredi 26 Août 2026",
      title: "Harmonisation pédagogique & Travaux",
      desc: "Sessions intensives de partage sur les référentiels de construction mécanique et métallique face aux exigences modernes.",
      sessions: ["08:30 - Atelier d'ingénierie didactique", "14:00 - Mutualisation des ressources numériques"],
    },
    {
      day: "Jour 3",
      date: "Jeudi 27 Août 2026",
      title: "Immersion industrielle & Conférence",
      desc: "Visite technique d'entreprises de la région septentrionale et conférence thématique sur la transition technologique au Bénin.",
      sessions: ["09:00 - Visite industrielle terrain", "16:00 - Table ronde Enseignement & Industries"],
    },
    {
      day: "Jour 4",
      date: "Vendredi 28 Août 2026",
      title: "Assemblée Générale Ordinaire",
      desc: "Rapport moral, rapport financier d'activités présenté par la Trésorerie Générale, votes démocratiques de résolutions sur le portail ACIER.",
      sessions: ["08:30 - Présentation des bilans", "14:30 - Délibérations & Vote des amendements"],
    },
    {
      day: "Jour 5",
      date: "Samedi 29 Août 2026",
      title: "Restitution générale & Clôture",
      desc: "Synthèse des travaux de l'Université de Vacances 2026, recommandations officielles, remise d'attestations de formation.",
      sessions: ["09:00 - Lecture du livre blanc", "11:30 - Cérémonie officielle de clôture"],
    },
  ];

  interface GalleryItem {
    id: string;
    title: string;
    tag: string;
    desc: string;
    photo_url?: string;
  }

  const fallbackGallery2025: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Cérémonie Constitutive d'Akassato",
      tag: "Congrès",
      desc: "Adoption solennelle des statuts de l'AEGM-BÉNIN.",
    },
    {
      id: "gal-2",
      title: "Membres Fondateurs réunis",
      tag: "Bureau",
      desc: "Photo officielle du Bureau Exécutif National d'Akassato.",
    },
    {
      id: "gal-3",
      title: "Atelier de Construction Métallique",
      tag: "Pédagogique",
      desc: "Présentation des prototypes d'enseignement en atelier.",
    },
  ];

  const fallbackAllEditions = [
    {
      id: "uv-2026",
      annee: 2026,
      theme: "Innovation didactique & Synergie technologique",
      lieu: "LTP Natitingou",
      date_debut: "2026-08-25",
      date_fin: "2026-08-29",
      description_generale: "Septième édition de l'Université de Vacances à Natitingou, axée sur les technologies modernes et l'innovation didactique.",
      actif: true
    },
    {
      id: "uv-2025",
      annee: 2025,
      theme: "Naissance de l'AEGM-BÉNIN – Congrès Constitutif d'Akassato",
      lieu: "Lycée Technique d'Amitié Sino-Béninoise d'Akassato (LTP/ASBA)",
      date_debut: "2025-08-29",
      date_fin: "2025-09-05",
      description_generale: "Édition Constitutive, couplée à l'Assemblée Générale Constitutive de l'association le 29 Août 2025.",
      actif: true
    },
    {
      id: "uv-2023",
      annee: 2023,
      theme: "Université de Vacances 2023",
      lieu: "Lokossa",
      date_debut: "2023-08-01",
      date_fin: "2023-08-07",
      description_generale: "Cinquième édition de l'Université de Vacances de l'AEGM-BÉNIN à Lokossa.",
      actif: false
    },
    {
      id: "uv-2021",
      annee: 2021,
      theme: "Université de Vacances 2021",
      lieu: "Covè",
      date_debut: "2021-08-01",
      date_fin: "2021-08-07",
      description_generale: "Quatrième édition de l'Université de Vacances de l'AEGM-BÉNIN à Covè.",
      actif: false
    },
    {
      id: "uv-2020",
      annee: 2020,
      theme: "Université de Vacances 2020",
      lieu: "Porto-Novo",
      date_debut: "2020-08-01",
      date_fin: "2020-08-07",
      description_generale: "Troisième édition de l'Université de Vacances de l'AEGM-BÉNIN à Porto-Novo.",
      actif: false
    },
    {
      id: "uv-2019",
      annee: 2019,
      theme: "Université de Vacances 2019",
      lieu: "Ouidah",
      date_debut: "2019-08-01",
      date_fin: "2019-08-07",
      description_generale: "Deuxième édition de l'Université de Vacances de l'AEGM-BÉNIN à Ouidah.",
      actif: false
    },
    {
      id: "uv-2016",
      annee: 2016,
      theme: "Université de Vacances 2016",
      lieu: "Bohicon",
      date_debut: "2016-08-01",
      date_fin: "2016-08-07",
      description_generale: "Première édition de l'Université de Vacances de l'AEGM-BÉNIN à Bohicon.",
      actif: false
    }
  ];

  // Merge database editions with static fallback to ensure we have all years covered
  const mergedEditions = [...fallbackAllEditions];
  editions.forEach(dbEd => {
    const index = mergedEditions.findIndex(fe => fe.annee === dbEd.annee);
    if (index !== -1) {
      mergedEditions[index] = { ...mergedEditions[index], ...dbEd };
    } else {
      mergedEditions.push(dbEd);
    }
  });
  const allEditionsSorted = mergedEditions.sort((a, b) => b.annee - a.annee);

  const edition2026 = editions.find(e => e.annee === 2026);
  const edition2025 = editions.find(e => e.annee === 2025);

  const activeTheme2026 = edition2026?.theme || "Innovation didactique & Synergie technologique";
  const activeLieu2026 = edition2026?.lieu || "LTP Natitingou, Bénin";
  
  const formatDateRange2026 = () => {
    if (edition2026?.date_debut && edition2026?.date_fin) {
      const d1 = new Date(edition2026.date_debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
      const d2 = new Date(edition2026.date_fin).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      return `Du ${d1} au ${d2}`;
    }
    return "Du 25 au 29 Août 2026";
  };

  const activeTheme2025 = edition2025?.theme || "Naissance de l'AEGM-BÉNIN – Congrès Constitutif d'Akassato";
  const activeLieu2025 = edition2025?.lieu || "Lycée Technique d'Amitié Sino-Béninoise d'Akassato";
  const activeDesc2025 = edition2025?.description_generale || "Le Congrès Constitutif du 29 Août 2025 s'est déroulé au Lycée Technique d'Amitié Sino-Béninoise d'Akassato. Cet événement historique a réuni des dizaines d'enseignants de construction mécanique et métallique de tout le Bénin pour voter à l'unanimité les statuts officiels et élire les membres fondateurs de notre Bureau Exécutif National (BEN).";

  let programToRender = fallbackProgram2026;
  if (edition2026?.programme) {
    try {
      const parsed = typeof edition2026.programme === "string" 
        ? JSON.parse(edition2026.programme) 
        : edition2026.programme;
      if (Array.isArray(parsed) && parsed.length > 0) {
        programToRender = parsed;
      }
    } catch (e) {
      console.warn("Could not parse 2026 programme from DB, using fallback:", e);
    }
  }

  let galleryToRender = fallbackGallery2025;
  if (edition2025 && galleryMap[edition2025.id] && galleryMap[edition2025.id].length > 0) {
    galleryToRender = galleryMap[edition2025.id].map((photo, index) => ({
      id: photo.id || `photo-${index}`,
      title: photo.legende || "Photo d'Akassato",
      tag: photo.categorie || "Retrospective",
      desc: photo.legende || "Moments forts d'Akassato 2025.",
      photo_url: photo.photo_url,
    }));
  }


  return (
    <div className="space-y-16 pb-16 animate-fade-in pt-24" id="uv-page-container">
      {/* Immersive Hero Section with dynamic countdown */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue-deep via-acier-900 to-acier-950 text-white rounded-b-[2.5rem] py-16 px-4 shadow-xl border-b border-brand-blue/20">
        {/* Subtle engineering grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f612_1px,transparent_1px),linear-gradient(to_bottom,#3b82f612_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-70" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-brand-blue-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue-accent text-xs font-bold font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-blue-accent" />
            <span>ÉVÉNEMENT PHARE ANNUEL</span>
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            Université de Vacances{" "}
            <span className="bg-gradient-to-r from-brand-blue-accent to-white bg-clip-text text-transparent">
              UV 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-acier-300 max-w-3xl mx-auto leading-relaxed font-light">
            Le rassemblement national d'excellence des enseignants de Génie Mécanique du Bénin. Cinq journées de partages scientifiques, d'harmonisation pédagogique et d'innovation industrielle.
          </p>

          {/* Dynamic Modern Countdown */}
          {!timeLeft.isExpired ? (
            <div className="space-y-4">
              <span className="block text-xs font-mono font-bold text-brand-blue-accent uppercase tracking-widest">
                COMPTE À REBOURS DYNAMIQUE JUSQU'AU COUP D'ENVOI
              </span>
              <div className="flex justify-center items-center gap-3 sm:gap-6 max-w-3xl mx-auto">
                {/* Days */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 w-20 sm:w-28 text-center shadow-lg transition-transform hover:scale-105 duration-300">
                  <span className="block text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-brand-blue-accent uppercase tracking-wider font-mono font-bold mt-1 block">
                    Jours
                  </span>
                </div>
                <span className="text-xl sm:text-3xl font-bold text-brand-blue-accent animate-pulse">:</span>

                {/* Hours */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 w-20 sm:w-28 text-center shadow-lg transition-transform hover:scale-105 duration-300">
                  <span className="block text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-brand-blue-accent uppercase tracking-wider font-mono font-bold mt-1 block">
                    Heures
                  </span>
                </div>
                <span className="text-xl sm:text-3xl font-bold text-brand-blue-accent animate-pulse">:</span>

                {/* Minutes */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 w-20 sm:w-28 text-center shadow-lg transition-transform hover:scale-105 duration-300">
                  <span className="block text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-brand-blue-accent uppercase tracking-wider font-mono font-bold mt-1 block">
                    Minutes
                  </span>
                </div>
                <span className="text-xl sm:text-3xl font-bold text-brand-blue-accent animate-pulse">:</span>

                {/* Seconds */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 w-20 sm:w-28 text-center shadow-lg transition-transform hover:scale-105 duration-300">
                  <span className="block text-2xl sm:text-4xl font-black font-display text-brand-blue text-brand-blue-accent tracking-tight">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white uppercase tracking-wider font-mono font-semibold mt-1 block">
                    Secondes
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-brand-blue/25 border border-brand-blue/30 rounded-2xl max-w-xl mx-auto text-center">
              <span className="text-lg font-bold font-display block text-brand-blue-accent">
                L'édition UV 2026 est actuellement en cours !
              </span>
              <p className="text-xs text-acier-300 mt-2 font-light">
                Rejoignez nos collègues à Natitingou ou connectez-vous au portail pour suivre les séances en direct.
              </p>
            </div>
          )}

          {/* Quick Info Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs sm:text-sm">
            <span className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 font-medium">
              <Calendar className="w-4 h-4 text-brand-blue-accent" />
              <span>{formatDateRange2026()}</span>
            </span>
            <span className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 font-medium">
              <MapPin className="w-4 h-4 text-brand-blue-accent" />
              <span>{activeLieu2026}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tabs selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center border-b border-acier-200">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveEdition("2026")}
              className={`pb-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeEdition === "2026"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-acier-500 hover:text-acier-700"
              }`}
            >
              <span>Édition 2026 (Natitingou)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-brand-blue-light text-brand-blue">
                Futur
              </span>
            </button>
            <button
              onClick={() => setActiveEdition("2025")}
              className={`pb-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeEdition === "2025"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-acier-500 hover:text-acier-700"
              }`}
            >
              <span>Rétrospective 2025 (Akassato)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-acier-100 text-acier-600">
                Congrès
              </span>
            </button>
            <button
              onClick={() => setActiveEdition("history")}
              className={`pb-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeEdition === "history"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-acier-500 hover:text-acier-700"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Historique des Éditions</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-amber-50 text-amber-700 border border-amber-200">
                Parcours
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content view depending on selected tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeEdition === "2026" ? (
            <motion.div
              key="ed-2026"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Edition Presentation & Location Details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-acier-200 shadow-sm space-y-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-blue">
                    DÉTAILS DU SITE D'ACCUEIL
                  </span>
                  <h3 className="text-xl font-bold font-display text-acier-900 leading-tight">
                    {activeLieu2026}
                  </h3>
                  <p className="text-xs sm:text-sm text-acier-600 font-light leading-relaxed">
                    Situé au cœur de la splendide chaîne de l'Atacora, le LTP de Natitingou possède de grands plateaux techniques dédiés à la mécanique industrielle, la construction métallique et la maintenance des systèmes. Un cadre inspirant et parfait pour l'Université de Vacances.
                  </p>

                  <div className="p-4 bg-brand-blue-light/50 border border-brand-blue/15 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-brand-blue font-display block">Informations Pratiques</span>
                    <ul className="space-y-2 text-xs text-acier-700 font-light">
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                        <span>Hébergement : Internat du LTP & Hôtels conventionnés</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                        <span>Restauration : Prise en charge sur place pour les inscrits</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                        <span>Accès : Transport collectif proposé au départ de Cotonou/Parakou</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Call to register */}
                <div className="bg-gradient-to-r from-brand-blue to-brand-blue-deep p-8 rounded-2xl text-white shadow-md relative overflow-hidden border border-brand-blue/25">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                  <h4 className="text-lg font-bold font-display mb-2">Comment s'enregistrer ?</h4>
                  <p className="text-xs text-brand-blue-soft leading-relaxed font-light mb-6">
                    L'inscription se fait entièrement en ligne via la plateforme ACIER Connect. Vos identifiants de membre vous permettent d'activer votre participation, réserver l'hébergement et soumettre vos thématiques d'ateliers.
                  </p>
                  <a
                    href="https://acier-connect.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold bg-white text-brand-blue hover:bg-brand-blue-soft transition-all w-full justify-center shadow-md"
                  >
                    <span>S'enregistrer sur le Portail ACIER</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Program Schedule */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-lg font-bold font-display text-acier-900">
                    Programme prévisionnel de l'édition 2026
                  </h3>
                </div>

                <div className="space-y-6">
                  {programToRender.map((prog, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-acier-200 p-6 shadow-sm hover:border-brand-blue/20 transition-all flex flex-col md:flex-row gap-4"
                    >
                      {/* Day Pill */}
                      <div className="md:w-32 flex-shrink-0">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-brand-blue text-white text-[10px] font-bold font-mono tracking-wider uppercase mb-1 block w-fit">
                          {prog.day}
                        </span>
                        <span className="text-xs text-acier-500 font-medium font-mono">{prog.date}</span>
                      </div>

                      {/* Content details */}
                      <div className="space-y-3 flex-grow">
                        <h4 className="text-base font-bold text-acier-900 font-display">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-acier-600 font-light leading-relaxed">
                          {prog.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {prog.sessions.map((sess, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-acier-50 border border-acier-100 text-[10px] text-acier-700 font-mono"
                            >
                              <Clock className="w-3 h-3 text-brand-blue" />
                              <span>{sess}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : activeEdition === "2025" ? (
            <motion.div
              key="ed-2025"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12 animate-fade-in"
            >
              {/* Highlight summary for UV 2025 */}
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-acier-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded bg-brand-blue-light text-[9px] font-bold font-mono tracking-wider text-brand-blue uppercase">
                    CONGRÈS CONSTITUTIF HISTORIQUE
                  </span>
                  <h3 className="text-2xl font-bold font-display text-acier-900 leading-tight">
                    {activeTheme2025}
                  </h3>
                  <p className="text-xs sm:text-sm text-acier-600 leading-relaxed font-light">
                    {activeDesc2025}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-mono font-medium text-acier-500 pt-2">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-brand-blue" />
                      <span>+80 participants</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-brand-blue" />
                      <span>Statuts adoptés à l'unanimité</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-acier-50 p-6 rounded-xl border border-acier-100 flex flex-col justify-center items-center text-center space-y-4">
                  <span className="text-3xl font-black font-display text-brand-blue">2025</span>
                  <span className="text-[10px] text-acier-500 font-bold uppercase tracking-wider font-mono">
                    29 Août à Akassato
                  </span>
                  <div className="h-1 w-12 bg-brand-blue/30 rounded" />
                  <p className="text-xs text-acier-600 leading-relaxed font-light">
                    Lancement officiel des cotisations syndicales et de l'entraide pédagogique professionnelle.
                  </p>
                </div>
              </div>

              {/* Photo Retrospective Gallery Placeholder */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-lg font-bold font-display text-acier-900">
                    Galerie photo & moments forts d'Akassato
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {galleryToRender.map((gal) => (
                    <div
                      key={gal.id}
                      className="bg-white rounded-xl border border-acier-200 overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300"
                    >
                      {/* Beautiful photos or conceptual vector graphics since we don't have real photos */}
                      <div className="h-44 bg-gradient-to-br from-brand-blue-soft to-acier-100 flex items-center justify-center border-b border-acier-100 relative overflow-hidden">
                        {gal.photo_url ? (
                          <img
                            src={gal.photo_url}
                            alt={gal.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                            <svg
                              className="w-10 h-10 text-brand-blue opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="3" />
                              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                            </svg>
                          </>
                        )}
                        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-white text-acier-800 text-[9px] font-bold font-mono uppercase shadow-sm">
                          {gal.tag}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="text-sm font-bold text-acier-900 font-display">
                          {gal.title}
                        </h4>
                        <p className="text-xs text-acier-500 font-light leading-relaxed">
                          {gal.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ed-history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12 animate-fade-in"
            >
              {/* Highlight summary for UV History */}
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-acier-200 shadow-sm space-y-4">
                <span className="inline-block px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[9px] font-bold font-mono tracking-wider text-amber-700 uppercase">
                  RÉTROSPECTIVE ET PARCOURS HISTORIQUE
                </span>
                <h3 className="text-2xl font-bold font-display text-acier-900 leading-tight">
                  La Grande Histoire de l'Université de Vacances (UV)
                </h3>
                <p className="text-xs sm:text-sm text-acier-600 leading-relaxed font-light">
                  Depuis sa première édition en 2016 à Bohicon, l'Université de Vacances de l'AEGM-BÉNIN s'est imposée comme le rendez-vous incontournable pour la mutualisation pédagogique, la formation continue des enseignants et l'échange constructif autour de la filière de construction mécanique et métallique. Découvrez les thèmes et les villes qui ont façonné notre communauté au fil des ans.
                </p>
              </div>

              {/* Vertical Left-Aligned Timeline of All Editions */}
              <div className="relative border-l-2 border-brand-blue/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
                {allEditionsSorted.map((ed, idx) => {
                  const isFuture = ed.annee === 2026;
                  const isConstitutive = ed.annee === 2025;
                  
                  return (
                    <div key={ed.id || idx} className="relative group">
                      {/* Timeline Dot Indicator */}
                      <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isFuture 
                          ? "bg-brand-blue border-brand-blue shadow-lg shadow-brand-blue/30 scale-110" 
                          : isConstitutive
                          ? "bg-amber-500 border-amber-500 shadow-lg shadow-amber-500/30 scale-110"
                          : "bg-white border-acier-300 group-hover:border-brand-blue/60 group-hover:bg-brand-blue-light/30"
                      }`}>
                        {isFuture ? (
                          <Sparkles className="w-3 h-3 text-white" />
                        ) : isConstitutive ? (
                          <BookOpen className="w-3 h-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-acier-400 group-hover:bg-brand-blue" />
                        )}
                      </div>

                      {/* Timeline Card */}
                      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-acier-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-brand-blue/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-acier-100 mb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-xl font-black font-display tracking-tight ${
                                isFuture ? "text-brand-blue" : isConstitutive ? "text-amber-500" : "text-acier-800"
                              }`}>
                                {ed.annee}
                              </span>
                              <span className="text-xs text-acier-400 font-mono">|</span>
                              <span className="flex items-center text-xs text-acier-500 font-medium font-mono">
                                <MapPin className="w-3.5 h-3.5 text-brand-blue-accent mr-1 shrink-0" />
                                {ed.lieu}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold font-display text-acier-900">
                              {ed.theme}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            {ed.actif && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Active
                              </span>
                            )}
                            {isFuture && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase bg-brand-blue-light text-brand-blue border border-brand-blue/10">
                                Prochaine Édition
                              </span>
                            )}
                            {isConstitutive && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase bg-amber-50 text-amber-700 border border-amber-200">
                                Constitutive
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-acier-600 font-light leading-relaxed mb-4">
                          {ed.description_generale}
                        </p>

                        {(isFuture || isConstitutive) && (
                          <div className="flex justify-end">
                            <button
                              onClick={() => setActiveEdition(isFuture ? "2026" : "2025")}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-blue hover:text-brand-blue-deep hover:bg-brand-blue-light/50 transition-all cursor-pointer"
                            >
                              <span>Voir les détails de l'édition</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Testimonial/Quote Footer section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-acier-200 p-8 text-center space-y-4">
          <MessageSquare className="w-6 h-6 text-brand-blue mx-auto" />
          <p className="italic text-xs sm:text-sm text-acier-800 font-medium">
            « L'Université de Vacances est le ciment de notre corporation. C'est là que l'ACIER se forge, à travers les idées, la rigueur pédagogique et la volonté d'élever le niveau technologique de la jeunesse béninoise. »
          </p>
          <span className="block text-[10px] font-bold font-mono tracking-widest text-brand-blue uppercase">
            — PAROLE DU PRÉSIDENT BEN
          </span>
        </div>
      </section>
    </div>
  );
}
