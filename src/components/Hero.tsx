import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowRight, Github, Linkedin, Mail, Download, 
  Sparkles, ExternalLink, MessageCircle, Code2, Rocket
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

const Hero = () => {
  const { t } = useLanguage();
  const [titleIdx, setTitleIdx] = React.useState(0);
  const [cvMenuOpen, setCvMenuOpen] = React.useState(false);
  const cvMenuRef = React.useRef<HTMLDivElement | null>(null);
  const titles = [t.hero.title, "Full Stack Developer", "Networks & Systems Student"];

  React.useEffect(() => {
    if (!cvMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) {
        setCvMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCvMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [cvMenuOpen]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [titles.length]);

  const magneticProjects = useMagnetic(0.35);
  const magneticContact = useMagnetic(0.35);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* ── BACKGROUND ELEMENTS ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-blue opacity-20 pointer-events-none" />
        
        {/* Interactive Mouse Follow Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.1), transparent 80%)`
          }}
        />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '2s' }} />
        
        {/* New dynamic mesh orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: CONTENT ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start order-2 lg:order-1"
          >
            
            {/* Status Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                {t.hero.status || 'Disponible pour nouveaux projets'}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-foreground mb-4 tracking-tighter leading-[0.95]"
            >
              <span className="block opacity-60 font-medium text-[0.4em] tracking-[0.2em] uppercase mb-2">
                {t.hero.greeting}
              </span>
              <span className="block">{t.hero.name_first}</span>
              <span className="gradient-text">{t.hero.name_last}</span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="h-[1.5em] mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl font-bold text-primary leading-tight"
                >
                  {titles[titleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed opacity-80"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.div ref={magneticProjects.ref} style={magneticProjects.style}>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="group relative flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Rocket size={20} className="relative z-10" />
                  <span className="relative z-10">{t.hero.cta_projects}</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.div ref={magneticContact.ref} style={magneticContact.style}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-foreground font-bold rounded-2xl border border-border hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Mail size={20} className="text-primary group-hover:rotate-12 transition-transform" />
                  {t.hero.cta_contact}
                </button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-6"
            >
               <a href="https://github.com/medghilly" target="_blank" rel="noopener noreferrer" className="social-link-blue group">
                  <Github size={22} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GitHub</span>
               </a>
               <a href="https://linkedin.com/in/medghilly" target="_blank" rel="noopener noreferrer" className="social-link-blue group">
                  <Linkedin size={22} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LinkedIn</span>
               </a>
               <a href="mailto:medghilly@gmail.com" className="social-link-blue group">
                  <Mail size={22} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Email</span>
               </a>
               <div className="w-12 h-px bg-border/50 mx-2" />
               <div className="relative" ref={cvMenuRef}>
                 <button
                   type="button"
                   onClick={() => setCvMenuOpen((v) => !v)}
                   aria-haspopup="menu"
                   aria-expanded={cvMenuOpen}
                   className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                 >
                   <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                   {t.hero.cta_cv}
                 </button>

                 <AnimatePresence>
                   {cvMenuOpen && (
                     <motion.div
                       initial={{ opacity: 0, y: 8, scale: 0.96 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 8, scale: 0.96 }}
                       transition={{ duration: 0.18, ease: "easeOut" }}
                       role="menu"
                       className="absolute left-0 bottom-full mb-3 z-30 min-w-[220px] p-2 rounded-2xl border border-border bg-white dark:bg-slate-900 shadow-2xl shadow-primary/10"
                     >
                       <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                         {t.hero.cv_choose}
                       </p>
                       <a
                         href="/CV.pdf"
                         target="_blank"
                         rel="noopener noreferrer"
                         onClick={() => setCvMenuOpen(false)}
                         role="menuitem"
                         className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                       >
                         <span className="text-lg leading-none" aria-hidden>🇫🇷</span>
                         {t.hero.cv_french}
                       </a>
                       <a
                         href="/CV_en.pdf"
                         target="_blank"
                         rel="noopener noreferrer"
                         onClick={() => setCvMenuOpen(false)}
                         role="menuitem"
                         className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                       >
                         <span className="text-lg leading-none" aria-hidden>🇬🇧</span>
                         {t.hero.cv_english}
                       </a>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: PHOTO CARD ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group animate-float">
              {/* Floating badges */}
              <div className="absolute -top-6 -left-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-primary/10 z-20 flex items-center gap-3 animate-float-slow">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Code2 size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1 tracking-wider">Expertise</p>
                    <p className="text-sm font-bold leading-none">Full Stack</p>
                 </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-primary/10 z-20 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                 <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1 tracking-wider">Experience</p>
                    <p className="text-sm font-bold leading-none">2+ Years</p>
                 </div>
              </div>

              {/* Main Photo Card */}
              <div className="relative w-[min(90vw,360px)] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-primary/20 group">
                <img
                  src="/profile.png"
                  alt="Mohamed Ghelli"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Hover info overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <p className="text-white/80 text-sm font-medium mb-1">Based in Mauritania</p>
                   <p className="text-white text-xl font-bold flex items-center gap-2">
                     Ready to Work <ExternalLink size={16} />
                   </p>
                </div>

                {/* Glass shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Decorative back shapes */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-primary/5 rounded-[3rem] rotate-3" />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-primary/10 rounded-[3rem] -rotate-2" />
              
              {/* Bouton flottant Contact (comme référence — telegram/whatsapp icon) */}
              <button
                onClick={() => scrollTo('#contact')}
                className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full
                  flex items-center justify-center text-white
                  shadow-[0_4px_20px_-4px_hsl(195_100%_45%/0.4)]
                  hover:scale-110 transition-all duration-200 active:scale-95 z-10"
                style={{ background: 'linear-gradient(135deg, hsl(195 100% 45%), hsl(195 100% 35%))' }}
                title="Contact"
              >
                <MessageCircle size={22} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
        opacity-0 animate-fade-in animation-delay-700">
         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Scroll</span>
         <div className="w-5 h-8 border-2 border-primary/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-primary rounded-full animate-bounce" />
         </div>
      </div>
    </section>
  );
};

export default Hero;
