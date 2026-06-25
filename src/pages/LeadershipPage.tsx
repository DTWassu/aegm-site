// 📁 /home/project/src/pages/LeadershipPage.tsx
// Version dynamique - Connectée à Supabase
// AJOUT : Onglet "Membres Fondateurs" avec barre de recherche
// BADGE : Statut Honorifique

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  Award, 
  History, 
  ArrowLeftRight, 
  UserPlus, 
  UserMinus, 
  Search, 
  HelpCircle,
  Inbox,
  Users,
  Star,
  Crown
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface BureauMember {
  name: string;
  role: string;
  initials: string;
  primaryColor: string;
  bio: string;
  isCore: boolean;
  email: string;
  telephone: string;
}

interface HistoricalMandate {
  period: string;
  title: string;
  description: string;
  members: { name: string; role: string; initials: string; isLeader?: boolean }[];
}

interface MemberMovement {
  date: string;
  name: string;
  type: "in" | "out";
  role: string;
  details: string;
  badge: string;
}

interface MembreFondateur {
  id: string;
  nom: string;
  prenom: string;
  fonction: string;
  bio: string;
  photo_url: string;
  ordre_affichage: number;
  statut_honorifique: boolean;
  est_actif: boolean;
  initials: string;
  primaryColor: string;
  categorie?: string;
}

// ✅ STATIC FALLBACK - Bureau actuel (utilisé si la table est vide)
const STATIC_MEMBERS: BureauMember[] = [
  {
    name: "M. HLASSAME Comondji",
    role: "PRÉSIDENT",
    initials: "HC",
    primaryColor: "from-brand-blue to-brand-blue-deep",
    bio: "Président du BEN. Assure la représentation légale de l'association, la coordination générale et la validation des relations institutionnelles avec les ministères et l'État.",
    isCore: true,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. SIDIBE M Habib",
    role: "VICE PRÉSIDENT",
    initials: "SH",
    primaryColor: "from-brand-blue-accent to-brand-blue-dark",
    bio: "Vice-Président du BEN. Assiste étroitement le président dans toutes ses prérogatives et assure sa suppléance légale en cas de vacance de poste.",
    isCore: true,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. HOUSSOU Wilfride",
    role: "SECRÉTAIRE GÉNÉRAL",
    initials: "HW",
    primaryColor: "from-acier-700 to-acier-900",
    bio: "Gestion administrative de l'association, rédaction des rapports et procès-verbaux de réunions, convocations officielles et tenue rigoureuse des archives.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. HEDJE Yélian M. Romulus",
    role: "SECRÉTAIRE GÉNÉRAL ADJOINT",
    initials: "HR",
    primaryColor: "from-acier-500 to-acier-700",
    bio: "Assiste le Secrétaire Général dans l'accomplissement des devoirs d'administration courante et assure sa suppléance en cas d'absence.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. HOSSOU M. Augustin",
    role: "SECRÉTAIRE À LA COMMUNICATION",
    initials: "HA",
    primaryColor: "from-brand-blue via-acier-700 to-acier-900",
    bio: "Chargé des relations presse, de la gestion des informations publiques, de la supervision du site web officiel et des communiqués de l'association.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. YOKPO Joël",
    role: "ORGANISATEUR GÉNÉRAL",
    initials: "YJ",
    primaryColor: "from-brand-blue-dark to-acier-800",
    bio: "Mobilisation des cellules locales, planification matérielle et logistique des grands événements, séminaires et de l'Université de Vacances annuelle.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "M. GBENOU Auguste",
    role: "ORGANISATEUR GÉNÉRAL ADJOINT",
    initials: "GA",
    primaryColor: "from-acier-600 to-acier-800",
    bio: "Assiste l'Organisateur Général dans la planification logistique des manifestations culturelles, techniques et d'enseignement.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "Mme. AMOUSSOU Elvire",
    role: "TRÉSORIÈRE GÉNÉRALE",
    initials: "AE",
    primaryColor: "from-emerald-600 to-brand-blue-deep",
    bio: "Responsable de la comptabilité générale, du suivi des flux budgétaires, du recouvrement des cotisations annuelles et de la co-signature des chèques.",
    isCore: true,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
  {
    name: "Mme. AHOUANDJINOU S. Judith",
    role: "TRÉSORIÈRE GÉNÉRALE ADJOINTE",
    initials: "AJ",
    primaryColor: "from-emerald-500 to-brand-blue-dark",
    bio: "Assiste la Trésorière Générale dans la tenue rigoureuse de la comptabilité, le suivi des cotisations de cellules de base et l'organisation budgétaire.",
    isCore: false,
    email: "aegmb2025@yahoo.com",
    telephone: "+2290197884134",
  },
];

// ✅ CODES DE CATÉGORIES & CONFIGURATION POUR LES MEMBRES D'HONNEUR & FONDATEURS
const FOUNDER_CATEGORIES = [
  {
    code: "bureau_agc",
    title: "Bureau Constitutif de l'AGC",
    badge: "Certification Présidentielle",
    color: "gold",
    icon: Crown,
    description: "Membres de l'Assemblée Générale Constitutive originale ayant dirigé et certifié l'acte fondateur de l'AEGM-BÉNIN.",
  },
  {
    code: "membre_signataire",
    title: "Membres Signataires",
    badge: "Membre Signataire",
    color: "blue",
    icon: Award,
    description: "Membres d'exception présents lors de l'édition fondatrice, apportant leur caution morale et intellectuelle.",
  },
  {
    code: "fondateur_simple",
    title: "Membres Fondateurs Communs",
    badge: "Membre Pionnier",
    color: "green",
    icon: Users,
    description: "Pionniers engagés ayant soutenu et accompagné activement le déploiement initial de l'association.",
  },
  {
    code: "membre_honneur",
    title: "Membres d'Honneur",
    badge: "Distinction Honorifique",
    color: "purple",
    icon: Star,
    description: "Éminentes personnalités distinguées pour leur contribution exceptionnelle, leur soutien et leur dévouement envers l'association.",
  },
];

// ✅ STATIC FALLBACK - Membres d'Honneur & Fondateurs (utilisé si la table est vide)
const STATIC_FONDATEURS: MembreFondateur[] = [
  {
    id: "f1",
    nom: "NASSARA",
    prenom: "Augustin",
    fonction: "Président de l'Assemblée Générale Constitutive",
    bio: "Président de l'Assemblée Générale Constitutive de l'AEGM-BÉNIN, signataire de l'acte fondateur.",
    photo_url: "",
    ordre_affichage: 1,
    statut_honorifique: true,
    est_actif: true,
    initials: "AN",
    primaryColor: "from-amber-500 to-amber-700",
    categorie: "bureau_agc",
  },
  {
    id: "f2",
    nom: "ATINKPAHOUN",
    prenom: "Rufin",
    fonction: "Secrétaire de Séance",
    bio: "Secrétaire de Séance de l'Assemblée Générale Constitutive, signataire de l'acte fondateur.",
    photo_url: "",
    ordre_affichage: 2,
    statut_honorifique: true,
    est_actif: true,
    initials: "AR",
    primaryColor: "from-amber-400 to-amber-600",
    categorie: "bureau_agc",
  },
  {
    id: "f3",
    nom: "COSSI",
    prenom: "Albert",
    fonction: "Professeur Émérite & Conseiller Académique",
    bio: "Présent lors de l'édition fondatrice pour apporter sa caution académique et guider l'élaboration de la charte d'éthique.",
    photo_url: "",
    ordre_affichage: 3,
    statut_honorifique: true,
    est_actif: true,
    initials: "AC",
    primaryColor: "from-blue-600 to-blue-800",
    categorie: "membre_signataire",
  },
  {
    id: "f4",
    nom: "ADELE",
    prenom: "Sandrine",
    fonction: "Enseignante-Chercheuse & Marraine d'origine",
    bio: "Docteure en sciences de l'éducation, signataire de l'acte de fondation et marraine de l'Université de Vacances d'origine.",
    photo_url: "",
    ordre_affichage: 4,
    statut_honorifique: true,
    est_actif: true,
    initials: "SA",
    primaryColor: "from-blue-500 to-blue-700",
    categorie: "membre_signataire",
  },
  {
    id: "f5",
    nom: "SOSSOU",
    prenom: "Jérôme",
    fonction: "Co-rédacteur des statuts & Pionnier",
    bio: "Co-rédacteur inspiré des textes fondamentaux et mobilisateur historique du réseau des diplômés.",
    photo_url: "",
    ordre_affichage: 5,
    statut_honorifique: true,
    est_actif: true,
    initials: "JS",
    primaryColor: "from-emerald-600 to-emerald-800",
    categorie: "fondateur_simple",
  },
  {
    id: "f6",
    nom: "AGUEH",
    prenom: "Chantal",
    fonction: "Coordonnatrice Logistique d'origine",
    bio: "Pionnière de l'AEGM-BÉNIN ayant coordonné la logistique opérationnelle lors des toutes premières assises.",
    photo_url: "",
    ordre_affichage: 6,
    statut_honorifique: true,
    est_actif: true,
    initials: "CA",
    primaryColor: "from-emerald-500 to-emerald-700",
    categorie: "fondateur_simple",
  },
  {
    id: "f7",
    nom: "GNONLONFOUN",
    prenom: "Honoré",
    fonction: "Président d'Honneur",
    bio: "Éminent universitaire distingué pour son parrainage continu et son soutien inestimable à l'intégration des jeunes diplômés.",
    photo_url: "",
    ordre_affichage: 7,
    statut_honorifique: true,
    est_actif: true,
    initials: "HG",
    primaryColor: "from-purple-600 to-purple-800",
    categorie: "membre_honneur",
  },
  {
    id: "f8",
    nom: "KINDE",
    prenom: "Basile",
    fonction: "Parrain d'Honneur & Mécène",
    bio: "Mécène, bienfaiteur et conseiller d'orientation stratégique de l'association depuis sa fondation officielle.",
    photo_url: "",
    ordre_affichage: 8,
    statut_honorifique: true,
    est_actif: true,
    initials: "BK",
    primaryColor: "from-purple-500 to-purple-700",
    categorie: "membre_honneur",
  },
];

const fondateurColors = [
  "from-amber-600 to-amber-800",
  "from-amber-500 to-amber-700",
  "from-amber-400 to-amber-600",
  "from-gold-500 to-amber-700",
  "from-amber-600 to-gold-600",
  "from-amber-500 to-gold-500",
];

export default function LeadershipPage() {
  const [members, setMembers] = useState<BureauMember[]>(STATIC_MEMBERS);
  const [fondateurs, setFondateurs] = useState<MembreFondateur[]>(STATIC_FONDATEURS);
  const [historicalMandates, setHistoricalMandates] = useState<HistoricalMandate[]>([]);
  const [movements, setMovements] = useState<MemberMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"current" | "history" | "founders">("current");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFoundersQuery, setSearchFoundersQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 1. Fetch active members
        const { data: activeData, error: activeError } = await supabase
          .from("bureau")
          .select("nom, prenom, role_ben, initiales, bio, email, telephone, est_membre_cle, ordre_affichage")
          .eq("actif", true)
          .order("ordre_affichage", { ascending: true });

        if (activeError) {
          console.warn("Could not retrieve active bureau from Supabase (using static fallback):", activeError.message);
        } else if (activeData && activeData.length > 0) {
          const colors = [
            "from-brand-blue to-brand-blue-deep",
            "from-brand-blue-accent to-brand-blue-dark",
            "from-acier-700 to-acier-900",
            "from-acier-500 to-acier-700",
            "from-brand-blue via-acier-700 to-acier-900",
            "from-brand-blue-dark to-acier-800",
            "from-acier-600 to-acier-800",
            "from-emerald-600 to-brand-blue-deep",
            "from-emerald-500 to-brand-blue-dark",
          ];
          const formattedActive = activeData.map((item, index) => {
            const prefix = item.nom.toUpperCase().includes("AMOUSSOU") || item.nom.toUpperCase().includes("AHOUANDJINOU") ? "Mme. " : "M. ";
            return {
              name: `${prefix}${item.nom} ${item.prenom}`,
              role: item.role_ben,
              initials: item.initiales || item.nom.substring(0, 2).toUpperCase(),
              primaryColor: colors[index % colors.length],
              bio: item.bio || "",
              isCore: item.est_membre_cle || false,
              email: item.email || "aegmb2025@yahoo.com",
              telephone: item.telephone || "+2290197884134",
            };
          });
          setMembers(formattedActive);
        }

        // 2. Fetch founders
        const { data: foundersData, error: foundersError } = await supabase
          .from("membres_fondateurs")
          .select("*")
          .order("ordre_affichage", { ascending: true });

        if (foundersError) {
          console.warn("Could not retrieve founders from Supabase:", foundersError.message);
        } else if (foundersData && foundersData.length > 0) {
          const formattedFounders: MembreFondateur[] = foundersData.map((item, index) => ({
            id: item.id,
            nom: item.nom,
            prenom: item.prenom,
            fonction: item.fonction || "",
            bio: item.bio || "",
            photo_url: item.photo_url || "",
            ordre_affichage: item.ordre_affichage || 0,
            statut_honorifique: item.statut_honorifique !== false,
            est_actif: item.est_actif !== false,
            initials: (item.prenom.substring(0, 1) + item.nom.substring(0, 1)).toUpperCase(),
            primaryColor: fondateurColors[index % fondateurColors.length],
            categorie: item.categorie || "fondateur_simple",
          }));
          setFondateurs(formattedFounders);
        } else {
          setFondateurs(STATIC_FONDATEURS);
        }

        // 3. Fetch historical members (inactive) and group them
        const { data: historicalData, error: historicalError } = await supabase
          .from("bureau")
          .select("nom, prenom, role_ben, initiales, mandat_debut, mandat_fin, est_membre_cle")
          .eq("actif", false)
          .order("mandat_debut", { ascending: false });

        if (historicalError) {
          console.warn("Could not retrieve historical bureau from Supabase:", historicalError.message);
        } else if (historicalData && historicalData.length > 0) {
          const groups: { [key: string]: typeof historicalData } = {};
          historicalData.forEach((item) => {
            const start = item.mandat_debut || 2025;
            const end = item.mandat_fin || 2027;
            const key = `${start}-${end}`;
            if (!groups[key]) {
              groups[key] = [];
            }
            groups[key].push(item);
          });

          const formattedHistory: HistoricalMandate[] = Object.keys(groups).map((key) => {
            const items = groups[key];
            const first = items[0];
            const start = first.mandat_debut || 2025;
            const end = first.mandat_fin || 2027;
            const period = `${start} - ${end}`;
            
            let title = `Législature ${period}`;
            let description = `Membres ayant servi activement l'association durant le mandat de ${start} à ${end}.`;

            const membersList = items.map((m) => {
              const prefix = m.nom.toUpperCase().includes("AMOUSSOU") || m.nom.toUpperCase().includes("AHOUANDJINOU") ? "Mme. " : "M. ";
              return {
                name: `${prefix}${m.nom} ${m.prenom}`,
                role: m.role_ben,
                initials: m.initiales || m.nom.substring(0, 2).toUpperCase(),
                isLeader: m.est_membre_cle || false,
              };
            });

            return {
              period,
              title,
              description,
              members: membersList,
            };
          });

          formattedHistory.sort((a, b) => {
            const yearA = parseInt(a.period.split(" ")[0]) || 0;
            const yearB = parseInt(b.period.split(" ")[0]) || 0;
            return yearB - yearA;
          });

          setHistoricalMandates(formattedHistory);
        }

        // 4. Fetch movements log
        const { data: movementsData, error: movementsError } = await supabase
          .from("journal_mouvements")
          .select("nom_complet, role_ben, type_mouvement, date_mouvement, motif")
          .order("date_mouvement", { ascending: false });

        if (movementsError) {
          console.warn("Could not retrieve movements journal from Supabase:", movementsError.message);
        } else if (movementsData && movementsData.length > 0) {
          const formattedMovements: MemberMovement[] = movementsData.map((item) => {
            let dateStr = item.date_mouvement;
            try {
              const d = new Date(item.date_mouvement);
              if (!isNaN(d.getTime())) {
                const formattedDate = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
                dateStr = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
              }
            } catch (e) {
              // fallback
            }

            const isEn = item.type_mouvement.toLowerCase() === "entree" || item.type_mouvement.toLowerCase() === "in";
            return {
              date: dateStr,
              name: item.nom_complet,
              type: isEn ? "in" : "out",
              role: item.role_ben,
              details: item.motif || (isEn ? "Intégration réglementaire au Bureau Exécutif National." : "Retrait ou fin de mandat au bureau national."),
              badge: isEn ? "Entrée" : "Sortie",
            };
          });
          setMovements(formattedMovements);
        }

      } catch (err) {
        console.warn("Error inside fetch leadership details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter members based on search bar query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter founders based on search query
  const filteredFounders = fondateurs.filter(
    (f) =>
      f.nom.toLowerCase().includes(searchFoundersQuery.toLowerCase()) ||
      f.prenom.toLowerCase().includes(searchFoundersQuery.toLowerCase()) ||
      f.fonction.toLowerCase().includes(searchFoundersQuery.toLowerCase()) ||
      f.bio.toLowerCase().includes(searchFoundersQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20 animate-fade-in pt-24 min-h-screen bg-gradient-to-b from-acier-50 to-white">
      {/* Section Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold font-mono text-brand-blue uppercase tracking-widest mb-4">
            <Award className="w-4 h-4" />
            <span>ORGANES DIRECTEURS</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-acier-900 leading-tight">
            Le Bureau Exécutif National (BEN)
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-acier-600 font-light leading-relaxed max-w-2xl mx-auto">
            Gouvernance de l'AEGM-BÉNIN. Découvrez la composition actuelle du bureau, l'histoire des mandats successifs, la traçabilité des mouvements d'effectif et les membres fondateurs.
          </p>
          <div className="h-1 w-20 bg-brand-blue mx-auto mt-6 rounded-full" />
        </div>

        {/* Dynamic & Interactive Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-acier-200 pb-6 mb-10">
          {/* Tabs switch */}
          <div className="flex flex-col sm:flex-row p-1.5 bg-acier-100/90 backdrop-blur-sm rounded-2xl border border-acier-200/80 w-full sm:w-auto gap-1.5 shadow-md shadow-acier-100/50">
            <button
              onClick={() => { setActiveTab("current"); setSearchQuery(""); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform cursor-pointer ${
                activeTab === "current"
                  ? "bg-gradient-to-r from-brand-blue to-brand-blue-deep text-white shadow-lg shadow-brand-blue/20 scale-[1.03] border border-brand-blue/10"
                  : "text-acier-600 hover:text-brand-blue hover:bg-white hover:shadow-sm hover:scale-[1.01] active:scale-95"
              }`}
            >
              <ShieldCheck className={`w-4.5 h-4.5 transition-transform duration-300 ${activeTab === "current" ? "scale-110" : ""}`} />
              <span>Bureau Actuel</span>
            </button>
            <button
              onClick={() => { setActiveTab("history"); setSearchQuery(""); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform cursor-pointer ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-brand-blue-accent to-brand-blue-dark text-white shadow-lg shadow-brand-blue-accent/20 scale-[1.03] border border-brand-blue-accent/10"
                  : "text-acier-600 hover:text-brand-blue-accent hover:bg-white hover:shadow-sm hover:scale-[1.01] active:scale-95"
              }`}
            >
              <History className={`w-4.5 h-4.5 transition-transform duration-300 ${activeTab === "history" ? "scale-110" : ""}`} />
              <span>Historique & Mouvements</span>
            </button>
            <button
              onClick={() => { setActiveTab("founders"); setSearchFoundersQuery(""); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform cursor-pointer ${
                activeTab === "founders"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20 scale-[1.03] border border-amber-500/10"
                  : "text-acier-600 hover:text-amber-600 hover:bg-white hover:shadow-sm hover:scale-[1.01] active:scale-95"
              }`}
            >
              <Crown className={`w-4.5 h-4.5 transition-transform duration-300 ${activeTab === "founders" ? "scale-110" : ""}`} />
              <span>Membres Fondateurs</span>
            </button>
          </div>

          {/* Contextual Action / Info badges */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {activeTab === "current" && (
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-white pl-9 pr-4 py-2.5 rounded-xl border border-acier-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-acier-400" />
              </div>
            )}
            {activeTab === "history" && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[10px] font-mono text-emerald-700 uppercase font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                <span>Base Historique Stable</span>
              </span>
            )}
            {activeTab === "founders" && (
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Rechercher un fondateur..."
                  value={searchFoundersQuery}
                  onChange={(e) => setSearchFoundersQuery(e.target.value)}
                  className="w-full text-xs bg-white pl-9 pr-4 py-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
              </div>
            )}
          </div>
        </div>

        {/* Tab 1: CURRENT ACTIVE BUREAU GRID */}
        {activeTab === "current" && (
          <div className="space-y-8">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-acier-100 p-8">
                <HelpCircle className="w-12 h-12 text-acier-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-acier-900 font-display">Aucun membre trouvé</h3>
                <p className="text-xs text-acier-500 mt-1 max-w-sm mx-auto">
                  Aucun membre du Bureau exécutif ne correspond à vos critères de recherche "{searchQuery}".
                </p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-brand-blue-deep transition-all"
                >
                  Réinitialiser le filtre
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMembers.map((member, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border border-acier-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 relative group overflow-hidden ${
                      member.isCore ? "ring-2 ring-brand-blue/10" : ""
                    }`}
                  >
                    {member.isCore && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/5 rounded-full blur-xl pointer-events-none" />
                    )}

                    <div>
                      {/* Avatar Badge */}
                      <div className="flex justify-center mb-6 relative">
                        <div
                          className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.primaryColor} flex items-center justify-center text-white text-2xl font-bold font-display shadow-md tracking-wider group-hover:scale-105 transition-transform duration-300 relative border-4 border-white`}
                        >
                          {member.initials}

                          {member.isCore && (
                            <span className="absolute bottom-0 right-0 p-1.5 bg-brand-blue text-white rounded-full shadow-md border-2 border-white" title="Membre Clé">
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Position & Identity */}
                      <div className="text-center mb-4">
                        <span className="inline-block px-2.5 py-1 rounded bg-brand-blue-light text-[9px] font-bold font-mono tracking-wider text-brand-blue uppercase mb-2">
                          {member.role}
                        </span>
                        <h3 className="text-lg font-bold text-acier-900 font-display group-hover:text-brand-blue transition-colors">
                          {member.name}
                        </h3>
                      </div>

                      {/* Professional Biography */}
                      <p className="text-xs text-acier-600 leading-relaxed font-light text-center mb-6 min-h-[4.5rem]">
                        {member.bio}
                      </p>
                    </div>

                    {/* Action buttons (Mail & Call) */}
                    <div className="pt-4 border-t border-acier-100 flex justify-center space-x-3 text-acier-400">
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2.5 bg-acier-50 hover:bg-brand-blue-soft hover:text-brand-blue rounded-xl transition-all text-acier-600"
                        title={`Envoyer un email à ${member.name}`}
                      >
                        <Mail className="w-4.5 h-4.5" />
                      </a>
                      <a
                        href={`tel:${member.telephone}`}
                        className="p-2.5 bg-acier-50 hover:bg-brand-blue-soft hover:text-brand-blue rounded-xl transition-all text-acier-600"
                        title={`Appeler ${member.name}`}
                      >
                        <PhoneCall className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: HISTORICAL TIMELINE AND MEMBERSHIP MOVEMENTS */}
        {activeTab === "history" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Timeline Column (Past Mandates) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center space-x-2 border-b border-acier-200 pb-3">
                <Award className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-extrabold font-display text-acier-900 uppercase tracking-tight">
                  Ligne du Temps des Mandats
                </h3>
              </div>

              {historicalMandates.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-acier-100 p-8">
                  <Inbox className="w-12 h-12 text-acier-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-acier-900 font-display">Aucun mandat historique</h3>
                  <p className="text-xs text-acier-500 mt-1 max-w-sm mx-auto">
                    Aucune donnée historique disponible pour le moment. Les anciens mandats seront affichés ici dès qu'ils seront enregistrés.
                  </p>
                </div>
              ) : (
                <div className="relative border-l-2 border-acier-200 ml-4 pl-8 space-y-12">
                  {historicalMandates.map((mandate, idx) => (
                    <div key={idx} className="relative group">
                      <span className={`absolute -left-[41px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full border-4 border-white shadow ${
                        idx === 0 ? "bg-brand-blue ring-4 ring-brand-blue/15" : "bg-acier-400"
                      }`} />

                      <div className="bg-white rounded-2xl border border-acier-200 p-6 shadow-sm hover:border-brand-blue/25 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-[10px] font-bold font-mono tracking-wider uppercase rounded-full">
                            {mandate.period}
                          </span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase rounded font-mono">
                              Actuel
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold font-display text-acier-900 mb-2 group-hover:text-brand-blue transition-colors">
                          {mandate.title}
                        </h4>
                        <p className="text-xs text-acier-600 leading-relaxed font-light mb-4">
                          {mandate.description}
                        </p>

                        <div className="border-t border-acier-100 pt-4">
                          <h5 className="text-[10px] font-bold font-mono uppercase tracking-wider text-acier-400 mb-3">
                            Membres notables de la législature
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {mandate.members.map((m, mIdx) => (
                              <div key={mIdx} className="flex items-center space-x-2.5 p-2 rounded-lg bg-acier-50/50 border border-acier-100 hover:bg-acier-50 transition-all">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white bg-gradient-to-br ${
                                  m.isLeader ? "from-brand-blue to-brand-blue-deep shadow-sm" : "from-acier-500 to-acier-600"
                                }`}>
                                  {m.initials}
                                </span>
                                <div>
                                  <h6 className="text-xs font-bold text-acier-900 font-display">
                                    {m.name}
                                  </h6>
                                  <p className="text-[9px] text-brand-blue font-mono uppercase font-bold">
                                    {m.role}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stream Column (Incoming/Outgoing log) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center space-x-2 border-b border-acier-200 pb-3">
                <ArrowLeftRight className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-extrabold font-display text-acier-900 uppercase tracking-tight">
                  Journal des Mouvements (Entrées/Sorties)
                </h3>
              </div>

              {movements.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-acier-100 p-8">
                  <Inbox className="w-12 h-12 text-acier-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-acier-900 font-display">Aucun mouvement enregistré</h3>
                  <p className="text-xs text-acier-500 mt-1 max-w-sm mx-auto">
                    Aucun mouvement (entrée/sortie) n'a été enregistré pour le moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {movements.map((mv, idx) => (
                    <div
                      key={idx}
                      className="flex space-x-4 bg-white p-5 rounded-2xl border border-acier-100 hover:border-brand-blue/20 shadow-sm transition-all relative overflow-hidden"
                    >
                      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                        mv.type === "in" ? "bg-emerald-500" : "bg-rose-500"
                      }`} />

                      <div className="flex-shrink-0 pt-0.5">
                        {mv.type === "in" ? (
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                            <UserPlus className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner">
                            <UserMinus className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-[10px] font-mono text-acier-400 font-bold uppercase">
                            {mv.date}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase ${
                            mv.type === "in" 
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}>
                            {mv.badge}
                          </span>
                        </div>

                        <h4 className="text-sm font-extrabold text-acier-900 font-display">
                          {mv.name}
                        </h4>
                        <p className="text-[10px] font-bold font-mono tracking-wider text-brand-blue uppercase">
                          {mv.role}
                        </p>
                        
                        <p className="text-xs text-acier-600 leading-relaxed font-light pt-1">
                          {mv.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: MEMBRES FONDATEURS */}
        {activeTab === "founders" && (
          <div className="space-y-12 animate-fade-in">
            {filteredFounders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-amber-100 p-8">
                <HelpCircle className="w-12 h-12 text-amber-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-acier-900 font-display">Aucun fondateur trouvé</h3>
                <p className="text-xs text-acier-500 mt-1 max-w-sm mx-auto">
                  Aucun membre fondateur ne correspond à vos critères de recherche "{searchFoundersQuery}".
                </p>
                <button 
                  onClick={() => setSearchFoundersQuery("")}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-all"
                >
                  Réinitialiser le filtre
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {FOUNDER_CATEGORIES.map((cat) => {
                  const catMembers = filteredFounders.filter(
                    (f) => (f.categorie || "fondateur_simple") === cat.code
                  );
                  if (catMembers.length === 0) return null;

                  return (
                    <div key={cat.code} className="space-y-6 animate-fade-in">
                      {/* Section Title with Icon and Description */}
                      <div className="border-b border-acier-100 pb-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br shadow-sm border ${
                            cat.color === "gold" ? "from-amber-50 to-yellow-50 border-amber-200" :
                            cat.color === "blue" ? "from-blue-50 to-indigo-50 border-blue-200" :
                            cat.color === "green" ? "from-emerald-50 to-teal-50 border-emerald-200" :
                            "from-purple-50 to-indigo-50 border-purple-200"
                          }`}>
                            <cat.icon className={`w-5 h-5 ${
                              cat.color === "gold" ? "text-amber-600" :
                              cat.color === "blue" ? "text-blue-600" :
                              cat.color === "green" ? "text-emerald-600" :
                              "text-purple-600"
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold font-display text-acier-900 tracking-tight">
                              {cat.title}
                            </h3>
                            <span className="text-[9px] font-bold font-mono text-acier-400 uppercase tracking-wider">
                              Catégorie officielle
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-acier-600 font-light max-w-3xl leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      {/* Grid for Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {catMembers.map((founder, i) => {
                          // Styling attributes based on category color
                          let badgeBg = "bg-amber-100 border-amber-300 text-amber-800";
                          let badgeLabel = "Certification";
                          let shadowHover = "hover:shadow-amber-500/5 hover:border-amber-400/40";
                          let ringColor = "ring-amber-200/50";

                          if (cat.code === "bureau_agc") {
                            badgeBg = "bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-600/10 border-amber-400/30 text-amber-700 ring-2 ring-amber-100/50";
                            badgeLabel = "Certification Présidentielle";
                            shadowHover = "hover:shadow-amber-500/10 hover:border-amber-500/40";
                            ringColor = "ring-amber-200/50";
                          } else if (cat.code === "membre_signataire") {
                            badgeBg = "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-400/30 text-blue-700 ring-2 ring-blue-100/50";
                            badgeLabel = "Membre Signataire";
                            shadowHover = "hover:shadow-blue-500/10 hover:border-blue-500/40";
                            ringColor = "ring-blue-200/50";
                          } else if (cat.code === "fondateur_simple") {
                            badgeBg = "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-400/30 text-emerald-700 ring-2 ring-emerald-100/50";
                            badgeLabel = "Membre Pionnier";
                            shadowHover = "hover:shadow-emerald-500/10 hover:border-emerald-500/40";
                            ringColor = "ring-emerald-200/50";
                          } else if (cat.code === "membre_honneur") {
                            badgeBg = "bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-purple-600/15 border-purple-400/35 text-purple-700 ring-4 ring-purple-100/60";
                            badgeLabel = "Distinction Honorifique";
                            shadowHover = "hover:shadow-purple-500/15 hover:border-purple-500/40";
                            ringColor = "ring-purple-200/50";
                          }

                          return (
                            <div
                              key={founder.id || i}
                              className={`bg-white rounded-2xl border border-acier-200 p-6 flex flex-col justify-between hover:shadow-xl ${shadowHover} transition-all duration-300 relative group overflow-hidden`}
                            >
                              {/* Glowing certified seal/badge in top right corner */}
                              <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-sm border text-[8px] font-extrabold font-mono uppercase tracking-wider ${badgeBg}`}>
                                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                                <span>{badgeLabel}</span>
                              </div>

                              {/* Avatar Display */}
                              <div className="flex flex-col items-center">
                                <div className="flex justify-center mb-4 relative">
                                  <div
                                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${founder.primaryColor} flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg tracking-wider group-hover:scale-105 transition-transform duration-300 relative border-4 border-white ring-2 ${ringColor}`}
                                  >
                                    {founder.initials}
                                    <span className={`absolute -bottom-1 -right-1 p-1 rounded-full shadow-md border-2 border-white ${
                                      cat.code === "bureau_agc" ? "bg-amber-500 text-white" :
                                      cat.code === "membre_signataire" ? "bg-blue-50 text-white" :
                                      cat.code === "fondateur_simple" ? "bg-emerald-50 text-white" :
                                      "bg-purple-50 text-white"
                                    }`}>
                                      {cat.code === "bureau_agc" ? <Crown className="w-3.5 h-3.5" /> :
                                       cat.code === "membre_signataire" ? <Award className="w-3.5 h-3.5" /> :
                                       cat.code === "fondateur_simple" ? <Users className="w-3.5 h-3.5" /> :
                                       <Star className="w-3.5 h-3.5 fill-white" />
                                      }
                                    </span>
                                  </div>
                                </div>

                                {/* Role & Identity */}
                                <div className="text-center mb-3">
                                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase mb-2 ${
                                    cat.code === "bureau_agc" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                    cat.code === "membre_signataire" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                    cat.code === "fondateur_simple" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                    "bg-purple-50 text-purple-700 border border-purple-200"
                                  }`}>
                                    {cat.code === "bureau_agc" ? "Bureau AGC" :
                                     cat.code === "membre_signataire" ? "Signataire" :
                                     cat.code === "fondateur_simple" ? "Pionnier" :
                                     "Honneur"
                                    }
                                  </span>
                                  <h3 className="text-base font-extrabold text-acier-900 font-display group-hover:text-amber-700 transition-colors">
                                    {founder.prenom} {founder.nom}
                                  </h3>
                                  {founder.fonction && (
                                    <p className="text-xs font-semibold text-acier-500 mt-1 max-w-[200px] mx-auto">
                                      {founder.fonction}
                                    </p>
                                  )}
                                </div>

                                {/* Bio */}
                                {founder.bio && (
                                  <p className="text-xs text-acier-600 leading-relaxed font-light text-center mb-4 max-w-sm">
                                    {founder.bio}
                                  </p>
                                )}

                                {/* Certificate Ribbon Seal at the bottom */}
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/70 border border-amber-200/80 rounded-full shadow-inner">
                                  <Award className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="text-[9px] font-extrabold text-amber-800 uppercase tracking-wide">
                                    Acte Fondateur Certifié
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Electoral Regulations Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-blue-light/50 rounded-2xl border border-brand-blue/15 p-6 md:p-8 text-center space-y-4 shadow-sm relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-blue/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-center space-x-2 text-brand-blue">
            <Award className="w-5 h-5" />
            <h4 className="font-extrabold font-display text-sm uppercase tracking-wider">
              Règlement Électoral & Mandats (Article 22 & 46)
            </h4>
          </div>
          <p className="text-xs text-acier-700 leading-relaxed font-light max-w-3xl mx-auto">
            Le Président et le Vice-Président du Bureau Exécutif National (BEN) sont élus au scrutin secret par l'Assemblée Générale Constitutive pour un mandat de deux (2) ans renouvelable une seule fois. Les autres membres titulaires ou adjoints sont renouvelables indéfiniment. Tout membre du BEN sortant ou entrant doit satisfaire aux obligations de cotisations annuelles de base avant de postuler.
          </p>
        </div>
      </section>
    </div>
  );
}