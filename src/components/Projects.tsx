import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';

const VISIBLE_COUNT = 3;

const Projects = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className={`section-spacing bg-secondary/30 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {t.projects.items.slice(0, showAll ? undefined : VISIBLE_COUNT).map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isClicked = clickedIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-card rounded-2xl border border-border overflow-hidden
                  transition-all duration-500 ease-out cursor-pointer
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  ${isHovered ? 'shadow-2xl shadow-primary/15 border-primary/30 -translate-y-1' : 'shadow-md'}
                  ${isClicked ? 'scale-[0.99]' : 'scale-100'}`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                {/* Image — full width, fixed height */}
                <div className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-secondary">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.name}
                        className={`absolute inset-0 w-full h-full object-contain
                          transition-transform duration-700 ease-out
                          ${isHovered ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className={`absolute inset-0 bg-primary/20 flex items-center justify-center
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="text-white" size={22} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-7xl font-extrabold text-primary/20">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Top row: badge + title left, tech right */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 inline-block mb-2
                        ${isHovered ? 'bg-primary text-primary-foreground' : 'text-primary bg-primary/10'}`}>
                        {project.type}
                      </span>
                      <h3 className={`text-xl font-bold transition-colors duration-300
                        ${isHovered ? 'text-primary' : 'text-foreground'}`}>
                        {project.name}
                      </h3>
                    </div>
                    {/* Tech badges — right side */}
                    <div className="flex flex-wrap gap-1.5 justify-end max-w-[45%]">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono border border-border
                            hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 cursor-default whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-muted-foreground text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {/* Highlights */}
                  <ul className="text-sm text-muted-foreground mb-5 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300
                          ${isHovered ? 'bg-primary' : 'bg-muted-foreground'}`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg
                          bg-secondary text-secondary-foreground border border-border
                          hover:bg-primary hover:text-primary-foreground hover:border-primary
                          transition-all duration-200 active:scale-95"
                      >
                        <Github size={15} />
                        {t.projects.view_code}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg
                          bg-primary text-primary-foreground
                          hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25
                          transition-all duration-200 active:scale-95"
                      >
                        <ExternalLink size={15} />
                        {t.projects.view_demo}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more / less button */}
        {t.projects.items.length > VISIBLE_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl
                border border-border bg-card text-foreground font-medium text-sm
                hover:border-primary hover:text-primary hover:bg-primary/5
                transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {showAll ? (
                <><ChevronUp size={18} />{t.projects.show_less}</>
              ) : (
                <><ChevronDown size={18} />{t.projects.show_more}</>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
