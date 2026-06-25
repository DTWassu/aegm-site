import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ShieldCheck, Cpu, Users, GraduationCap, Award, Calendar, CreditCard, Coins, Eye, Activity, Sparkles, Bell } from "lucide-react";
import heroImage from "../assets/images/hero_mechanical_engineering_1782279794222.jpg";
import { supabase } from "../lib/supabase";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const DEFAULT_NOTIFICATIONS = [
  {
    id: "default-1",
    type: "uv_2026",
    title: "Cap sur Natitingou 2026",
    message: "L'édition 2026 des Universités de Vacances se tiendra à Natitingou du 25 au 29 août 2026."
  },
  {
    id: "default-2",
    type: "frais_participation",
    title: "Inscription UV 2026",
    message: "Pensez à régulariser vos frais de participation (20 000 FCFA) pour valider votre inscription. Date limite : 31 juillet 2026."
  },
  {
    id: "default-3",
    type: "cotisation_annuelle",
    title: "Cotisations Annuelles 2025-2026",
    message: "Les cotisations annuelles obligatoires pour l'exercice 2025-2026 s'élèvent à 12 000 FCFA (soit 1 000 FCFA par mois)."
  }
];

const DEFAULT_STATS = {
  totalViews: 284,
  uniqueVisitors: 73,
  pageBreakdown: {
    "/home": 118,
    "/about": 46,
    "/uv": 51,
    "/leadership": 34,
    "/statutes": 23,
    "/contact": 12
  },
  isLive: false
};

export default function Home({ onNavigate }: HomeProps) {
  const [stats, setStats] = useState({
    total_membres_actifs: 142,
    total_cellules_de_base: 18,
    total_regions_representees: 6,
  });

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const [visitStats, setVisitStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    pageBreakdown: {} as Record<string, number>,
    isLive: false,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from("site_stats")
          .select("total_membres_actifs, total_cellules_de_base, total_regions_representees")
          .order("date_derniere_mise_a_jour", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          setStats({
            total_membres_actifs: data[0].total_membres_actifs ?? 142,
            total_cellules_de_base: data[0].total_cellules_de_base ?? 18,
            total_regions_representees: data[0].total_regions_representees ?? 6,
          });
        }
      } catch (err) {
        console.warn("Could not retrieve home stats from Supabase (using default fallback values):", err);
      }
    }

    async function fetchNotifications() {
      try {
        setLoadingNotifications(true);
        const { data, error } = await supabase
          .from("annonces_publiques")
          .select("id, type, title, message, priorite, created_at")
          .eq("actif", true)
          .order("priorite", { ascending: false })
          .order("created_at", { ascending: false });

        if (data && data.length > 0 && !error) {
          setNotifications(data);
        } else {
          setNotifications(DEFAULT_NOTIFICATIONS);
        }
      } catch (err) {
        console.warn("Could not retrieve public announcements from Supabase, using defaults:", err);
        setNotifications(DEFAULT_NOTIFICATIONS);
      } finally {
        setLoadingNotifications(false);
      }
    }

    async function fetchVisits() {
      try {
        setLoadingStats(true);
        const { data, error } = await supabase
          .from("visites")
          .select("id, session_id, page_path");

        if (data && data.length > 0 && !error) {
          const totalViews = data.length;
          const uniqueVisitors = new Set(data.map((v: any) => v.session_id)).size;
          
          const pageBreakdown: Record<string, number> = {};
          data.forEach((v: any) => {
            const path = v.page_path || "/home";
            pageBreakdown[path] = (pageBreakdown[path] || 0) + 1;
          });

          setVisitStats({
            totalViews,
            uniqueVisitors,
            pageBreakdown,
            isLive: true
          });
        } else {
          setVisitStats(DEFAULT_STATS);
        }
      } catch (err) {
        console.warn("Could not retrieve visit stats, using simulated default:", err);
        setVisitStats(DEFAULT_STATS);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchStats();
    fetchNotifications();
    fetchVisits();
  }, []);

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      {/* Light & Modern Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-brand-blue-soft via-white to-acier-50">
        {/* Background blueprint details */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Génie Mécanique"
            className="w-full h-full object-cover object-center opacity-10 filter brightness-110 saturate-50 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-acier-50 via-transparent to-brand-blue-soft/30" />
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Slogan pill in royal blue */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-brand-blue-light border border-brand-blue/25 text-brand-blue text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-blue animate-pulse" />
            <span>« Solides comme l'ACIER, unis pour la mécanique »</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-acier-900 max-w-5xl mx-auto leading-[1.12]">
            Association des Enseignants de{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-blue-accent bg-clip-text text-transparent">
              Génie Mécanique
            </span>{" "}
            du Bénin
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-acier-600 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Découvrez le portail de l'AEGM-BÉNIN. Un cadre officiel fédérant les enseignants de la construction mécanique et métallique pour le perfectionnement, la solidarité et le développement technologique.
          </p>

          {/* Action buttons with the exact blue from ACIER portal */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <a
              href="https://acier-connect.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-lg shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-brand-blue-dark/10 group"
              id="hero-portal-btn"
            >
              <span>Accéder au Portail ACIER</span>
              <ExternalLink className="w-5 h-5 text-brand-blue-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <button
              onClick={() => onNavigate("about")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-bold text-acier-700 bg-white hover:bg-acier-50 border border-acier-200 hover:border-acier-300 transition-all duration-200 cursor-pointer"
            >
              <span>En savoir plus</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Anchor statistics overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-acier-200/60 text-left">
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold font-display text-brand-blue">2025</span>
              <span className="text-xs text-acier-500 font-medium uppercase tracking-wider">Création officielle</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold font-display text-brand-blue">+{stats.total_membres_actifs}</span>
              <span className="text-xs text-acier-500 font-medium uppercase tracking-wider">Membres actifs</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold font-display text-brand-blue">{stats.total_cellules_de_base}</span>
              <span className="text-xs text-acier-500 font-medium uppercase tracking-wider">Cellules de base</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold font-display text-brand-blue">{stats.total_regions_representees}</span>
              <span className="text-xs text-acier-500 font-medium uppercase tracking-wider">Régions représentées</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Reminders & Announcements Panel (Centre d'Annonces & Rappels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-acier-200/80 p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
          {/* Subtle design grid watermark */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-blue-soft/5 rounded-full blur-3xl pointer-events-none" />

          {/* Panel Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-acier-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-brand-blue-light text-brand-blue rounded-xl animate-pulse">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-acier-900 tracking-tight">
                  Centre d'Annonces & Rappels Officiels
                </h2>
                <p className="text-xs text-acier-500 font-light mt-0.5">
                  Retrouvez les notifications prioritaires pour l'activité associative et le paiement des cotisations.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                Mis à jour en temps réel
              </span>
            </div>
          </div>

          {/* Grid of 3 Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notifications.map((notif) => {
              const isUV = notif.type === "uv_2026";
              const isFrais = notif.type === "frais_participation";
              const isCotisation = notif.type === "cotisation_annuelle";

              let themeColor = "border-brand-blue-soft bg-blue-50/10 hover:bg-blue-50/30";
              let badgeColor = "bg-brand-blue-light text-brand-blue border-brand-blue/15";
              let badgeText = "Événement";
              let iconBg = "bg-brand-blue-light text-brand-blue";
              let icon = <Calendar className="w-5 h-5" />;
              let title = notif.title || "Annonce AEGM-BÉNIN";

              if (isUV) {
                themeColor = "border-brand-blue/30 bg-gradient-to-b from-blue-50/15 to-white hover:border-brand-blue/50";
                badgeColor = "bg-brand-blue text-white";
                badgeText = "Édition 2026";
                iconBg = "bg-brand-blue text-white";
                icon = <Sparkles className="w-5 h-5" />;
                title = notif.title || "Université de Vacances 2026";
              } else if (isFrais) {
                themeColor = "border-amber-200 bg-gradient-to-b from-amber-50/10 to-white hover:border-amber-300";
                badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
                badgeText = "Inscription Ouverte";
                iconBg = "bg-amber-500 text-white shadow-md shadow-amber-500/20";
                icon = <CreditCard className="w-5 h-5" />;
                title = notif.title || "Frais de Participation UV 2026";
              } else if (isCotisation) {
                themeColor = "border-emerald-200 bg-gradient-to-b from-emerald-50/10 to-white hover:border-emerald-300";
                badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                badgeText = "Cotisation Régulière";
                iconBg = "bg-emerald-500 text-white shadow-md shadow-emerald-500/20";
                icon = <Coins className="w-5 h-5" />;
                title = notif.title || "Dues Annuels 2025-2026";
              }

              return (
                <div
                  key={notif.id}
                  className={`flex flex-col justify-between p-6 rounded-2xl border ${themeColor} transition-all duration-300 group hover:-translate-y-1 hover:shadow-md`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${iconBg}`}>
                        {icon}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {badgeText}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-acier-900 font-display">
                        {title}
                      </h3>
                      <p className="text-xs text-acier-600 font-light leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  {isCotisation && (
                    <div className="mt-6 pt-4 border-t border-acier-100 flex items-center justify-between text-xs text-acier-500">
                      <span className="font-semibold text-emerald-600">12 000 FCFA / an</span>
                      <span className="font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded text-emerald-700">Soit 1 000F / mois</span>
                    </div>
                  )}

                  {isFrais && (
                    <div className="mt-6 pt-4 border-t border-acier-100 flex items-center justify-between text-xs text-acier-500">
                      <span className="font-semibold text-amber-700">Règlement Requis</span>
                      <button
                        onClick={() => onNavigate("contact")}
                        className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                      >
                        Contacter Trésorier
                      </button>
                    </div>
                  )}

                  {isUV && (
                    <div className="mt-6 pt-4 border-t border-acier-100 flex items-center justify-between text-xs text-acier-500">
                      <span className="font-medium text-brand-blue">Message Subliminal</span>
                      <button
                        onClick={() => onNavigate("uv")}
                        className="inline-flex items-center space-x-1 text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                      >
                        <span>Détails de l'édition</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Highlight with ACIER Portal (Visual Harmonization) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-blue to-brand-blue-deep text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-blue/20 relative overflow-hidden">
          {/* Subtle grid elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-white/10 text-white text-xs font-mono uppercase tracking-widest font-semibold">
                SYNERGIE NUMÉRIQUE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
                Plateforme Officielle « ACIER Connect » & « ACIER Académie »
              </h2>
              <p className="text-sm sm:text-base text-brand-blue-soft font-light leading-relaxed max-w-3xl">
                L'AEGM-BÉNIN est fière de son application web intégrée, conçue pour la gestion associative et pédagogique de nos membres. Connectez-vous à votre espace personnel pour payer vos cotisations, voter de manière démocratique et accéder à nos programmes de formation continue.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="inline-flex items-center space-x-1 text-xs text-brand-blue-soft bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Actes à valeur légale (Art. 13)</span>
                </span>
                <span className="inline-flex items-center space-x-1 text-xs text-brand-blue-soft bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Espace de formation</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white/5 p-6 rounded-2xl border border-white/10 text-center space-y-6">
              {/* Displaying blue icon lock preview similar to the login capture */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                  <svg
                    className="w-8 h-8 text-white animate-[spin_16s_linear_infinite]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                </div>
                <span className="mt-3 block font-bold font-display text-lg tracking-wide uppercase">ACIER</span>
                <span className="text-[10px] text-brand-blue-soft uppercase font-mono tracking-wider">Espace d'Adhésion & de Connexion</span>
              </div>

              <a
                href="https://acier-connect.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-brand-blue bg-white hover:bg-brand-blue-soft shadow-lg transition-all duration-200"
              >
                <span>Se connecter au Portail</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold font-mono tracking-widest text-brand-blue uppercase mb-2">
            NOS ENGAGEMENTS
          </h2>
          <p className="text-2xl sm:text-3xl font-bold font-display text-acier-900">
            Pourquoi rejoindre l'AEGM-BÉNIN ?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-acier-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl w-fit mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-acier-900 mb-3 font-display">Pédagogie d'Excellence</h3>
            <p className="text-sm text-acier-600 leading-relaxed font-light">
              Harmonisation des programmes de construction mécanique et métallique, et partage de ressources didactiques innovantes de niveau international.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-acier-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl w-fit mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-acier-900 mb-3 font-display">Solidarité Professionnelle</h3>
            <p className="text-sm text-acier-600 leading-relaxed font-light">
              Mise en œuvre d'assistance mutuelle, d'universités de vacances, et de bourses de collaboration pédagogique et technique pour nos membres.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-acier-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl w-fit mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-acier-900 mb-3 font-display">Valorisation Industrielle</h3>
            <p className="text-sm text-acier-600 leading-relaxed font-light">
              Rapprochement étroit entre le milieu éducatif et l'industrie mécanique béninoise, stages professionnels et visites d'entreprises.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-acier-50/50 rounded-3xl border border-acier-200/60 p-8 sm:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-brand-blue-light text-brand-blue text-[10px] font-bold font-mono tracking-wider uppercase">
                Réseau & Synergie Institutionnelle
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-acier-900 leading-tight">
                Les Partenaires Officiels
              </h2>
              <p className="text-sm text-acier-600 font-light max-w-2xl">
                L'AEGM-BÉNIN collabore activement avec les instances étatiques et techniques de référence pour garantir l'excellence et l'intégration de la filière de construction mécanique.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            <div className="bg-white p-6 rounded-2xl border border-acier-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="px-4 h-11 min-w-[80px] rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-deep flex items-center justify-center text-white font-extrabold text-xs tracking-wider shadow-md shrink-0">
                  MESTFP
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-brand-blue-light text-brand-blue border border-brand-blue/10">
                  Secteur Public
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-acier-900 font-display">MESTFP Bénin</h3>
                <p className="text-[11px] text-brand-blue font-semibold font-mono tracking-wide mt-0.5">
                  Tutelle Institutionnelle
                </p>
              </div>
              <p className="text-xs text-acier-600 font-light leading-relaxed">
                Ministère de l'Enseignement Secondaire, Technique et de la Formation Professionnelle du Bénin, assurant la validation pédagogique, la conformité de nos actions de mutualisation et le soutien officiel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-acier-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="px-4 h-11 min-w-[80px] rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-xs tracking-wider shadow-md shrink-0">
                  ADET
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-100">
                  Agence Nationale
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-acier-900 font-display">ADET Bénin</h3>
                <p className="text-[11px] text-amber-700 font-semibold font-mono tracking-wide mt-0.5">
                  Développement de l'Enseignement Technique
                </p>
              </div>
              <p className="text-xs text-acier-600 font-light leading-relaxed">
                Agence de Développement de l'Enseignement Technique, acteur stratégique dédié à la mise en œuvre de la stratégie nationale de l'enseignement technique au Bénin pour une formation professionnelle d'excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Visitor Statistics Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-acier-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-acier-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-brand-blue-light text-brand-blue rounded-xl">
                <Activity className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-acier-900 tracking-tight">
                  Observatoire de Fréquentation du Site
                </h2>
                <p className="text-xs text-acier-500 font-light mt-0.5">
                  Statistiques de visites et d'audience des différentes sections du portail officiel de l'AEGM-BÉNIN.
                </p>
              </div>
            </div>

            {/* Live Indicator / Simulation Badge */}
            <div className="flex items-center shrink-0">
              {visitStats.isLive ? (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>🟢 PRODUCTION LIVE</span>
                </span>
              ) : (
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>🟡 MODE SIMULATION</span>
                  </span>
                  <span className="text-[9px] text-acier-400 mt-1 font-mono">
                    (BD en attente de privilège INSERT)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* KPI 1: Pages Vues */}
            <div className="bg-gradient-to-br from-acier-50 to-white p-6 rounded-2xl border border-acier-100 flex items-center space-x-4">
              <div className="p-3 bg-blue-100/60 text-brand-blue rounded-xl">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-3xl font-extrabold font-display text-acier-900">
                  {loadingStats ? "..." : visitStats.totalViews}
                </span>
                <span className="text-xs text-acier-500 font-medium font-sans uppercase tracking-wider">
                  Pages Vues Totales
                </span>
              </div>
            </div>

            {/* KPI 2: Visiteurs Uniques */}
            <div className="bg-gradient-to-br from-acier-50 to-white p-6 rounded-2xl border border-acier-100 flex items-center space-x-4">
              <div className="p-3 bg-emerald-100/60 text-emerald-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-3xl font-extrabold font-display text-acier-900">
                  {loadingStats ? "..." : visitStats.uniqueVisitors}
                </span>
                <span className="text-xs text-acier-500 font-medium font-sans uppercase tracking-wider">
                  Visiteurs Uniques
                </span>
              </div>
            </div>

            {/* KPI 3: Taux de consultation */}
            <div className="bg-gradient-to-br from-acier-50 to-white p-6 rounded-2xl border border-acier-100 flex items-center space-x-4 sm:col-span-2 md:col-span-1">
              <div className="p-3 bg-purple-100/60 text-purple-600 rounded-xl">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-3xl font-extrabold font-display text-acier-900">
                  {loadingStats ? "..." : (visitStats.totalViews > 0 ? (visitStats.totalViews / Math.max(1, visitStats.uniqueVisitors)).toFixed(1) : "0.0")}
                </span>
                <span className="text-xs text-acier-500 font-medium font-sans uppercase tracking-wider">
                  Pages Consultées / Visite
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Traffic Distribution */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-acier-700 uppercase tracking-wide font-display">
              Répartition du Trafic par Page
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-acier-50/50 p-6 rounded-2xl border border-acier-100">
              {[
                { path: "/home", label: "Page d'Accueil" },
                { path: "/about", label: "À Propos & Histoire" },
                { path: "/uv", label: "Université de Vacances (UV)" },
                { path: "/leadership", label: "Bureau National & Fondateurs" },
                { path: "/statutes", label: "Statuts & Règlements" },
                { path: "/contact", label: "Contact & Support" }
              ].map((pageInfo) => {
                const count = visitStats.pageBreakdown[pageInfo.path] || 0;
                const percentage = visitStats.totalViews > 0 
                  ? Math.round((count / visitStats.totalViews) * 100) 
                  : 0;

                return (
                  <div key={pageInfo.path} className="space-y-1.5 py-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-acier-800 font-sans">{pageInfo.label}</span>
                      <span className="text-acier-500 font-mono">
                        {count} {count > 1 ? "vues" : "vue"} ({percentage}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-acier-200/60 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-blue h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.max(3, percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </section>

      {/* Mini-CTA for Statutes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-acier-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-display text-acier-900">
              Consulter nos Statuts de l'Association
            </h3>
            <p className="text-sm text-acier-600 font-light max-w-2xl">
              Les statuts juridiques adoptés le 29 Août 2025 à Akassato sont consultables et entièrement interrogeables en ligne grâce à notre explorateur de texte.
            </p>
          </div>
          <button
            onClick={() => onNavigate("statutes")}
            className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-acier-800 hover:bg-acier-900 transition-colors cursor-pointer"
          >
            <span>Lire les Statuts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
