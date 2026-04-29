import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Github, ExternalLink, LayoutGrid, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const PREVIEW_COUNT = 3;

/* ─────────────────────────────────────────────
   Sub-component: Project image/preview panel
───────────────────────────────────────────── */
const ProjectMedia = ({
  project,
  isHovered,
}: {
  project: { image?: string; name: string; type: string };
  isHovered: boolean;
}) => {
  const isMobile = project.type.toLowerCase().includes('mobile');

  if (!project.image) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
        <span
          className={`font-extrabold text-primary/15 select-none transition-all duration-500 ${isHovered ? 'text-[9rem] text-primary/25' : 'text-[7rem]'
            }`}
        >
          {project.name.charAt(0)}
        </span>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        {/* Phone mockup */}
        <div
          className={`relative w-36 h-[280px] rounded-[28px] border-[5px] border-foreground/20
            bg-black shadow-2xl overflow-hidden transition-all duration-500
            ${isHovered ? 'scale-105 shadow-[0_24px_60px_-12px_hsl(195_100%_45%/0.35)]' : 'scale-100'}`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-b-xl z-10" />
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-foreground/5 dark:bg-foreground/10 border-b border-border/50 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex-1 h-5 rounded-full bg-foreground/10 dark:bg-foreground/15 max-w-[180px]" />
      </div>
      <div className="relative flex-1 overflow-hidden" style={{ height: 'calc(100% - 41px)' }}>
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out
            ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        {/* Shimmer on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent
            pointer-events-none transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const Projects = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const projects = t.projects.items.slice(0, PREVIEW_COUNT);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className="section-spacing relative overflow-hidden bg-background"
    >
      {/* ── Background decor ── */}
      <div className="absolute inset-0 bg-grid-blue opacity-30 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full bg-primary/[4%] blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-primary/[3%] blur-[120px] pointer-events-none animate-float" />

      <div className="section-container relative z-10">

        {/* ── Section Header ── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <LayoutGrid size={13} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Portfolio</span>
            </div>
            <h2
              className={`text-[clamp(2.2rem,7vw,3.5rem)] font-bold text-foreground mb-3 tracking-tight
                transition-all duration-700 delay-100
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              {t.projects.title}
            </h2>
            <div className="flex gap-1 mb-4 overflow-hidden">
              <span
                className={`block h-1 rounded-full bg-primary
                  transition-all duration-700 delay-200 ease-out
                  ${isVisible ? 'w-10 opacity-100' : 'w-0 opacity-0'}`}
              />
              <span
                className={`block h-1 rounded-full bg-primary/40
                  transition-all duration-700 delay-300 ease-out
                  ${isVisible ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}
              />
            </div>
            <p
              className={`text-muted-foreground text-base max-w-md
                transition-all duration-700 delay-200
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              {t.projects.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigate('/projects')}
            className={`group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
              border border-primary/25 text-primary text-sm font-semibold
              hover:bg-primary hover:text-white hover:border-primary
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20
              active:scale-95
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.projects.show_more}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* ── Alternating Showcase Items ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16 lg:gap-24"
        >
          {projects.map((project, index) => {
            const isHovered = hoveredIdx === index;
            const isReversed = index % 2 === 1;
            const isMobile = project.type.toLowerCase().includes('mobile');

            return (
              <motion.article
                key={index}
                variants={itemVariants}
                className="group"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
                >

                  {/* ── Image Panel ── */}
                  <div className="w-full lg:w-[55%] shrink-0 [perspective:1000px]">
                    <motion.div
                      whileHover={{ rotateX: -5, rotateY: 5, scale: 1.02, translateZ: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`relative rounded-2xl overflow-hidden border border-primary/[10%]
                        bg-secondary/30 dark:bg-card/50
                        ${isMobile ? 'h-80' : 'aspect-video w-full'}
                        ${isHovered
                          ? 'shadow-[0_24px_60px_-12px_hsl(195_100%_45%/0.25)] border-primary/25'
                          : 'shadow-[0_4px_24px_-8px_hsl(213_52%_13%/0.08)]'
                        }`}
                    >
                      <ProjectMedia project={project} isHovered={isHovered} />

                      {/* Top overlay: type badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5
                            rounded-full backdrop-blur-md border shadow-sm transition-all duration-300
                            ${isHovered
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white/90 dark:bg-card/90 text-primary border-primary/20'
                            }`}
                        >
                          {isMobile ? <Smartphone size={11} /> : <Monitor size={11} />}
                          {project.type}
                        </span>
                      </div>

                      {/* Corner index number */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className="text-4xl font-black text-primary/10 select-none leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Text Panel ── */}
                  <div className={`flex-1 flex flex-col gap-5 ${isReversed ? 'lg:items-end lg:text-right' : ''}`}>

                    {/* Title */}
                    <div>
                      <h3
                        className={`text-2xl md:text-3xl font-bold leading-tight mb-2 transition-colors duration-300
                          ${isHovered ? 'text-primary' : 'text-foreground'}`}
                      >
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {project.description.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className={`flex flex-col gap-2 ${isReversed ? 'lg:items-end' : ''}`}>
                        {project.highlights.slice(0, 3).map((pt, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2.5 text-sm text-muted-foreground
                              transition-all duration-300
                              ${isReversed ? 'lg:flex-row-reverse' : ''}
                              ${isHovered ? 'translate-x-1' : ''}`}
                            style={{ transitionDelay: isHovered ? `${i * 50}ms` : '0ms' }}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isHovered ? 'bg-primary' : 'bg-primary/40'}`} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech badges */}
                    <div className={`flex flex-wrap gap-2 ${isReversed ? 'lg:justify-end' : ''}`}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs px-3 py-1 rounded-full font-mono border transition-all duration-300
                            ${isHovered
                              ? 'bg-primary/10 text-primary border-primary/30'
                              : 'bg-secondary/80 dark:bg-secondary/30 text-muted-foreground border-border/50'
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className={`h-px w-full bg-border/50`} />

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap gap-3 ${isReversed ? 'lg:justify-end' : ''}`}>
                      {/* GitHub */}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/gh inline-flex items-center gap-2 px-4 py-2 rounded-xl
                            border border-border/70 text-sm font-semibold text-muted-foreground
                            hover:border-foreground/40 hover:text-foreground hover:bg-foreground/[5%]
                            transition-all duration-200 active:scale-95"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={14} className="transition-transform duration-300 group-hover/gh:rotate-12" />
                          GitHub
                        </a>
                      )}

                      {/* Live Demo */}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/demo inline-flex items-center gap-2 px-4 py-2 rounded-xl
                            border border-primary/25 text-sm font-semibold text-primary
                            hover:bg-primary/10 hover:border-primary/50
                            transition-all duration-200 active:scale-95"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={14} className="transition-transform duration-300 group-hover/demo:rotate-12" />
                          Live Demo
                        </a>
                      )}

                      {/* View Details */}
                      <button
                        onClick={() => navigate(`/projects/${index}`)}
                        className="group/det inline-flex items-center gap-2 px-4 py-2 rounded-xl
                          bg-primary text-white text-sm font-semibold
                          hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5
                          transition-all duration-200 active:scale-95"
                      >
                        <ExternalLink size={14} />
                        Case Study
                        <ArrowRight size={12} className="transition-transform duration-300 group-hover/det:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <div
          className={`mt-20 flex justify-center transition-all duration-700 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <button
            onClick={() => navigate('/projects')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl
              bg-primary text-white font-semibold text-base
              hover:bg-primary/85 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1
              transition-all duration-300 active:scale-95"
          >
            <LayoutGrid size={18} />
            {t.projects.show_more}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
