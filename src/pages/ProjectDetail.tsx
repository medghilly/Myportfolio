import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ExternalLink, GithubIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const index = Number(id);
  const project = t.projects.items[index];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Projet introuvable.</p>
          <button onClick={() => navigate('/projects')}
            className="text-primary hover:underline">
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-container pt-28 pb-20">
        {/* Back button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Tous les projets
        </button>

        <div className="max-w-3xl mx-auto">
          {/* Screenshot / Phone mockup */}
          {(() => {
            const isMobile = project.type.toLowerCase().includes('mobile');
            if (!project.image) {
              return (
                <div className="w-full rounded-2xl border border-border shadow-xl mb-8
                  bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center h-56">
                  <span className="text-9xl font-extrabold text-primary/20">
                    {project.name.charAt(0)}
                  </span>
                </div>
              );
            }
            if (isMobile) {
              return (
                <div className="flex justify-center mb-10">
                  <div className="relative">
                    {/* outer shell */}
                    <div className="relative w-52 h-[440px] rounded-[36px] border-[6px] border-foreground/25 bg-black shadow-2xl overflow-hidden">
                      {/* status bar notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                      {/* screen image */}
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full bg-white/40" />
                    </div>
                    {/* glass sheen */}
                    <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                    {/* side buttons */}
                    <div className="absolute left-[-8px] top-20 w-1.5 h-10 rounded-l-full bg-foreground/20" />
                    <div className="absolute left-[-8px] top-36 w-1.5 h-7 rounded-l-full bg-foreground/20" />
                    <div className="absolute left-[-8px] top-48 w-1.5 h-7 rounded-l-full bg-foreground/20" />
                    <div className="absolute right-[-8px] top-28 w-1.5 h-14 rounded-r-full bg-foreground/20" />
                  </div>
                </div>
              );
            }
            return (
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-xl mb-8 bg-secondary">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full object-contain max-h-96"
                />
              </div>
            );
          })()}

          {/* Badge + Title */}
          <div className="mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block mb-3">
              {project.type}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {project.name}
            </h1>
          </div>

          {/* Description */}
          <p
            className="text-muted-foreground leading-relaxed mb-6 text-base"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {/* Highlights */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Points clés
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech}
                  className="text-sm px-3 py-1 rounded-lg bg-secondary text-secondary-foreground
                    font-mono border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
                  bg-secondary text-secondary-foreground border border-border
                  hover:bg-primary hover:text-primary-foreground hover:border-primary
                  transition-all duration-200 active:scale-95">
                <GithubIcon size={16} />
                {t.projects.view_code}
              </a>
            ) : (
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
                bg-secondary/50 text-muted-foreground border border-dashed border-border cursor-not-allowed">
                <GithubIcon size={16} />
                {t.projects.coming_soon}
              </span>
            )}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
                  bg-primary text-primary-foreground
                  hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25
                  transition-all duration-200 active:scale-95">
                <ExternalLink size={16} />
                {t.projects.view_demo}
              </a>
            ) : (
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
                bg-primary/10 text-primary/50 border border-dashed border-primary/30 cursor-not-allowed">
                <ExternalLink size={16} />
                {t.projects.coming_soon}
              </span>
            )}
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProjectDetail;
