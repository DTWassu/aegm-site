export interface Article {
  id: string;
  number: number;
  title: string;
  content: string;
  subsections?: string[];
}

export interface TitleSection {
  id: string;
  title: string;
  articles: Article[];
}

export const PREAMBULE_TEXT = `Le monde industriel est en constante mutation, entraînant de nouveaux défis technologiques, éthiques, sociaux et pédagogiques. Dans cette dynamique, l'importance croissante du génie mécanique apparaît comme une évidence incontournable, tant pour l'évolution des savoirs que pour le développement industriel, économique et social de notre pays.

Conscients du rôle essentiel de notre corporation dans la recherche et la mise en œuvre de stratégies capables de relever ces défis, notamment ceux liés aux enjeux formatifs, nous, enseignants, formateurs et intervenants de génie mécanique au Bénin, affirmons notre engagement à œuvrer collectivement pour l'excellence, l'innovation et la valorisation de notre filière.

Notre démarche s'inscrit dans une dynamique citoyenne, solidaire et responsable, visant à :
• Renforcer les liens entre enseignants et favoriser les échanges de pratiques pédagogiques, scientifiques et techniques ;
• Assurer une continuité harmonieuse et responsable de la formation entre les divers ordres de l'enseignement ;
• Promouvoir la formation continue, la recherche et l'innovation ;
• Défendre les intérêts pédagogiques, professionnels et matériels de nos membres ;
• Créer un cadre de collaboration institutionnelle avec l'État, les établissements de formation, les entreprises et les partenaires nationaux et internationaux ;
• Contribuer activement au rayonnement du génie mécanique au Bénin et au-delà.

L'association, sans aucune visée politique, s'appuie essentiellement sur la mutualisation des compétences et l'engagement de ses membres pour relever avec dignité et efficacité les défis liés à l'enseignement et à la formation en génie mécanique, tout en préservant son autonomie de fonctionnement et de gestion vis-à-vis des structures administratives existantes.

C'est dans cet esprit d'unité, de responsabilité et de rigueur que les enseignants et formateurs de génie mécanique du Bénin – en particulier ceux de la construction mécanique et métallique – réunis en Congrès Constitutif le 29 août 2025 au Lycée Technique et Professionnel d'Amitié Sino-Béninoise d'Akassato (LTP/ASBA), adoptent les présents statuts et règlement intérieur de l'Association des Enseignants de Génie Mécanique du Bénin (AEGM – BÉNIN), sous le slogan : « Solides comme l'ACIER, unis pour la mécanique ».`;

export const STATUTS_SECTIONS: TitleSection[] = [
  {
    id: "titre-1",
    title: "Titre I : Création – Dénomination – Siège – Durée – Composition",
    articles: [
      {
        id: "art-1",
        number: 1,
        title: "Création et dénomination",
        content: "Il est créé, entre les enseignants et les formateurs et autres acteurs intervenant dans l'enseignement de la construction mécanique et métallique au Bénin, une association régie par la loi de 2025-19 relative à la liberté d'association, ses textes d'application, ainsi que par les présents statuts. Cette association prend la dénomination : « Association des Enseignants de Génie Mécanique » (AEGM – BÉNIN)."
      },
      {
        id: "art-2",
        number: 2,
        title: "Nature",
        content: "AEGM – BÉNIN est une organisation professionnelle, apolitique, non confessionnelle et à but non lucratif. Elle agit dans un esprit citoyen et collabore avec l'État, les collectivités, les établissements scolaires et universitaires, ainsi que tout partenaire national ou international poursuivant des objectifs similaires ou complémentaires."
      },
      {
        id: "art-3",
        number: 3,
        title: "Siège social",
        content: "Le siège social de l'association est fixé à : Lycée Technique et Professionnel d'Amitié Sino Béninoise d'Akassato (ASBA), département de l'Atlantique, commune d'Abomey-Calavi. Le siège social peut être transféré en tout autre lieu du territoire national, sur décision de l'Assemblée Générale ordinaire ou extraordinaire."
      },
      {
        id: "art-4",
        number: 4,
        title: "Durée",
        content: "La durée de l'association est illimitée. Elle ne peut être dissoute que par décision de l'Assemblée Générale, dans les conditions prévues aux présents statuts."
      },
      {
        id: "art-5",
        number: 5,
        title: "Membres",
        content: "L'association se compose de :",
        subsections: [
          "1. Membres actifs : enseignants, formateurs et intervenants de construction mécanique et métallique, jouissant de leurs droits civiques et à jour de leurs cotisations.",
          "2. Membres sympathisants : toute personne physique ou morale intéressée par les objectifs de l'association et souhaitant y contribuer matériellement, financièrement ou moralement.",
          "3. Membres d'honneur : toute personnalité ayant rendu des services signalés à l'association ou contribué au rayonnement de la filière construction mécanique et métallique. Le titre de membre d'honneur est décerné par l'Assemblée Générale, sur proposition du Bureau Exécutif National."
        ]
      },
      {
        id: "art-6",
        number: 6,
        title: "Conditions d'adhésion et de perte de qualité de membre",
        content: "Les conditions régissant l'intégration et le départ des membres sont les suivantes :",
        subsections: [
          "Adhésion : Toute personne souhaitant adhérer doit remplir une fiche d'adhésion, s'acquitter du droit d'entrée, et accepter les présents statuts, le règlement intérieur ainsi que la charte des valeurs de l'association. L'adhésion est validée en premier ressort par le Bureau de la Cellule de Base (BCB). Cette validation est transmise pour confirmation au Bureau Régional (BR), qui assure la consolidation au niveau régional. Le Bureau Exécutif National (BEN) conserve un droit de contrôle et d'arbitrage en dernier ressort.",
          "Perte de qualité de membre : La qualité de membre se perd par : (1) Démission volontaire adressée par écrit au BEN ; (2) Décès du membre ; (3) Radiation prononcée par le BEN pour non-paiement répété des cotisations, non-respect des statuts ou motif grave portant atteinte aux intérêts de l'association ; (4) Suspension temporaire décidée dans le cadre disciplinaire."
        ]
      }
    ]
  },
  {
    id: "titre-2",
    title: "Titre II : Buts et missions",
    articles: [
      {
        id: "art-7",
        number: 7,
        title: "But général",
        content: "AEGM – BÉNIN a pour but de fédérer les acteurs de l'enseignement en construction mécanique et métallique puis de promouvoir un cadre professionnel et solidaire, en vue de contribuer au développement harmonieux de l'éducation technique, du secteur industriel et de la société béninoise."
      },
      {
        id: "art-8",
        number: 8,
        title: "Objectifs spécifiques",
        content: "Pour atteindre son but, l'association se fixe les objectifs suivants :",
        subsections: [
          "1. Regrouper les enseignants, formateurs et intervenants de la construction mécanique et métallique, afin de favoriser l'unité, l'échange d'expériences et le partage des bonnes pratiques pédagogiques.",
          "2. Promouvoir la recherche, la formation continue et la solidarité professionnelle en initiant et en soutenant des programmes de perfectionnement, de recyclage, de mutualisation de ressources et d'assistance mutuelle entre les membres.",
          "3. Défendre les intérêts professionnels, pédagogiques et matériels des acteurs de la construction mécanique et métallique et intervenants auprès des autorités publiques, des établissements de formation et de tout autre partenaire, dans le respect des lois et règlements en vigueur.",
          "4. Établir et renforcer la coopération institutionnelle et professionnelle avec les ministères, les établissements scolaires/universitaires, les entreprises du secteur industriel, et les associations similaires à l'échelle nationale et internationale.",
          "5. Organiser régulièrement des activités scientifiques, pédagogiques et professionnelles telles que l'Université de Vacances (UV), des séminaires de formation, des stages pratiques, visites d'entreprises, conférences et ateliers thématiques."
        ]
      }
    ]
  },
  {
    id: "titre-3",
    title: "Titre III : Définitions des termes spécifiques",
    articles: [
      {
        id: "art-9",
        number: 9,
        title: "Assemblée Générale (AG)",
        content: "L'Assemblée Générale est l'organe suprême de décision de l'association. Elle réunit tous les membres actifs et se prononce sur les grandes orientations, l'adoption des rapports, les élections et la révision des statuts. Ses décisions s'imposent à tous."
      },
      {
        id: "art-10",
        number: 10,
        title: "Université de Vacances (UV)",
        content: "L'Université de Vacances est une rencontre annuelle organisée par l'association, regroupant ses membres et partenaires. Elle combine un cadre de formation continue, de bilan annuel, de planification stratégique et de renforcement de la cohésion. Elle est couplée à l'Assemblée Générale annuelle."
      },
      {
        id: "art-11",
        number: 11,
        title: "Bureau Exécutif National (BEN)",
        content: "Le Bureau Exécutif National est l'organe central de gouvernance de l'association. Il met en œuvre les décisions de l'Assemblée Générale, coordonne les structures régionales et locales, et assure la représentation officielle de l'association."
      },
      {
        id: "art-12",
        number: 12,
        title: "Cellule de base",
        content: "La cellule de base correspond à la représentation de l'association dans un établissement technique ou professionnel disposant d'au moins une section de construction mécanique et métallique. Elle constitue le premier niveau d'organisation et de mobilisation des membres."
      },
      {
        id: "art-13",
        number: 13,
        title: "Plateforme numérique ACIER",
        content: "La plateforme numérique ACIER est l'outil officiel de gestion associative et pédagogique de l'AEGM – BÉNIN, composée de deux pôles complémentaires :",
        subsections: [
          "• ACIER Connect pour la gestion associative, démocratique et financière.",
          "• ACIER Académie pour la formation continue, la recherche et la coopération institutionnelle.",
          "Les actes réalisés via cette plateforme ont valeur légale au même titre que ceux réalisés en présentiel. Elle est accessible via l'application dédiée."
        ]
      },
      {
        id: "art-14",
        number: 14,
        title: "Catégories de membres",
        content: "Les catégories de membres sont définies à l'Article 5 des présents Statuts (Membres actifs, sympathisants et d'honneur)."
      }
    ]
  },
  {
    id: "titre-4",
    title: "Titre IV : Structures et organisation",
    articles: [
      {
        id: "art-15",
        number: 15,
        title: "Organes",
        content: "AEGM – BÉNIN est organisée en quatre niveaux hiérarchiques et complémentaires à savoir : (1) La Cellule de Base, (2) La Coordination Régionale, (3) Le Bureau Exécutif National (BEN), (4) Le Conseil Consultatif."
      },
      {
        id: "art-16",
        number: 16,
        title: "Aire de compétence et assemblées locales/régionales",
        content: "Chaque cellule de base et chaque coordination régionale organise périodiquement des assemblées locales/régionales afin de planifier les activités, mobiliser les membres, discuter des priorités pédagogiques et professionnelles, et relayer les décisions du BEN. Ces assemblées se tiennent au moins deux fois par an."
      },
      {
        id: "art-17",
        number: 17,
        title: "Régions",
        content: "Pour une meilleure coordination, l'association est répartie en régions, correspondant aux grandes zones éducatives et administratives du Bénin. La répartition géographique est précisée dans le règlement intérieur."
      },
      {
        id: "art-18",
        number: 18,
        title: "Bureau de la cellule de base (BCB)",
        content: "Chaque cellule de base est dirigée par un bureau composé de : (1) Un(e) Secrétaire, (2) Un(e) Trésorier(ère), (3) Un(e) Organisateur(trice). Le Bureau de la Cellule de Base est élu pour un mandat de deux (2) ans renouvelables une fois."
      },
      {
        id: "art-19",
        number: 19,
        title: "Bureau régional (BR)",
        content: "Chaque coordination régionale est administrée par un bureau comprenant : (1) Un(e) Secrétaire régional(e), (2) Un(e) Trésorier(ère) régional(e), (3) Un(e) Organisateur(trice) régional(e). Le Bureau Régional coordonne les cellules de sa zone."
      },
      {
        id: "art-20",
        number: 20,
        title: "Bureau Exécutif National (BEN)",
        content: "Le Bureau Exécutif National est l'organe central de gouvernance de l'association. Il est composé d'un(e) Président(e), Vice-Président(e), Secrétaire Général(e), Secrétaire Général(e) Adjoint(e), Trésorier(ère) Général(e), Trésorier(ère) Général(e) Adjoint(e), Organisateur(rice) Général(e), Organisateur(rice) Général(e) Adjoint(e), et d'un(e) Chargé(e) des Informations et de la Communication."
      },
      {
        id: "art-21",
        number: 21,
        title: "Le Conseil Consultatif",
        content: "Le Conseil Consultatif est un organe de concertation et d'orientation stratégique intermédiaire entre l'Assemblée Générale et le Bureau Exécutif National.",
        subsections: [
          "Constitution : Il est constitué des membres du BEN, des sept représentants régionaux, de deux conseillers élus par l'Assemblée Générale et, à titre consultatif, de personnes ressources d'expertise reconnue.",
          "Prérogatives : (1) Assurer la synergie nationale-régionale ; (2) Veiller à la mise en œuvre des résolutions de l'AG ; (3) Donner un avis sur l'Université de Vacances ; (4) Examiner les propositions de modification statutaire ; (5) Proposer des sanctions ; (6) Être informé trimestriellement des finances ; (7) Examiner le projet de budget annuel ; (8) Avis sur les orientations stratégiques ; (9) Médiation des conflits ; (10) Conseil général permanent.",
          "Fonctionnement : Le Conseil se réunit au moins deux fois par an sur convocation du Président du BEN ou à la demande de 2/3 de ses membres. Les décisions y sont prises à la majorité simple."
        ]
      },
      {
        id: "art-22",
        number: 22,
        title: "Mandats",
        content: "Le Président et le Vice-Président sont élus pour un mandat de deux (2) ans, renouvelable une seule fois. Les autres membres du BEN sont élus pour un mandat de deux (2) ans, renouvelable indéfiniment. Pour être éligible à la Présidence ou Vice-Présidence, il faut avoir déjà été membre du BEN, sauf cas de force majeure validé par l'AG."
      },
      {
        id: "art-23",
        number: 23,
        title: "Personnes ressources et anciens présidents",
        content: "Les anciens Présidents de l'association, en raison de leur expérience et de leur rôle historique, sont reconnus comme membres d'honneur et personnes-ressources permanentes. Ils n'exercent plus de fonction exécutive directe mais peuvent être consultés."
      },
      {
        id: "art-24",
        number: 24,
        title: "Caractère bénévole et frais de mission",
        content: "Les fonctions exercées au sein de l'association sont bénévoles. Toutefois, les frais de mission engagés dans l'intérêt de l'association sont pris en charge sur présentation de pièces justificatives (forfait journalier fixe + transport)."
      },
      {
        id: "art-25",
        number: 25,
        title: "Prérogatives des bureaux",
        content: "Les prérogatives de chaque poste (BCB, BR, BEN, Conseil) sont précisées dans le règlement intérieur. Elles couvrent la gestion administrative/financière, l'animation pédagogique et le respect des statuts."
      }
    ]
  },
  {
    id: "titre-5",
    title: "Titre V : Valorisation et reconnaissance des membres",
    articles: [
      {
        id: "art-26",
        number: 26,
        title: "Principe de valorisation",
        content: "L'association reconnaît et valorise l'engagement de ses membres actifs. La participation aux activités, les contributions pédagogiques et professionnelles font l'objet d'une reconnaissance officielle, transparente et équitable."
      },
      {
        id: "art-27",
        number: 27,
        title: "Distinctions et mentions honorifiques",
        content: "L'association peut attribuer, chaque année, des distinctions symboliques ou mentions honorifiques aux membres qui se sont particulièrement illustrés par leur engagement. Ces distinctions sont proclamées en AG ou lors de l'Université de Vacances."
      },
      {
        id: "art-28",
        number: 28,
        title: "Système d'évaluation et de points d'engagement",
        content: "Un système d'évaluation interne peut être institué afin de comptabiliser la participation et l'implication des membres. Les modalités de ce suivi sont fixées par le Règlement Intérieur."
      },
      {
        id: "art-29",
        number: 29,
        title: "Membre du mois / de l'année",
        content: "Chaque cellule de base, coordination régionale et le BEN peuvent désigner périodiquement un « membre du mois » ou un « membre de l'année », selon des critères définis par le Règlement Intérieur, afin d'encourager l'exemplarité."
      },
      {
        id: "art-30",
        number: 30,
        title: "Opportunités et représentations",
        content: "Les membres actifs et régulièrement impliqués bénéficient d'une priorité pour représenter l'association dans les activités officielles, formations, séminaires, et partenariats institutionnels."
      },
      {
        id: "art-31",
        number: 31,
        title: "Transparence et publication",
        content: "Toutes les distinctions, mentions et reconnaissances attribuées aux membres sont publiées dans le rapport annuel de l'association et consignées dans les archives pour éviter toute partialité."
      }
    ]
  },
  {
    id: "titre-6",
    title: "Titre VI : Instances",
    articles: [
      {
        id: "art-32",
        number: 32,
        title: "Assemblée Générale",
        content: "L'Assemblée Générale est l'organe suprême d'AEGM – BÉNIN. Elle réunit l'ensemble des membres, dispose du pouvoir de décision finale sur toutes les orientations majeures, valide les rapports, adopte les statuts, et élit les organes dirigeants."
      },
      {
        id: "art-33",
        number: 33,
        title: "Tenue annuelle, couplée à l'Université de Vacances",
        content: "L'Assemblée Générale ordinaire se tient une fois par an et est obligatoirement couplée avec l'Université de Vacances (UV). La mission première de chaque BEN est d'organiser cette double activité annuelle. Tout BEN qui échoue sans motif valable approuvé est considéré comme ayant failli et doit être remplacé."
      },
      {
        id: "art-34",
        number: 34,
        title: "Assemblées extraordinaires",
        content: "Des Assemblées Générales extraordinaires peuvent être convoquées sur décision du Président, à la demande du tiers (1/3) des membres actifs, ou sur résolution du BEN, pour traiter de questions urgentes qui ne peuvent attendre la session ordinaire."
      },
      {
        id: "art-35",
        number: 35,
        title: "Modalités de convocation, quorum et votes",
        content: "Les règles régissant le déroulement des AG sont les suivantes :",
        subsections: [
          "• Convocation : Convocations adressées au moins 15 jours avant par voie électronique, affichage ou tout moyen approprié.",
          "• Quorum : L'AG ne peut valablement délibérer qu'en présence d'au moins la moitié (1/2) des membres actifs.",
          "• Votes : Décisions prises à la majorité simple. Vote secret, par procuration (limitée à une par membre) ou électronique garantissant la transparence."
        ]
      }
    ]
  },
  {
    id: "titre-7",
    title: "Titre VII : Ressources et gestion",
    articles: [
      {
        id: "art-36",
        number: 36,
        title: "Ressources passives",
        content: "Les ressources passives proviennent notamment des cotisations des membres, droits d'adhésion, dons, contributions volontaires, legs et subventions. Elles sont régulières mais ne doivent pas constituer l'unique mode de financement."
      },
      {
        id: "art-37",
        number: 37,
        title: "Ressources actives",
        content: "L'association peut développer des ressources actives pour renforcer son autonomie financière : placements sécurisés conformes à la loi, et projets générateurs de revenus liés à l'objet (formations, publications, services, compétitions techniques)."
      },
      {
        id: "art-38",
        number: 38,
        title: "Collecte et gestion décentralisée",
        content: "La collecte est répartie à trois niveaux : (1) Cellules de base (cotisations locales) ; (2) Coordination régionale (centralisation régionale) ; (3) BEN (centralisation nationale, redistribution selon les programmes validés). Une traçabilité totale est assurée."
      },
      {
        id: "art-39",
        number: 39,
        title: "Comptes bancaires et signatures",
        content: "Les fonds sont déposés sur des comptes ouverts au nom de l'association. Les signataires mandatés sont le Président, le Vice-Président, le Secrétaire Général et le Trésorier Général. La signature du Président est obligatoire, avec double signature requise du SG ou du Trésorier."
      },
      {
        id: "art-40",
        number: 40,
        title: "Rapport financier et audits",
        content: "Chaque année, le Trésorier Général présente un rapport financier détaillé à l'AG, soumis à un audit interne (comité de contrôle constitué des membres du Bureau Régional) et selon les réglementations en vigueur au Bénin. Les résultats sont rendus publics."
      },
      {
        id: "art-41",
        number: 41,
        title: "Décaissements et investissements",
        content: "Les décaissements du BEN sont limités aux dépenses du budget annuel adopté par l'AG. Tout projet d'investissement actif doit être conforme aux buts, soumis pour validation à l'AG après étude technique, et faire l'objet de rapports périodiques."
      },
      {
        id: "art-42",
        number: 42,
        title: "Outils numériques et plateformes intégrées",
        content: "AEGM – BÉNIN recourt à des solutions numériques pour la gestion administrative, associative et financière, l'organisation de votes/consultations, la collecte de cotisations, la formation continue et la communication, dans le strict respect de la sécurité des données."
      },
      {
        id: "art-43",
        number: 43,
        title: "Des Commissaires aux Comptes",
        content: "Les dispositions concernant le contrôle comptable sont définies ainsi :",
        subsections: [
          "• Désignation et Mission : Contrôler la régularité et sincérité des comptes, présenter un rapport à l'AG ordinaire. Élus pour 3 ans, renouvelables 1 fois.",
          "• Indépendance : Ils agissent en toute indépendance et ne participent pas aux délibérations du BEN ou du Conseil Consultatif en tant que décideurs.",
          "• Communication : Le BEN transmet les documents nécessaires. Les commissaires peuvent exiger des éclaircissements sous 1 mois.",
          "• Signalement : En cas de faits graves, ils informent le Président du BEN et peuvent convoquer une Assemblée Générale extraordinaire."
        ]
      }
    ]
  },
  {
    id: "titre-8",
    title: "Titre VIII : Éligibilité, mandats et responsabilités électives",
    articles: [
      {
        id: "art-44",
        number: 44,
        title: "Critères généraux d'éligibilité",
        content: "Tout membre candidat à un rôle électif doit : être membre actif à jour de cotisations, participer activement depuis au moins un an (sauf membres fondateurs lors de la phase initiale), jouir de ses droits civiques et professionnels, et n'avoir aucune sanction en cours."
      },
      {
        id: "art-45",
        number: 45,
        title: "Membres fondateurs",
        content: "Sont considérés comme membres fondateurs ceux qui ont signé l'acte constitutif du 29 août 2025. Ils bénéficient d'un statut honorifique reconnu à vie et d'un droit de priorité consultative, tout en demeurant soumis aux mêmes règles démocratiques et de gestion."
      },
      {
        id: "art-46",
        number: 46,
        title: "Éligibilité par catégorie professionnelle",
        content: "La répartition des rôles selon le profil professionnel est établie ainsi :",
        subsections: [
          "• FNAE (Fonctionnaire Non Agent de l'État), ACDPE (Agents Contractuels de Droit Public) et FE (Fonctionnaires de l'État) : Éligibles à tous les postes sous réserve d'absence de sanctions.",
          "• Retraités : Éligibles comme personnes-ressources ou conseillers, mais non aux fonctions exécutives directes.",
          "• Proviseurs et Directeurs : Rôle stratégique et consultatif au sein des instances d'orientation afin de préserver leur neutralité administrative."
        ]
      },
      {
        id: "art-47",
        number: 47,
        title: "Conditions spécifiques pour la Présidence et la Vice-Présidence",
        content: "Les candidats doivent avoir déjà exercé une responsabilité dans le BEN afin de justifier d'une expérience de gestion interne préalable. Des exceptions sont admises uniquement en cas de force majeure validée par l'AG."
      },
      {
        id: "art-48",
        number: 48,
        title: "Responsabilités et obligations des élus",
        content: "Les élus ont l'obligation de rendre compte de leur gestion devant l'Assemblée Générale, de garantir une transparence totale, d'être présents de manière active et régulière, et peuvent être révoqués par l'AG en cas de manquement grave."
      },
      {
        id: "art-49",
        number: 49,
        title: "Équilibre, représentation et parité",
        content: "L'association veille à : (1) Une représentation équilibrée des différentes catégories d'enseignants ; (2) La promotion active des femmes aux postes de responsabilité vers une parité progressive ; (3) L'encouragement des jeunes enseignants pour assurer le renouvellement générationnel."
      },
      {
        id: "art-50",
        number: 50,
        title: "Constitution du présidium",
        content: "Le présidium d'élection est composé de trois (3) membres désignés par l'AG. Il est présidé par le doyen d'âge présent (non candidat). Il veille au bon déroulement, à la régularité du dépouillement et proclame les résultats provisoires."
      },
      {
        id: "art-51",
        number: 51,
        title: "Modalités générales de vote",
        content: "Tous les votes se font exclusivement par bulletins secrets déposés dans l'urne, sous la supervision directe du présidium. Le dépouillement est public, assisté de scrutateurs désignés en séance."
      },
      {
        id: "art-52",
        number: 52,
        title: "Proclamation des résultats",
        content: "Les issues possibles du scrutin sont réglementées ainsi :",
        subsections: [
          "• Candidature unique : Le candidat doit recueillir au moins 51% des voix. À défaut, soit il se désiste, soit l'AG ouvre de nouvelles candidatures.",
          "• Candidatures multiples : Est déclaré élu le candidat ayant obtenu la majorité simple des suffrages. En cas d'égalité, un second tour est organisé immédiatement."
        ]
      }
    ]
  },
  {
    id: "titre-9",
    title: "Titre IX : Discipline, Sanctions et Voies de Recours",
    articles: [
      {
        id: "art-53",
        number: 53,
        title: "Principe démocratique et respect des droits",
        content: "Toute procédure disciplinaire est menée dans le respect de l'équité, de la transparence et de la présomption de bonne foi. Les décisions sont prises à la majorité simple du Conseil. Nul ne peut être sanctionné sans possibilité de se défendre."
      },
      {
        id: "art-54",
        number: 54,
        title: "Sanctions disciplinaires",
        content: "Les sanctions applicables selon la gravité de la faute sont : (1) L'avertissement écrit ; (2) Le blâme ; (3) La suspension temporaire des droits de membre (durée fixée) ; (4) La radiation définitive de l'association, prononcée par l'Assemblée Générale."
      },
      {
        id: "art-55",
        number: 55,
        title: "Procédure contradictoire",
        content: "Avant toute sanction, le membre doit recevoir une notification écrite et dispose de 15 jours pour présenter sa défense. La décision doit être motivée. Tout membre sanctionné conserve un droit de recours final devant l'AG."
      },
      {
        id: "art-56",
        number: 56,
        title: "Comité de discipline, médiation et arbitrage",
        content: "Il est institué un comité ad hoc de 5 membres pour arbitrer les litiges internes. Ses membres sont désignés par l'AG/BEN, et le concerné peut y joindre un représentant de son choix. Il vise à privilégier la médiation amiable."
      },
      {
        id: "art-57",
        number: 57,
        title: "Recours à la justice",
        content: "En dernier ressort, et seulement après épuisement complet de toutes les voies de recours internes de l'association, les litiges peuvent être portés devant les juridictions de la République du Bénin territoriales du siège social (Abomey-Calavi/Cotonou)."
      }
    ]
  },
  {
    id: "titre-10",
    title: "Titre X : Modification et dissolution",
    articles: [
      {
        id: "art-58",
        number: 58,
        title: "Modification des statuts",
        content: "Les présents statuts ne peuvent être modifiés que par une AG convoquée à cet effet. La modification requiert la présence d'au moins les deux tiers (2/3) des membres actifs et l'approbation de la majorité des trois quarts (3/4) des voix exprimées."
      },
      {
        id: "art-59",
        number: 59,
        title: "Dissolution",
        content: "La dissolution volontaire de l'association est prononcée par une AG spécialement convoquée, statuant à la majorité des trois quarts (3/4) des membres actifs présents. L'AG décide alors de l'affectation des biens à une œuvre similaire au Bénin."
      },
      {
        id: "art-60",
        number: 60,
        title: "Transfert des archives et des avoirs",
        content: "En cas de dissolution, il est procédé obligatoirement au transfert sécurisé des archives administratives/financières et des avoirs restants à l'organisation bénéficiaire, documenté par un procès-verbal signé par les liquidateurs désignés."
      }
    ]
  },
  {
    id: "titre-11",
    title: "Titre XI : Dispositions finales et transitoires",
    articles: [
      {
        id: "art-61",
        number: 61,
        title: "Adoption et entrée en vigueur",
        content: "Les présents statuts ont été adoptés par l'Assemblée Générale constitutive tenue au Lycée Technique d'Akassato, ce 29 août 2025. Ils entrent en vigueur immédiatement."
      },
      {
        id: "art-62",
        number: 62,
        title: "Règlement intérieur",
        content: "Un règlement intérieur, élaboré par le BEN et adopté par l'AG, précise les modalités d'application des présents statuts. En cas de contradiction, les présents statuts prévalent sur le règlement intérieur."
      },
      {
        id: "art-63",
        number: 63,
        title: "Dispositions transitoires",
        content: "Le BEN élu lors de l'AG constitutive assure la mise en place effective des structures régionales sous 6 mois. À titre exceptionnel, la condition d'ancienneté d'un an pour éligibilité est levée pour la phase initiale de mise en œuvre."
      },
      {
        id: "art-64",
        number: 64,
        title: "Clause de juridiction",
        content: "En cas de conflit interne persistant, la compétence territoriale pour les recours juridiques est attribuée aux tribunaux compétents de la République du Bénin situés dans le ressort territorial du siège social d'Akassato."
      }
    ]
  }
];
