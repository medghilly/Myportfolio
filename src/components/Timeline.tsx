import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, GraduationCap } from 'lucide-react';

const Timeline = () => {
  const { t } = useLanguage();

  return (
    <section id="timeline" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.timeline.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.timeline.subtitle}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          <div className="space-y-8">
            {t.timeline.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isEducation = item.title.toLowerCase().includes('licence') || 
                                  item.title.toLowerCase().includes('bachelor') ||
                                  item.title.toLowerCase().includes('baccalauréat') ||
                                  item.title.toLowerCase().includes('baccalaureate');
              const Icon = isEducation ? GraduationCap : Briefcase;

              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background -translate-x-1/2 mt-6 z-10" />

                  {/* Content */}
                  <div
                    className={`flex-1 ml-10 md:ml-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="bg-card rounded-2xl p-6 card-hover border border-border">
                      <div className={`flex items-center gap-3 mb-2 ${
                        isLeft ? 'md:flex-row-reverse' : ''
                      }`}>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="text-muted-foreground" size={16} />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-primary mb-2">
                        {item.location}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
