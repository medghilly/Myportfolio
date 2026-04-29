import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Moon, Sun, Menu, X,
  Home, User, FolderKanban, Code2, Clock, Mail
} from 'lucide-react';

const NAV_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  home:     Home,
  about:    User,
  skills:   Code2,
  projects: FolderKanban,
  timeline: Clock,
  contact:  Mail,
};

import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* ── Scroll shadow + active section tracker ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'timeline', 'contact'];
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home',     href: '#home' },
    { key: 'about',    href: '#about' },
    { key: 'skills',   href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'timeline', href: '#timeline' },
    { key: 'contact',  href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* ── Pill / floating navbar ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex items-center gap-1 px-3 py-2 rounded-2xl backdrop-blur-md border transition-all duration-300
          ${scrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 shadow-[0_8px_32px_-4px_hsl(213_52%_13%/0.05)] border-primary/10' 
            : 'bg-white/40 dark:bg-slate-900/40 border-white/20'}`}
      >

        {/* ── Logo MG ── */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-2.5 pr-3 shrink-0 group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl text-white font-black shadow-lg shadow-primary/20 transition-transform group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, hsl(195 100% 45%), hsl(195 100% 35%))' }}>
            MG
          </div>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="flex items-center gap-1 font-bold text-[15px]">
              <span className="text-foreground">Mohamed</span>
              <span className="gradient-text">Ghelli</span>
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase mt-0.5">
              Full Stack Dev
            </span>
          </span>
        </a>

        <div className="hidden md:block w-px h-5 bg-border mx-1 shrink-0" />

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = NAV_ICONS[link.key];
            const isActive = activeSection === link.key;
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary/[12%] text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
              >
                <Icon size={14} />
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            );
          })}
        </div>

        <div className="hidden md:block w-px h-5 bg-border mx-1 shrink-0" />

        {/* ── Controls ── */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-muted-foreground
              hover:text-primary hover:bg-primary/[8%] transition-all duration-200 tracking-wide"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground
              hover:text-primary hover:bg-primary/[8%] transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground
              hover:text-primary hover:bg-primary/[8%] transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white dark:bg-slate-900 border border-primary/[15%] dark:border-primary/20 rounded-2xl shadow-[0_12px_40px_-10px_hsl(213_52%_13%/0.15)] p-3">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const Icon = NAV_ICONS[link.key];
              const isActive = activeSection === link.key;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary/[12%] text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  <Icon size={16} />
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
