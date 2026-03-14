import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GithubIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProjectsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-container pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t.projects.title}
          </h1>
          <p className="text-muted-foreground text-lg">{t.projects.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isMobile = project.type.toLowerCase().includes('mobile');
            return (
              <div
                key={index}
                onClick={() => navigate(`/projects/${index}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-pointer transition-all duration-700 ease-out"
              >
                {/* Glow */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/60 via-primary/30 to-primary/60
                  blur-lg transition-opacity duration-500
                  ${isHovered ? 'opacity-70' : 'opacity-0'}`} />

                <div className={`relative rounded-2xl overflow-hidden border transition-all duration-500
                  ${isHovered
                    ? 'border-primary/50 shadow-2xl shadow-primary/20 -translate-y-2 scale-[1.02]'
                    : 'border-border shadow-md'}`}>

                  {/* Code editor bar */}
                  <div className="flex items-center bg-secondary border-b border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background border-r border-border shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-xs font-mono truncate max-w-[130px]">
                        <span className="text-yellow-500 dark:text-yellow-400">const</span>{' '}
                        <span className="text-blue-600 dark:text-blue-400">{project.name.replace(/\s+/g, '')}</span>
                        <span className="text-muted-foreground"> = </span>
                        <span className="text-green-600 dark:text-green-400">{'{}'}</span>
                      </span>
                    </div>
                    <div className="flex-1" />
                    <span className="text-xs text-muted-foreground font-mono px-3 shrink-0">{isMobile ? 'APP' : 'TSX'}</span>
                  </div>

                  {/* Image */}
                  <div className={`overflow-hidden bg-card flex items-center justify-center bg-gradient-to-b from-secondary/50 to-secondary/20 ${isMobile ? 'h-64' : 'h-48'}`}>
                    {project.image ? (
                      isMobile ? (
                        /* Phone mockup */
                        <div className={`relative transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}>
                          <div className="relative w-32 h-[230px] rounded-[24px] border-[4px] border-foreground/25 bg-black shadow-xl overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-b-xl z-10" />
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/40" />
                          </div>
                          <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.name}
                          className={`w-full h-full object-contain object-center
                            transition-transform duration-700 ease-out
                            ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-7xl font-extrabold text-primary/20">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className={`absolute inset-0 mt-9 bg-black/60 backdrop-blur-[2px]
                      flex flex-col items-center justify-center gap-3
                      transition-opacity duration-400
                      ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <p className="text-white/90 text-sm text-center px-6 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: project.description }} />
                      <div className="flex gap-3 mt-1">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full
                              bg-white/15 text-white border border-white/30 backdrop-blur-sm
                              hover:bg-white/30 transition-all duration-200 active:scale-95">
                            <GithubIcon size={13} /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full
                              bg-primary text-white hover:bg-primary/80 transition-all duration-200 active:scale-95">
                            <ExternalLink size={13} /> Demo
                          </a>
                        )}
                        <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full
                          bg-white/15 text-white border border-white/30 backdrop-blur-sm
                          hover:bg-white/30 transition-all duration-200 active:scale-95">
                          Détails →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className={`px-4 py-3 transition-colors duration-300
                    ${isHovered ? 'bg-primary/5' : 'bg-card'}`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className={`font-bold text-sm leading-tight transition-colors duration-300
                        ${isHovered ? 'text-primary' : 'text-foreground'}`}>
                        {project.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 transition-colors duration-300
                        ${isHovered ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        {project.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span key={tech}
                          className="text-xs px-1.5 py-0.5 rounded font-mono
                            bg-secondary text-muted-foreground border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
