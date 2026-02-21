import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin, Mail, MessageCircle, MapPin, GraduationCap, Clock } from 'lucide-react';
// Note: Github/Linkedin deprecation hints are cosmetic only — icons still work

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/medghilly', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhamed-ghilly', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/22246071882', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:mohamed.ghelli.elbou@gmail.com', label: 'Email' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const now = new Date();
  const time = now.toLocaleTimeString(t === (t as typeof t) ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Riyadh',
  });

  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-4 gap-8">

          {/* Logo & info */}
          <div className="sm:col-span-1">
            <a href="#home" className="text-xl font-bold text-foreground mb-3 inline-block">
              M. Ghelli
            </a>
            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>Nouakchott, Mauritanie</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap size={14} className="text-primary shrink-0" />
                <span>ISCAE — L3 Réseaux</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={14} className="text-primary shrink-0" />
                <span>GMT+3 · {time}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mt-4">
              © {new Date().getFullYear()} Mohamed Ghelli. {t.footer.rights}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t.footer.quick_links}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:mohamed.ghelli.elbou@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                >
                  mohamed.ghelli.elbou@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/22246071882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +222 46 07 18 82
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Social</h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
