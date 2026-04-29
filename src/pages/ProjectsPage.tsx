import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Globe, Github, ExternalLink, LayoutGrid, Smartphone, Monitor } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-foreground/5 dark:bg-foreground/10 border-b border-border/50 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex-1 h-5 rounded-full bg-foreground/10 dark:bg-foreground/15 max-w-[180px]" />
      </div>
      <div className="relative flex-1 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out
            ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
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
   Main page
───────────────────────────────────────────── */
const ProjectsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Background orbs ── */}
      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute bg-grid-blue opacity-25 inset-0" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-primary/[4%] blur-[160px] animate-float-slow" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[3%] blur-[140px] animate-float" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-primary/25 animate-pulse hidden lg:block" />
        <div className="absolute top-1/3 left-16 w-2 h-2 rounded-full bg-primary/35 animate-pulse hidden lg:block" />
      </div>

      <main className="section-container pt-28 pb-20 relative z-10">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate('/')}
          className={`group flex items-center gap-2 text-sm text-muted-foreground
            hover:text-primary transition-all duration-300 mb-10
            ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </button>

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <LayoutGrid size={13} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Portfolio</span>
            </div>
            <h1
              className={`text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-foreground mb-3 tracking-tight
                transition-all duration-700 delay-100
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {t.projects.title}
            </h1>
            <div className="flex gap-1 mb-4 overflow-hidden">
              <span
                className={`block h-1 rounded-full bg-primary
                  transition-all duration-700 delay-200 ease-out
                  ${mounted ? 'w-10 opacity-100' : 'w-0 opacity-0'}`}
              />
              <span
                className={`block h-1 rounded-full bg-primary/40
                  transition-all duration-700 delay-300 ease-out
                  ${mounted ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}
              />
            </div>
            <p
              className={`text-muted-foreground text-base max-w-lg
                transition-all duration-700 delay-200
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {t.projects.subtitle}
            </p>
          </div>
        </div>

        {/* ── Alternating Showcase Items ── */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {t.projects.items.map((project, index) => {
            const isHovered = hoveredIdx === index;
            const isReversed = index % 2 === 1;
            const isMobile = project.type.toLowerCase().includes('mobile');

            return (
              <article
                key={index}
                style={{ transitionDelay: mounted ? `${index * 100 + 150}ms` : '0ms' }}
                className={`group transition-all duration-700 ease-out
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
                >
                  {/* ── Image Panel ── */}
                  <div className="w-full lg:w-[55%] shrink-0">
                    <div
                      className={`relative rounded-2xl overflow-hidden border border-primary/[10%]
                        transition-all duration-500
                        ${isMobile ? 'h-80' : 'aspect-video w-full'} bg-secondary/30 dark:bg-card/50
                        ${isHovered
                          ? 'shadow-[0_24px_60px_-12px_hsl(195_100%_45%/0.25)] border-primary/25 -translate-y-1'
                          : 'shadow-[0_4px_24px_-8px_hsl(213_52%_13%/0.08)]'
                        }`}
                    >
                      <ProjectMedia project={project} isHovered={isHovered} />

                      {/* Type badge */}
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

                      {/* Index number */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className="text-4xl font-black text-primary/10 select-none leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Text Panel ── */}
                  <div className={`flex-1 flex flex-col gap-5 ${isReversed ? 'lg:items-end lg:text-right' : ''}`}>

                    <div>
                      <h2
                        className={`text-2xl md:text-3xl font-bold leading-tight mb-2 transition-colors duration-300
                          ${isHovered ? 'text-primary' : 'text-foreground'}`}
                      >
                        {project.name}
                      </h2>
                      <p
                        className="text-muted-foreground text-sm md:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className={`flex flex-col gap-2 ${isReversed ? 'lg:items-end' : ''}`}>
                        {project.highlights.map((pt, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-300
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

                    <div className="h-px w-full bg-border/50" />

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap gap-3 ${isReversed ? 'lg:justify-end' : ''}`}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/gh inline-flex items-center gap-2 px-4 py-2 rounded-xl
                            border border-border/70 text-sm font-semibold text-muted-foreground
                            hover:border-foreground/40 hover:text-foreground hover:bg-foreground/[5%]
                            transition-all duration-200 active:scale-95"
                        >
                          <Github size={14} className="transition-transform duration-300 group-hover/gh:rotate-12" />
                          GitHub
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/demo inline-flex items-center gap-2 px-4 py-2 rounded-xl
                            border border-primary/25 text-sm font-semibold text-primary
                            hover:bg-primary/10 hover:border-primary/50
                            transition-all duration-200 active:scale-95"
                        >
                          <Globe size={14} className="transition-transform duration-300 group-hover/demo:rotate-12" />
                          Live Demo
                        </a>
                      )}

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
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
