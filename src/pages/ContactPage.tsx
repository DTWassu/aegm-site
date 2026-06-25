import { useState, FormEvent } from "react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, HelpCircle, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsLoading(true);
    setErrorMessage("");
    try {
      const { error } = await supabase
        .from("messages_contact")
        .insert([
          {
            nom_complet: name,
            email: email,
            telephone: phone || null,
            objet: subject,
            message: message,
          },
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("general");
      setMessage("");
    } catch (err: any) {
      console.warn("Could not submit contact form message to Supabase:", err);
      let detailMsg = "";
      if (err && typeof err === "object") {
        detailMsg = err.message || JSON.stringify(err);
        if (err.details) detailMsg += ` (${err.details})`;
      }
      setErrorMessage(
        detailMsg 
          ? `Erreur de la base de données : ${detailMsg}`
          : "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ultérieurement."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in pt-24">
      {/* Section Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold font-mono tracking-widest text-brand-blue uppercase mb-3">
            NOUS CONTACTER
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-acier-900 leading-tight">
            Prendre contact avec l'AEGM-BÉNIN
          </h1>
          <p className="mt-4 text-sm sm:text-base text-acier-600 font-light">
            Une question sur les adhésions, les cotisations, les cellules de base ou l'Université de Vacances ? Notre Secrétariat Général vous répond dans les plus brefs délais.
          </p>
          <div className="h-1.5 w-24 bg-brand-blue mx-auto mt-6 rounded" />
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-acier-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-acier-900 mb-6">
                Coordonnées Officielles
              </h3>

              <div className="space-y-6">
                {/* Headquarters */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl flex-shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-mono text-acier-400 uppercase tracking-wider mb-1">
                      Siège Social
                    </span>
                    <span className="block text-sm text-acier-800 font-semibold leading-relaxed font-display">
                      Lycée Technique et Professionnel d'Amitié Sino-Béninoise d'Akassato (ASBA),
                    </span>
                    <span className="block text-xs text-acier-500 mt-1">
                      Département de l'Atlantique, Commune d'Abomey-Calavi, Bénin.
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl flex-shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-mono text-acier-400 uppercase tracking-wider mb-1">
                      Courriel Officiel
                    </span>
                    <a
                      href="mailto:aegmb2025@yahoo.com"
                      className="block text-sm text-brand-blue hover:text-brand-blue-dark font-bold transition-colors break-all"
                    >
                      aegmb2025@yahoo.com
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl flex-shrink-0 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-mono text-acier-400 uppercase tracking-wider mb-1">
                      Téléphones & WhatsApp
                    </span>
                    <a
                      href="tel:+2290197884134"
                      className="block text-sm text-acier-800 font-bold hover:text-brand-blue transition-colors font-mono"
                    >
                      +229 01 97 88 41 34
                    </a>
                    <a
                      href="tel:+2290197737375"
                      className="block text-sm text-acier-800 font-bold hover:text-brand-blue transition-colors font-mono"
                    >
                      +229 01 97 73 73 75
                    </a>
                  </div>
                </div>

                {/* Response rate */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-blue-light text-brand-blue rounded-xl flex-shrink-0 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-mono text-acier-400 uppercase tracking-wider mb-1">
                      Disponibilité Secrétariat
                    </span>
                    <span className="block text-sm text-acier-700 font-light">
                      Lundi au Vendredi (08h00 - 17h30)
                    </span>
                    <span className="block text-[10px] text-brand-blue font-semibold uppercase tracking-wider mt-1">
                      Temps de réponse moyen : ~24h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell Guide info card */}
            <div className="p-6 bg-gradient-to-br from-acier-800 to-acier-900 text-white rounded-2xl shadow-md border border-acier-700">
              <div className="flex items-center space-x-3 mb-3">
                <HelpCircle className="w-5 h-5 text-brand-blue-accent" />
                <h4 className="text-base font-bold font-display">Adhérer à l'Association ?</h4>
              </div>
              <p className="text-xs text-acier-300 leading-relaxed font-light mb-4">
                Les enseignants en construction mécanique et métallique peuvent solliciter leur adhésion en ligne. Les demandes sont initiées auprès des Cellules de Base (BCB) de leur établissement puis transmises au Bureau Régional (BR).
              </p>
              <a
                href="https://acier-connect.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-brand-blue-accent hover:text-brand-blue-soft font-bold transition-all"
              >
                <span>Faire ma demande sur la plateforme ACIER ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-acier-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-acier-900 mb-6">
                Formulaire de correspondance
              </h3>

              {isSubmitted ? (
                <div className="p-8 text-center bg-brand-blue-soft/50 border border-brand-blue/15 rounded-xl space-y-4 animate-fade-in">
                  <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue-light text-brand-blue">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-blue font-display">Votre message a été transmis</h4>
                  <p className="text-xs sm:text-sm text-acier-600 max-w-md mx-auto font-light leading-relaxed">
                    Merci pour votre intérêt ! Le Secrétariat Général ou le chargé de communication de l'AEGM-BÉNIN traitera votre message dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-brand-blue bg-brand-blue-light hover:bg-brand-blue/10 transition-all border border-brand-blue/10"
                  >
                    Envoyer un nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nom Complet */}
                    <div>
                      <label className="block text-xs font-bold text-acier-600 uppercase tracking-wider mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: M. DESSOU Paul"
                        className="w-full px-4 py-3 bg-acier-50 border border-acier-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-acier-600 uppercase tracking-wider mb-1.5">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: paul.dessou@domain.com"
                        className="w-full px-4 py-3 bg-acier-50 border border-acier-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Téléphone */}
                    <div>
                      <label className="block text-xs font-bold text-acier-600 uppercase tracking-wider mb-1.5">
                        Téléphone (avec indicatif)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: +229 01 00 00 00"
                        className="w-full px-4 py-3 bg-acier-50 border border-acier-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* Objet */}
                    <div>
                      <label className="block text-xs font-bold text-acier-600 uppercase tracking-wider mb-1.5">
                        Objet du message
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 bg-acier-50 border border-acier-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                      >
                        <option value="general">Renseignements Généraux</option>
                        <option value="adh">Informations sur l'Adhésion</option>
                        <option value="base">Création d'une Cellule de Base</option>
                        <option value="uv">Université de Vacances (Rencontre)</option>
                        <option value="tech">Support Plateforme ACIER</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-acier-600 uppercase tracking-wider mb-1.5">
                      Votre Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Saisissez ici le contenu de votre message..."
                      className="w-full px-4 py-3 bg-acier-50 border border-acier-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-150 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Transmission en cours...</span>
                      </span>
                    ) : (
                      <>
                        <span>Envoyer mon message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
