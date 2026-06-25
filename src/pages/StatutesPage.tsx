import { useState, useMemo } from "react";
import { Search, Book, HelpCircle, FileText, Download, ChevronRight, Check } from "lucide-react";
import { STATUTS_SECTIONS, PREAMBULE_TEXT, Article, TitleSection } from "../data/statuts";
import { jsPDF } from "jspdf";

export default function StatutesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState<string>("all");
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});

  const filteredSections = useMemo(() => {
    let result = STATUTS_SECTIONS;

    // Filter by Selected Title
    if (selectedTitleId !== "all") {
      result = result.filter((sec) => sec.id === selectedTitleId);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result
        .map((sec) => {
          const matchedArticles = sec.articles.filter(
            (art) =>
              art.title.toLowerCase().includes(query) ||
              art.content.toLowerCase().includes(query) ||
              art.number.toString() === query ||
              (art.subsections && art.subsections.some((sub) => sub.toLowerCase().includes(query)))
          );
          return {
            ...sec,
            articles: matchedArticles,
          };
        })
        .filter((sec) => sec.articles.length > 0);
    }

    return result;
  }, [selectedTitleId, searchQuery]);

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownloadPlaintext = () => {
    let text = `ASSOCIATION DES ENSEIGNANTS DE GÉNIE MÉCANIQUE DU BÉNIN (AEGM-BÉNIN)\n`;
    text += `STATUTS JURIDIQUES OFFICIELS - ADOPTÉS LE 29 AOÛT 2025\n\n`;
    text += `PREAMBULE :\n${PREAMBULE_TEXT}\n\n`;

    STATUTS_SECTIONS.forEach((section) => {
      text += `\n==================================================\n`;
      text += `${section.title.toUpperCase()}\n`;
      text += `==================================================\n`;
      section.articles.forEach((art) => {
        text += `\nArticle ${art.number} : ${art.title}\n`;
        text += `${art.content}\n`;
        if (art.subsections && art.subsections.length > 0) {
          art.subsections.forEach((sub) => {
            text += `  - ${sub}\n`;
          });
        }
      });
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AEGM_BENIN_Statuts_Officiels_2025.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const marginX = 20;
    const contentWidth = 170; // 210 - 2 * 20
    let y = 20;

    // Colors (RGB)
    const brandBlue = [21, 96, 189]; // #1560BD (Steel Blue / Bleu Acier)
    const brandAmber = [217, 119, 6]; // #d97706 (Amber / Ambre)
    const textDark = [33, 43, 54]; // #212b36 (Dark Slate)
    const textMuted = [110, 120, 130]; // #6e7882 (Muted Gray)

    const checkPageSpace = (heightNeeded: number) => {
      if (y + heightNeeded > 272) {
        doc.addPage();
        y = 25; // Reset y for the new page
      }
    };

    const drawParagraph = (textStr: string, fontSize = 10, fontStyle = "normal", color = textDark, align: "left" | "justify" = "justify") => {
      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      const lineHeight = fontSize * 0.45; // mm per line height estimation
      const lines = doc.splitTextToSize(textStr, contentWidth);
      const textHeight = lines.length * lineHeight;
      
      checkPageSpace(textHeight + 2);
      doc.text(lines, marginX, y, { align: align === "justify" ? "justify" : "left", maxWidth: contentWidth });
      y += textHeight + 4; // Spacing after paragraph
    };

    // --- 1. COVER PAGE / HEADERS ---
    // Republican Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("RÉPUBLIQUE DU BÉNIN", 105, y, { align: "center" });
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text("MINISTÈRE DES ENSEIGNEMENTS SECONDAIRE, TECHNIQUE ET DE LA FORMATION PROFESSIONNELLE", 105, y, { align: "center", maxWidth: 160 });
    y += 8;

    // Beautiful Flag colored bands representing the Flag of Benin
    const flagY = y;
    doc.setLineWidth(1.5);
    doc.setDrawColor(34, 139, 34); // Green
    doc.line(85, flagY, 98, flagY);
    doc.setDrawColor(255, 215, 0); // Yellow
    doc.line(98, flagY, 112, flagY);
    doc.setDrawColor(220, 20, 60); // Red
    doc.line(112, flagY, 125, flagY);
    y += 10;

    // Main Logo Frame / Association Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text("ASSOCIATION DES ENSEIGNANTS DE GÉNIE MÉCANIQUE\nDU BÉNIN", 105, y, { align: "center", maxWidth: 160 });
    y += 15;

    // Sleek Acronym
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(brandAmber[0], brandAmber[1], brandAmber[2]);
    doc.text("« AEGM-BÉNIN »", 105, y, { align: "center" });
    y += 8;

    // Slogan in Italic
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text("Slogan : « Solides comme l'ACIER, unis pour la mécanique »", 105, y, { align: "center" });
    y += 14;

    // Nice separator frame
    doc.setLineWidth(0.5);
    doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 12;

    // Big Bold Title of Document
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text("STATUTS JURIDIQUES", 105, y, { align: "center" });
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(brandAmber[0], brandAmber[1], brandAmber[2]);
    doc.text("VERSION OFFICIELLE ET CERTIFIÉE", 105, y, { align: "center" });
    y += 12;

    // Details/Metas at bottom of cover
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("Adoptés lors du Congrès Constitutif d'Akassato", 105, y, { align: "center" });
    y += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text("En date du 29 Août 2025", 105, y, { align: "center" });
    y += 5;
    doc.text("Lieu d'adoption : Lycée Technique d'Akassato (ASBA), Bénin", 105, y, { align: "center" });
    y += 18;

    // Stamp graphic / certified sign
    doc.setLineWidth(0.4);
    doc.setDrawColor(brandAmber[0], brandAmber[1], brandAmber[2]);
    doc.rect(75, y, 60, 16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(brandAmber[0], brandAmber[1], brandAmber[2]);
    doc.text("ACTE CONSTITUTIF CERTIFIÉ", 105, y + 6, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("ARCHIVES NATIONALES AEGM", 105, y + 11, { align: "center" });

    // Move to page 2 for the actual content
    doc.addPage();
    y = 25;

    // --- 2. PREAMBLE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text("PRÉAMBULE", marginX, y);
    y += 4;

    // Line under title
    doc.setLineWidth(0.8);
    doc.setDrawColor(brandAmber[0], brandAmber[1], brandAmber[2]);
    doc.line(marginX, y, marginX + 30, y);
    y += 8;

    const paragraphs = PREAMBULE_TEXT.split("\n\n");
    paragraphs.forEach((p) => {
      drawParagraph(p.trim(), 9.5, "normal", textDark, "justify");
    });
    y += 4;

    // --- 3. SECTIONS & ARTICLES ---
    STATUTS_SECTIONS.forEach((section) => {
      checkPageSpace(25);
      y += 4;

      // Draw Section Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
      const titleLines = doc.splitTextToSize(section.title.toUpperCase(), contentWidth);
      doc.text(titleLines, marginX, y);
      y += (titleLines.length * 5) + 2;

      // Accent colored line for Section Title
      doc.setLineWidth(0.4);
      doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 6;

      section.articles.forEach((art) => {
        checkPageSpace(18);

        // Article Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(brandAmber[0], brandAmber[1], brandAmber[2]);
        doc.text(`Article ${art.number} : ${art.title}`, marginX, y);
        y += 5;

        // Article Main text
        drawParagraph(art.content, 9, "normal", textDark, "justify");

        // Subsections
        if (art.subsections && art.subsections.length > 0) {
          art.subsections.forEach((sub) => {
            checkPageSpace(12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
            doc.text("•", marginX + 4, y);

            doc.setFont("helvetica", "normal");
            doc.setTextColor(textDark[0], textDark[1], textDark[2]);
            const subLines = doc.splitTextToSize(sub, contentWidth - 8);
            doc.text(subLines, marginX + 8, y);
            y += (subLines.length * 4.2) + 2.5;
          });
          y += 1.5;
        }
      });
      y += 3; // Space between sections
    });

    // --- 4. SIGNATURE FOOTNOTE / ENDPAGE ---
    checkPageSpace(50);
    y += 6;
    doc.setLineWidth(0.4);
    doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("Fait à Akassato, le 29 Août 2025", marginX, y);
    y += 5;
    doc.text("Pour l'Assemblée Générale Constitutive de l'AEGM-BÉNIN", marginX, y);
    y += 8;

    const colWidth = contentWidth / 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text("Le Président de Séance,", marginX + 5, y);
    doc.text("Le Secrétaire de Séance,", marginX + colWidth + 5, y);
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("M. Augustin NASSARA", marginX + 5, y);
    doc.text("M. Rufin ATINKPAHOUN", marginX + colWidth + 5, y);
    y += 10;

    // --- 5. PAGE-BY-PAGE HEADERS & FOOTERS ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      if (i > 1) {
        // Top Header
        doc.setFont("helvetica", "italic");
        doc.setFontSize(7.5);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text("AEGM-BÉNIN — Statuts Officiels (Adoptés le 29 Août 2025)", marginX, 12);

        doc.setLineWidth(0.15);
        doc.setDrawColor(210, 215, 220);
        doc.line(marginX, 14, marginX + contentWidth, 14);

        // Bottom Footer line
        doc.line(marginX, 282, marginX + contentWidth, 282);

        // Bottom Footer Content
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.text("Slogan : « Solides comme l'ACIER, unis pour la mécanique »", marginX, 286);
        doc.text(`Page ${i} sur ${pageCount}`, marginX + contentWidth, 286, { align: "right" });
      } else {
        // Small elegant note on cover page bottom
        doc.setLineWidth(0.15);
        doc.setDrawColor(210, 215, 220);
        doc.line(marginX, 282, marginX + contentWidth, 282);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text("Association des Enseignants de Génie Mécanique du Bénin", marginX, 286);
        doc.text("Document Officiel — AEGM-BÉNIN 2025", marginX + contentWidth, 286, { align: "right" });
      }
    }

    doc.save("AEGM_BENIN_Statuts_Officiels_2025.pdf");
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in pt-24">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-bold font-mono tracking-widest text-brand-blue uppercase mb-3">
            TEXTES FONDATEURS
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-acier-900 leading-tight">
            Statuts Officiels de l'AEGM-BÉNIN
          </h1>
          <p className="mt-4 text-sm sm:text-base text-acier-600 font-light">
            Adoptés le 29 Août 2025 lors de l'Assemblée Générale Constitutive d'Akassato.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-dark font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Télécharger les Statuts (.PDF)</span>
            </button>
            
            <button
              onClick={handleDownloadPlaintext}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white border border-acier-200 text-acier-700 hover:text-brand-blue hover:border-brand-blue/30 font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Download className="w-4 h-4 text-acier-400" />
              <span>Format Brut (.TXT)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Preamble Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-brand-blue/15 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-acier-100">
            <div className="p-2.5 bg-brand-blue-light text-brand-blue rounded-lg">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-acier-900">Le Préambule Constitutionnel</h3>
              <p className="text-xs text-acier-500 font-light font-mono">Filiation historique & Slogan</p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-acier-700 leading-relaxed font-light whitespace-pre-line bg-brand-blue-soft/30 p-5 rounded-xl border border-brand-blue-soft/50 text-justify">
            {PREAMBULE_TEXT}
          </p>
        </div>
      </section>

      {/* Interactive Explorer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Search Box */}
            <div className="bg-white p-5 rounded-2xl border border-acier-200 shadow-sm space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-acier-500 font-mono">
                Rechercher un article
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-acier-400" />
                <input
                  type="text"
                  placeholder="Ex: Art 13, adhésion, ACIER..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-acier-50 text-sm border border-acier-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            {/* Quick Title Filter */}
            <div className="bg-white p-5 rounded-2xl border border-acier-200 shadow-sm space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-acier-500 font-mono">
                Filtrer par Titre
              </span>
              <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedTitleId("all")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    selectedTitleId === "all"
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-acier-50 text-acier-700 hover:bg-acier-100"
                  }`}
                >
                  <span>Tous les titres</span>
                  {selectedTitleId === "all" && <Check className="w-3.5 h-3.5" />}
                </button>
                {STATUTS_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedTitleId(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      selectedTitleId === sec.id
                        ? "bg-brand-blue text-white shadow-sm"
                        : "bg-acier-50 text-acier-700 hover:bg-acier-100"
                    }`}
                  >
                    <span className="truncate max-w-[240px]">{sec.title}</span>
                    {selectedTitleId === sec.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Listing Content */}
          <div className="lg:col-span-8 space-y-8">
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-2xl border border-acier-200 p-12 text-center space-y-4">
                <HelpCircle className="w-12 h-12 text-brand-blue mx-auto opacity-60" />
                <h3 className="text-lg font-bold font-display text-acier-900">Aucun article trouvé</h3>
                <p className="text-sm text-acier-500 max-w-md mx-auto font-light">
                  Aucun article ne correspond à votre recherche « {searchQuery} ». Réessayez en simplifiant votre requête ou en sélectionnant un titre différent.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTitleId("all");
                  }}
                  className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-brand-blue-dark transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <div key={sec.id} className="space-y-4">
                  <h3 className="text-sm font-bold font-mono tracking-wider text-brand-blue uppercase px-1">
                    {sec.title}
                  </h3>

                  <div className="space-y-4">
                    {sec.articles.map((art) => (
                      <div
                        key={art.id}
                        className="bg-white rounded-xl border border-acier-200 shadow-sm overflow-hidden hover:border-brand-blue/20 transition-all"
                      >
                        {/* Article Header click to toggle */}
                        <button
                          onClick={() => toggleArticle(art.id)}
                          className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-acier-50/50 transition-colors cursor-pointer"
                        >
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-0.5 rounded bg-brand-blue-light text-brand-blue text-xs font-bold font-mono">
                              Article {art.number}
                            </span>
                            <h4 className="text-base font-bold font-display text-acier-900 pt-1">
                              {art.title}
                            </h4>
                          </div>
                          <span
                            className={`p-1.5 rounded-lg bg-acier-100 text-acier-500 transition-transform duration-200 ${
                              expandedArticles[art.id] ? "rotate-90 text-brand-blue bg-brand-blue-light" : ""
                            }`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </button>

                        {/* Article Content */}
                        {expandedArticles[art.id] === true && (
                          <div className="px-5 pb-5 pt-1 border-t border-acier-100 text-sm text-acier-700 leading-relaxed space-y-4 font-light">
                            <p className="whitespace-pre-line text-justify">{art.content}</p>
                            {art.subsections && art.subsections.length > 0 && (
                              <div className="bg-acier-50 p-4 rounded-lg space-y-3 border border-acier-100">
                                {art.subsections.map((sub, sIdx) => (
                                  <div key={sIdx} className="flex items-start space-x-2.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                                    <p className="text-xs text-acier-800 leading-relaxed font-light text-justify">{sub}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
