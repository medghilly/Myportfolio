import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ScrollUI = () => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowButton(scrollTop > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] h-0.5 bg-primary transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t.hero.back_to_top}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
          bg-primary text-primary-foreground shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:bg-primary/90 hover:shadow-primary/25 hover:shadow-xl hover:-translate-y-1
          ${showButton
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};

export default ScrollUI;
