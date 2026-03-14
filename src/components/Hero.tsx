import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Download } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.remove('typing-effect');
    void el.offsetWidth;
    el.classList.add('typing-effect');
  }, [t.hero.title]);

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* ── Orbes animés en arrière-plan ── */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 rounded-full
        bg-primary/20 blur-[80px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full
        bg-primary/15 blur-[100px] animate-float-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full
        bg-primary/5 blur-[120px] animate-pulse" />

      {/* ── Grille ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* ── Cercle décoratif rotatif ── */}
      <div className="absolute top-20 right-10 md:right-32 w-24 h-24 opacity-20 animate-rotate-slow">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="45" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="8 4" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-10 md:left-32 w-16 h-16 opacity-15 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="45" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="6 3" />
        </svg>
      </div>

      {/* ── Particules flottantes ── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-float"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${5 + i * 0.7}s`,
          }}
        />
      ))}

      {/* ── Contenu principal ── */}
      <div className="section-container relative z-10 pt-28 px-4">
        <div className="max-w-3xl mx-auto text-center px-4">

          {/* Badge disponible */}
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in animation-delay-100">
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium">
              {/* Pulse ring */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {t.hero.available}
            </span>
          </div>

          {/* Greeting */}
          <p className="text-primary font-semibold text-lg mb-3 opacity-0 animate-fade-up">
            {t.hero.greeting}
          </p>

          {/* Nom */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-4
            opacity-0 animate-fade-up animation-delay-100 tracking-tight">
            {t.hero.name}
          </h1>

          {/* Titre typing */}
          <h2 className="text-base sm:text-2xl md:text-4xl font-bold mb-6
            opacity-0 animate-fade-up animation-delay-200 overflow-hidden flex justify-center"
            style={{ color: 'hsl(217 91% 45%)' }}>
            <span ref={titleRef} className="typing-effect" style={{ borderRightColor: 'hsl(217 91% 45%)' }}>
              {t.hero.title}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-foreground/70 text-sm md:text-lg mb-8
            opacity-0 animate-fade-up animation-delay-300 font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Stats */}
          <div className="flex gap-6 md:gap-10 justify-center mb-10 opacity-0 animate-fade-up animation-delay-400">
            {[
              { value: '6+', label: t.hero.stat_projects },
              { value: '2+', label: t.hero.stat_experience },
              { value: '2', label: t.hero.stat_domains },
            ].map((stat, i) => (
              <div key={i} className="relative text-center group">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300" />
                <p className="text-3xl md:text-4xl font-extrabold text-foreground
                  group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-foreground/60 font-medium mt-0.5">
                  {stat.label}
                </p>
                {i < 2 && <div className="absolute right-[-12px] md:right-[-20px] top-1/2 -translate-y-1/2 w-px h-8 bg-border" />}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4
            opacity-0 animate-fade-up animation-delay-500">
            <button
              onClick={handleScrollToProjects}
              className="relative overflow-hidden group btn-primary flex items-center gap-2 rounded-xl px-7 py-3.5 text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.cta_projects}
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
              {/* Shine effect */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                transition-transform duration-500 bg-white/20 skew-x-12" />
            </button>

            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary flex items-center gap-2 rounded-xl px-7 py-3.5 text-base
                hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              {t.hero.cta_cv}
              <Download size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
        opacity-0 animate-fade-in animation-delay-700">
        <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
