import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'services', href: '#services' },
    { key: 'timeline', href: '#timeline' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">

      {/* ── Pill navbar ── */}
      <nav className={`flex items-center gap-1 px-3 py-1.5 rounded-full
        border border-border bg-background/95 backdrop-blur-xl
        shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>

        {/* Logo — visible on all screens */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-base
            hover:bg-secondary transition-all duration-200 shrink-0"
        >
          <span className="text-foreground">Mohamed</span>
          <span className="gradient-text">Ghelli</span>
        </a>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-border mx-1 shrink-0" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-3 py-1.5 rounded-full text-sm text-muted-foreground
                hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </a>
          ))}
        </div>

        {/* Divider right */}
        <div className="hidden md:block w-px h-5 bg-border mx-1 shrink-0" />

        {/* Controls */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground
              hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground
              hover:text-foreground hover:bg-secondary transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-muted-foreground
              hover:bg-secondary transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[4.5rem] left-4 right-4
          bg-background/98 backdrop-blur-xl border border-border rounded-2xl
          shadow-2xl p-3 animate-fade-in">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground
                  hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
