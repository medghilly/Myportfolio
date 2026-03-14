import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const About = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="section-spacing bg-secondary/30 relative overflow-hidden"
    >
      {/* Orbes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/6 rounded-full blur-[60px] animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.about.title}</h2>
          <p className="text-muted-foreground text-lg">{t.about.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-card rounded-2xl p-8 md:p-12 card-hover border border-border
            transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

              {/* Photo */}
              <div className="shrink-0 flex justify-center">
                <div className="relative group">
                  {/* Glow */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  {/* Pulse ring */}
                  <div className="absolute -inset-2 rounded-2xl border border-primary/20 animate-pulse-ring" />
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl
                    group-hover:scale-105 group-hover:border-primary/40 transition-all duration-500 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white dark:hidden" />
                    <img src="/profile.png" alt={t.hero.name}
                      className="h-[180%] w-auto object-cover object-[center_20%] relative z-10 dark:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background hidden dark:block" />
                    <img src="/profile-dark.png" alt={t.hero.name}
                      className="h-[180%] w-auto object-contain object-[center_20%] relative z-10 hidden dark:block" />
                  </div>
                  {/* Decorative squares */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary/20 rounded-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary/10 rounded-lg transform -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
                </div>
              </div>

              {/* Text */}
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <p className="text-foreground leading-relaxed text-lg">{t.about.content}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
