import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Code2, Network, Smartphone, CheckCircle2 } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const techHighlights = [
    'Next.js / React',
    'Flutter / Mobile',
    'Supabase / Backend',
    'Network Security',
    'Dolibarr ERP',
    'Infrastructure IT'
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="section-spacing relative overflow-hidden bg-background"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-blue opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-[90px] animate-float" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div 
            className={`transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            {/* Header style consistent with Projects */}
            <div className="mb-8">
              <h2 className="text-[clamp(2.2rem,7vw,3.5rem)] font-bold text-foreground mb-2 tracking-tight">
                {t.about.title}
              </h2>
              <div className="flex gap-1 mb-4">
                <span className="block h-1 w-10 rounded-full bg-primary" />
                <span className="block h-1 w-4 rounded-full bg-primary/40" />
              </div>
              <p className="text-primary font-semibold text-lg mb-6 leading-tight">
                {t.about.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.about.content}
              </p>
              
              <div className="pt-4">
                <p className="text-foreground font-medium mb-4">
                  {t.about.description_roles}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {techHighlights.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 text-muted-foreground group">
                      <CheckCircle2 size={16} className="text-primary transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="grid grid-cols-1 gap-6">
            {/* Full Stack Card */}
            <div 
              className={`group p-6 rounded-2xl bg-white/50 dark:bg-card/50 backdrop-blur-sm
                border border-primary/10 hover:border-primary/30 
                shadow-[0_4px_20px_-4px_rgba(0,171,228,0.08)] 
                hover:shadow-[0_12px_40px_-12px_rgba(0,171,228,0.15)]
                transition-all duration-500 hover:-translate-y-2
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-1">{t.about.roles.fullstack}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Building robust and scalable web applications using React, Next.js, and Node.js.
                  </p>
                </div>
              </div>
            </div>

            {/* Network Card */}
            <div 
              className={`group p-6 rounded-2xl bg-white/50 dark:bg-card/50 backdrop-blur-sm
                border border-primary/10 hover:border-primary/30 
                shadow-[0_4px_20px_-4px_rgba(0,171,228,0.08)] 
                hover:shadow-[0_12px_40px_-12px_rgba(0,171,228,0.15)]
                transition-all duration-500 hover:-translate-y-2
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Network size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-1">{t.about.roles.network}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Designing and securing high-performance network infrastructures and telecommunication systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Card */}
            <div 
              className={`group p-6 rounded-2xl bg-white/50 dark:bg-card/50 backdrop-blur-sm
                border border-primary/10 hover:border-primary/30 
                shadow-[0_4px_20px_-4px_rgba(0,171,228,0.08)] 
                hover:shadow-[0_12px_40px_-12px_rgba(0,171,228,0.15)]
                transition-all duration-500 hover:-translate-y-2
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-1">{t.about.roles.mobile}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Crafting seamless cross-platform mobile experiences with Flutter and Supabase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
