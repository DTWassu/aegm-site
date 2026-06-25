import { useState, useEffect } from "react";
import { ShieldCheck, Cpu } from "lucide-react";

interface RedirectTransitionProps {
  targetUrl: string;
}

export default function RedirectTransition({ targetUrl }: RedirectTransitionProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Initialisation de la liaison avec ACIER Connect...",
    "Vérification du certificat de sécurité...",
    "Établissement du canal chiffré...",
    "Ouverture de votre portail applicatif...",
  ];

  useEffect(() => {
    // Increment loading steps
    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);

    // Smoothly increment progress bar to 100% over 1800ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-acier-950 text-white flex flex-col items-center justify-center p-6 animate-fade-in select-none">
      {/* Background dynamic ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
      <div className="absolute inset-0 bg-gradient-to-t from-acier-950 via-acier-950/90 to-transparent" />

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        
        {/* Animated Interlocking Gears Visual */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Large Gear (Clockwise) */}
          <div className="absolute -top-1 -left-1 text-brand-blue-accent/30 animate-[spin_10s_linear_infinite]">
            <svg
              className="w-20 h-20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>

          {/* Medium Gear (Counter-Clockwise, interlocking) */}
          <div className="absolute -bottom-1 -right-1 text-white/80 animate-[spin_6s_linear_infinite_reverse]">
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>

          {/* Core Central Icon with pulse effect */}
          <div className="absolute flex items-center justify-center w-12 h-12 bg-brand-blue rounded-xl shadow-lg border border-white/20 animate-pulse">
            <Cpu className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-[10px] font-bold font-mono text-brand-blue-accent uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Redirection Sécurisée</span>
          </span>
          
          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            Connexion à ACIER Connect
          </h2>
          
          <p className="text-xs text-acier-400 max-w-xs mx-auto font-light leading-relaxed">
            Vous quittez le site d'information pour vous connecter à l'espace de gestion et de formation.
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full space-y-2 pt-2">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-accent transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-acier-500">
            <span>PROGRES</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Staggered Status Messages */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-xs font-mono font-medium text-brand-blue-accent/90 animate-pulse">
            {steps[step]}
          </p>
        </div>
      </div>
    </div>
  );
}
