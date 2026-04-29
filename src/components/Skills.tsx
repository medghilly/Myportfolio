import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Code2, Database, Layout, Smartphone, Globe, 
  Terminal, Cpu, Layers, Sparkles, ChevronRight,
  Monitor, Search, ShieldCheck, Gauge
} from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const skillData = [
    {
      key: 'frontend',
      icon: Layout,
      title: 'Développement Frontend',
      items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      key: 'backend',
      icon: Terminal,
      title: 'Développement Backend',
      items: ['Node.js & Express', 'Laravel (PHP)', 'PostgreSQL / MySQL', 'Supabase'],
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      key: 'mobile',
      icon: Smartphone,
      title: 'Développement Mobile',
      items: ['Flutter & Dart', '.NET MAUI', 'React Native', 'Native Android'],
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      key: 'tools',
      icon: Database,
      title: 'Outils & DevOps',
      items: ['Git & GitHub', 'Docker', 'Postman', 'Linux / Bash'],
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    }
  ];

  const featuredSkills = [
    { name: 'TypeScript', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', years: '2+ ans' },
    { name: 'React', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', years: '2+ ans' },
    { name: 'Node.js', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', years: '2+ ans' },
    { name: 'Flutter', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', years: '1.5 ans' },
    { name: 'Laravel', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', years: '2 ans' },
    { name: 'PostgreSQL', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', years: '2 ans' },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="section-spacing relative overflow-hidden bg-background"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-blue opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Expertise Technique</span>
          </div>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black text-foreground mb-6 tracking-tight leading-tight">
            {t.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* ─── FEATURED SKILLS (Horizontal Bar) ─── */}
        {!isExpanded ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {featuredSkills.map((skill) => (
              <motion.div 
                key={skill.name} 
                variants={itemVariants}
                className="group card-blue p-6 flex flex-col items-center justify-center text-center card-hover border-primary/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mb-4 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-full h-full rounded-xl bg-white dark:bg-slate-800 p-2 border border-border shadow-sm relative z-10 group-hover:scale-110 transition-transform flex items-center justify-center">
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="text-primary font-bold text-xs">
                        {skill.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <h4 className="font-bold text-foreground mb-1">{skill.name}</h4>
                <div className="w-full bg-secondary rounded-full h-1 mb-2 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-1000" 
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  />
                </div>
                <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">{skill.years}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* ─── CATEGORICAL VIEW (Full Details) ─── */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skillData.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div 
                  key={category.key} 
                  variants={itemVariants}
                  className="card-blue p-6 group hover:border-primary/40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm"
                >
                  <div className={`w-12 h-12 rounded-xl ${category.bg} ${category.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item: string) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground group/item">
                        <ChevronRight size={14} className="text-primary opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        <span className="group-hover/item:text-foreground transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Toggle Button */}
        <div className={`mt-16 flex justify-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 text-foreground font-bold border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-95"
          >
            {isExpanded ? (
              <>
                <Layers size={18} className="text-primary" />
                Voir le résumé
              </>
            ) : (
              <>
                <Monitor size={18} className="text-primary" />
                Explorer toutes les compétences
              </>
            )}
            <ChevronRight size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Skills;
