import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden card-hover border border-border flex flex-col"
            >
              {/* Project header with gradient */}
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/30">
                  {project.name.charAt(0)}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {/* Type badge */}
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full w-fit mb-3">
                  {project.type}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-border">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                    {t.projects.view_code}
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                    {t.projects.view_demo}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
