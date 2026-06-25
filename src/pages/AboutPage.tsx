import { Calendar, MapPin, Award, BookOpen, ShieldCheck, Milestone, Users, Scale, Landmark, CalendarRange } from "lucide-react";

export default function AboutPage() {
  const identityCards = [
    {
      icon: <Calendar className="w-6 h-6 text-brand-blue" />,
      title: "Date de Fondation",
      value: "29 Août 2025",
      description: "Créée lors du Congrès Constitutif d'Akassato par les membres fondateurs.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-blue" />,
      title: "Siège Social",
      value: "LTP / ASBA (Akassato)",
      description: "Lycée Technique et Professionnel d'Amitié Sino-Béninoise, Abomey-Calavi.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-blue" />,
      title: "Notre Devise",
      value: "Solidité & Unité",
      description: "« Solides comme l'ACIER, unis pour la mécanique ».",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-blue" />,
      title: "Filière Cible",
      value: "Génie Mécanique",
      description: "Construction mécanique, métallique et métiers de l'ingénierie au Bénin.",
    },
  ];

  const objectivesList = [
    {
      icon: <Users className="w-8 h-8 text-brand-blue" />,
      number: "01",
      title: "Fédérer & Partager",
      subtitle: "Regroupement des acteurs",
      description:
        "Regrouper les enseignants, formateurs et intervenants de la construction mécanique et métallique, afin de favoriser l'unité, l'échange d'expériences et le partage de bonnes pratiques pédagogiques.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-blue" />,
      number: "02",
      title: "Formation Continue & Recherche",
      subtitle: "Perfectionnement & Recyclage",
      description:
        "Promouvoir la recherche, la formation continue et la solidarité professionnelle en initiant des programmes de recyclage, de mutualisation de ressources didactiques et d'assistance mutuelle.",
    },
    {
      icon: <Scale className="w-8 h-8 text-brand-blue" />,
      number: "03",
      title: "Défendre & Valoriser",
      subtitle: "Protection de la profession",
      description:
        "Défendre les intérêts professionnels, pédagogiques et matériels des acteurs de la construction mécanique et métallique auprès des autorités publiques et des établissements partenaires.",
    },
    {
      icon: <Landmark className="w-8 h-8 text-brand-blue" />,
      number: "04",
      title: "Synergies Institutionnelles",
      subtitle: "Partenariats Public - Privé",
      description:
        "Établir et renforcer la coopération avec les ministères de l'enseignement technique, les universités, les entreprises industrielles et les réseaux professionnels nationaux et internationaux.",
    },
    {
      icon: <CalendarRange className="w-8 h-8 text-brand-blue" />,
      number: "05",
      title: "Événements & Activités",
      subtitle: "Rayonnement & Immersion",
      description:
        "Organiser l'Université de Vacances (UV), des séminaires, des stages pratiques en entreprise, des conférences et des ateliers techniques pour maintenir nos membres au sommet des exigences du métier.",
    },
  ];

  return (
    <div className="space-y-16 pb-16 animate-fade-in pt-24">
      {/* Section Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold font-mono tracking-widest text-brand-blue uppercase mb-3">
            QUI SOMMES-NOUS ?
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-acier-900 leading-tight">
            Une synergie d'excellence pour l'avenir industriel du Bénin
          </h1>
          <div className="h-1.5 w-24 bg-brand-blue mx-auto mt-6 rounded" />
        </div>

        {/* Info Grid (4 Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {identityCards.map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-acier-200 bg-white hover:bg-brand-blue-soft/30 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-3 bg-brand-blue-light group-hover:bg-brand-blue text-brand-blue group-hover:text-white rounded-xl w-fit shadow-sm transition-colors mb-4">
                {card.icon}
              </div>
              <span className="block text-[10px] font-bold text-acier-400 uppercase tracking-wider mb-1.5 font-mono">
                {card.title}
              </span>
              <span className="block text-lg font-bold text-acier-900 mb-2 font-display">
                {card.value}
              </span>
              <p className="text-xs text-acier-600 leading-relaxed font-light">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Presentation detail & Quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold font-display text-acier-900">
              Notre Vision Pédagogique & Impact National
            </h3>
            
            <p className="text-sm sm:text-base text-acier-600 leading-relaxed font-light text-justify">
              Pour accompagner l'essor de l'enseignement technique au Bénin, AEGM-BÉNIN se positionne comme un catalyseur d'excellence et d'innovation pour la filière construction mécanique et métallique. Notre action quotidienne vise à fédérer les forces vives de notre corporation — enseignants, inspecteurs, formateurs et experts industriels — pour co-construire des parcours d'apprentissage résolument tournés vers l'avenir, alignés sur les réalités du marché de l'emploi et de la transition numérique.
            </p>

            <p className="text-sm sm:text-base text-acier-600 leading-relaxed font-light text-justify">
              Au-delà du cadre réglementaire, notre association cultive un engagement civique fort : elle œuvre pour l'insertion professionnelle durable des jeunes diplômés et la mise en réseau de nos membres à travers tout le territoire national. En étroite collaboration avec les autorités ministérielles et les partenaires socio-économiques, nous portons haut les couleurs d'un génie mécanique béninois innovant, inclusif et souverain.
            </p>

            <div className="border-l-4 border-brand-blue pl-4 py-2 bg-brand-blue-light/50 rounded-r-xl">
              <p className="italic text-xs sm:text-sm text-acier-800 font-medium">
                « Notre association est une organisation professionnelle, apolitique, non confessionnelle et à but non lucratif, agissant dans un esprit de mutualisation des compétences. »
              </p>
            </div>
          </div>

          {/* Slogan illustration card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-acier-800 to-acier-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-acier-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue-accent text-xs font-mono uppercase tracking-wide mb-6 border border-brand-blue/20 font-semibold">
                  Valeurs Fondatrices
                </span>
                <h4 className="text-2xl font-bold font-display mb-4">L'esprit de l'ACIER</h4>
                <p className="text-acier-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  L'acier symbolise la solidité de notre rigueur scientifique, la résilience de nos formateurs face aux défis industriels et la force de notre union fraternelle à travers tout le territoire national béninois.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-acier-700">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-acier-200 font-light">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-accent" />
                  <span>Indépendance totale de fonctionnement</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-acier-200 font-light">
                  <Milestone className="w-5 h-5 text-brand-blue-accent" />
                  <span>Continuité harmonieuse formation - entreprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Pillars Section */}
      <section className="bg-white border-t border-b border-acier-200/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest text-brand-blue uppercase mb-2">
              NOS MISSIONS SPÉCIFIQUES
            </h2>
            <p className="text-2xl sm:text-3xl font-bold font-display text-acier-900">
              Les cinq piliers d'action d'AEGM-BÉNIN
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectivesList.map((obj, idx) => (
              <div
                key={idx}
                className={`relative bg-acier-50/50 p-8 rounded-2xl border border-acier-200 hover:border-brand-blue/30 hover:shadow-xl hover:bg-white transition-all duration-300 group flex flex-col justify-between ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white group-hover:bg-brand-blue-light rounded-xl transition-colors text-brand-blue shadow-sm">
                      {obj.icon}
                    </div>
                    <span className="text-3xl font-bold font-display text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
                      {obj.number}
                    </span>
                  </div>
                  
                  <span className="block text-[10px] font-bold font-mono text-brand-blue uppercase tracking-wider mb-1.5">
                    {obj.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-acier-900 mb-4 font-display group-hover:text-brand-blue transition-colors">
                    {obj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-acier-600 leading-relaxed font-light mb-6">
                    {obj.description}
                  </p>
                </div>

                <div className="h-1.5 w-12 bg-acier-200 group-hover:w-full group-hover:bg-brand-blue transition-all duration-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
