import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.about.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 card-hover border border-border">
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-xl bg-primary/10 items-center justify-center">
                <User className="text-primary" size={28} />
              </div>
              <div>
                <p className="text-foreground leading-relaxed text-lg">
                  {t.about.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
