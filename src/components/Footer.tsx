import { useLanguage } from '@/contexts/LanguageContext';
import { GithubIcon, Linkedin, Mail, MessageCircle, MapPin, GraduationCap, Clock, ArrowUp } from 'lucide-react';

import { useState, useEffect } from 'react';

const Footer = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nouakchott' })
  );

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nouakchott' }));
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const quickLinks = [
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'services', href: '#services' },
    { key: 'timeline', href: '#timeline' },
  ];

  const socialLinks = [
    { icon: GithubIcon, href: 'https://github.com/medghilly', label: 'GitHub', color: 'hover:bg-gray-700 hover:text-white' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhamed-ghilly', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
    { icon: MessageCircle, href: 'https://wa.me/22246071882', label: 'WhatsApp', color: 'hover:bg-green-500 hover:text-white' },
    { icon: Mail, href: 'mailto:mohamed.ghelli.elbou@gmail.com', label: 'Email', color: 'hover:bg-primary hover:text-white' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Orbe décoratif */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-[60px]" />

      <div className="section-container relative z-10 py-14">

        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Col 1 — Identité + nom */}
          <div>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="inline-flex items-center gap-1 text-xl font-bold mb-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-foreground">Mohamed</span>
              <span className="gradient-text">Ghelli</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Étudiant en Réseaux & Développeur Full Stack passionné.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
              {t.footer.quick_links}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1
                      transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                    {t.nav[link.key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Social */}
          <div>
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
              Social
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                      bg-secondary text-muted-foreground border border-border
                      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${link.color}`}
                  >
                    <Icon size={15} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Barre du bas ── */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Infos gauche */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-primary" />
              Nouakchott, Mauritanie
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <GraduationCap size={11} className="text-primary" />
              ISCAE — L3 Réseaux
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-primary" />
              GMT+0 · {time}
            </span>
          </div>

          {/* Copyright + retour */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mohamed Ghelli
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
