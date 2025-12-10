import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

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
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* Photo professionnelle - Left side */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative group">
              {/* Decorative gradient background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

              {/* Image container */}
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center relative">
                  {/* Light mode - image with white background */}
                  <div className="absolute inset-0 bg-white dark:hidden" />
                  <img
                    src="/profile.png"
                    alt={t.hero.name}
                    className="h-[180%] w-auto object-cover object-[center_20%] relative z-10 dark:hidden"
                  />

                  {/* Dark mode - image without background + gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background hidden dark:block" />
                  <img
                    src="/profile-dark.png"
                    alt={t.hero.name}
                    className="h-[180%] w-auto object-contain object-[center_20%] relative z-10 hidden dark:block"
                  />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/20 rounded-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-primary/10 rounded-xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* Text content - Right side */}
          <div className="text-center lg:text-left order-2 lg:order-2">
            {/* Greeting */}
            <p className="text-primary font-medium mb-4 opacity-0 animate-fade-up">
              {t.hero.greeting}
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 opacity-0 animate-fade-up animation-delay-100">
              {t.hero.name}
            </h1>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6 opacity-0 animate-fade-up animation-delay-200">
              {t.hero.title}
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg mb-10 opacity-0 animate-fade-up animation-delay-300">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 opacity-0 animate-fade-up animation-delay-400">
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted-foreground" size={24} />
      </div>
    </section>
  );
};

export default Hero;
