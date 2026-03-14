import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Code, Network, Cog, GraduationCap } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const icons = [Code, Network, Cog, GraduationCap];
  const colors = [
    'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400',
    'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-600 dark:text-violet-400',
    'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-600 dark:text-orange-400',
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      className="section-spacing relative overflow-hidden"
    >
      {/* Orbes */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/6 rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute top-1/4 right-0 w-48 h-48 bg-primary/8 rounded-full blur-[60px] animate-float-slow" style={{ animationDelay: '3s' }} />

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-6 border border-border text-center group
                  overflow-hidden cursor-default
                  transition-all duration-700 ease-out
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
              >
                {/* Shimmer bg on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-primary/5 to-transparent" />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br border flex items-center justify-center mx-auto mb-4
                  group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${colors[index]}`}>
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
