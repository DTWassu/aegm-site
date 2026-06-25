import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ShieldCheck, Cpu, Users, GraduationCap, Award } from "lucide-react";
import heroImage from "../assets/images/hero_mechanical_engineering_1782279794222.jpg";
import { supabase } from "../lib/supabase";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [stats, setStats] = useState({
    total_membres_actifs: 142,
    total_cellules_de_base: 18,
    total_regions_representees: 6,
  });

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
    fetchStats();
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
            className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-acier-800 hover:bg-acier-900 transition-colors"
          >
            <span>Lire les Statuts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
