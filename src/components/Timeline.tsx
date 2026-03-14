import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Briefcase } from 'lucide-react';

interface TimelineItemProps {
  item: { year: string; title: string; location: string; description: string };
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0;

  const isChinguitel = item.title.toLowerCase().includes('chinguitel');
  const isIscae = item.title.toLowerCase().includes('iscae') || item.title.toLowerCase().includes('licence') || item.title.toLowerCase().includes('bachelor');
  const isLycee = item.title.toLowerCase().includes('baccalauréat') || item.title.toLowerCase().includes('baccalaureate') || item.title.toLowerCase().includes('lycée') || item.title.toLowerCase().includes('excellence');

  const logoSrc = isChinguitel ? '/chinguitel.png' : isIscae ? '/iscae.jpg' : null;
  const siteLink = isChinguitel ? 'https://chinguitel.mr' : isIscae ? 'https://iscae.mr' : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Dot avec pulse */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6 z-10">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full bg-primary/40 transition-all duration-700
            ${isVisible ? 'animate-ping' : 'opacity-0'}`}
            style={{ animationDuration: '2s' }} />
          <div className={`w-4 h-4 rounded-full bg-primary ring-4 ring-background relative
            transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
        </div>
      </div>

      {/* Card */}
      <div className={`flex-1 ml-10 md:ml-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div
          className={`group bg-card rounded-2xl p-6 border border-border
            hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30
            transition-all duration-500 ease-out
            ${isVisible
              ? 'opacity-100 translate-x-0 translate-y-0'
              : isLeft
                ? 'opacity-0 -translate-x-12 translate-y-4'
                : 'opacity-0 translate-x-12 translate-y-4'
            }`}
          style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
        >
          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full
              group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {item.year}
            </span>
            {/* Logo / badge */}
            {logoSrc && siteLink ? (
              <a href={siteLink} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg overflow-hidden border border-border bg-secondary flex items-center justify-center
                  hover:border-primary/50 hover:scale-110 transition-all duration-300"
                title={siteLink}>
                <img src={logoSrc} alt="logo" className="w-full h-full object-cover" />
              </a>
            ) : isLycee ? (
              /* Logo stylisé Excellence 1 */
              <div className="w-8 h-8 rounded-lg border border-border bg-gradient-to-br from-amber-500/20 to-orange-500/20
                flex items-center justify-center group-hover:border-amber-500/50 transition-colors duration-300">
                <span className="text-xs font-black text-amber-500 leading-none">E1</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center">
                <Briefcase className="text-muted-foreground" size={16} />
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-primary mb-2">{item.location}</p>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  );
};

const Timeline = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="timeline"
      className="section-spacing bg-secondary/30 relative overflow-hidden"
    >
      {/* Orbes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/6 rounded-full blur-[90px] animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-[70px] animate-float-slow" style={{ animationDelay: '2.5s' }} />

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.timeline.title}</h2>
          <p className="text-muted-foreground text-lg">{t.timeline.subtitle}</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Ligne animée */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5
            bg-gradient-to-b from-primary/80 via-primary/40 to-transparent
            transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

          <div className="space-y-10">
            {t.timeline.items.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
