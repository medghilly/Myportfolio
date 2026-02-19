import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Download } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLSpanElement>(null);

  // Reset typing animation when language changes
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.remove('typing-effect');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('typing-effect');
  }, [t.hero.title]);

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="section-container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">

          {/* Availability badge */}
          <div className="flex justify-center mb-5 opacity-0 animate-fade-in animation-delay-100">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.hero.available}
            </span>
          </div>

          {/* Greeting */}
          <p className="text-primary font-semibold text-lg mb-4 opacity-0 animate-fade-up">
            {t.hero.greeting}
          </p>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-4 opacity-0 animate-fade-up animation-delay-100 tracking-tight">
            {t.hero.name}
          </h1>

          {/* Title with typing effect */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-up animation-delay-200 overflow-hidden flex justify-center" style={{ color: 'hsl(217 91% 45%)' }}>
            <span ref={titleRef} className="typing-effect" style={{ borderRightColor: 'hsl(217 91% 45%)' }}>
              {t.hero.title}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-foreground/70 text-lg mb-8 opacity-0 animate-fade-up animation-delay-300 font-medium">
            {t.hero.subtitle}
          </p>

          {/* Animated stats */}
          <div className="flex gap-8 justify-center mb-10 opacity-0 animate-fade-up animation-delay-400">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-foreground">3+</p>
              <p className="text-sm text-foreground/60 font-medium mt-0.5">{t.hero.stat_projects}</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-foreground">2+</p>
              <p className="text-sm text-foreground/60 font-medium mt-0.5">{t.hero.stat_experience}</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-foreground">2</p>
              <p className="text-sm text-foreground/60 font-medium mt-0.5">{t.hero.stat_domains}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-500">
            <button onClick={handleScrollToProjects} className="btn-primary flex items-center gap-2">
              {t.hero.cta_projects}
              <ArrowDown size={18} />
            </button>
            <a href="#" className="btn-secondary flex items-center gap-2">
              {t.hero.cta_cv}
              <Download size={18} />
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted-foreground" size={24} />
      </div>
    </section>
  );
};

export default Hero;
