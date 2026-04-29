import { useLanguage } from '@/contexts/LanguageContext';
import { GithubIcon, Linkedin, Mail, MessageCircle, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();

  const socialLinks = [
    { icon: GithubIcon,    href: 'https://github.com/medghilly',                    label: 'GitHub' },
    { icon: Linkedin,      href: 'https://www.linkedin.com/in/muhamed-ghilly',       label: 'LinkedIn' },
    { icon: Mail,          href: 'mailto:mohamed.ghelli.elbou@gmail.com',            label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/22246071882',                        label: 'WhatsApp' },
  ];

  return (
    <footer className="section-container pb-10 pt-10 relative">
      {/* Orbe décoratif en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 card-blue p-8 md:px-12 md:py-10 rounded-[2.5rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-primary/10 shadow-xl overflow-hidden group">
        
        {/* Glow effect on hover card */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[3%] to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT: Identity & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl text-white font-black text-lg shadow-lg shadow-primary/20 transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg, hsl(195 100% 45%), hsl(195 100% 35%))' }}>
                MG
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-foreground tracking-tight">
                   Mohamed <span className="gradient-text">Ghelli</span>
                </h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-70">
                   Full Stack Developer
                </p>
              </div>
            </div>

            {/* Social Pill Buttons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/60 hover:border-primary/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                    title={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Copyright & Stack */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <div className="space-y-1">
              <h4 className="text-lg font-black text-foreground tracking-tight">Mohamed Ghelli</h4>
              <p className="text-sm text-muted-foreground font-medium opacity-80">
                © {new Date().getFullYear()} Mohamed Ghelli. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center md:justify-end gap-2 text-xs font-bold text-muted-foreground/60">
                <Code2 size={14} className="text-primary/50" />
                Built with Vite & React
              </div>
              <div className="flex items-center md:justify-end gap-2 text-xs font-bold text-muted-foreground/60">
                {language === 'fr' ? 'Fait avec' : 'Made with'}
                <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Sub-footer metadata (optional) */}
      <div className="mt-8 text-center">
         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-colors duration-300"
         >
           Back to Top
         </button>
      </div>
    </footer>
  );
};

export default Footer;
