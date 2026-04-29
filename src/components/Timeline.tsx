import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Briefcase, GraduationCap, Calendar, MapPin, 
  CheckCircle2, ExternalLink, FileText, Sparkles, Clock
} from 'lucide-react';

/* ─── Types ─── */
interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  tech: string[];
}

interface EducationItem {
  year: string;
  title: string;
  school: string;
  location: string;
  description: string;
  highlights: string[];
}

/* ─── Experience Split Item ─── */
const ExperienceSplitItem = ({ experience, index, isVisible }: { experience: ExperienceItem; index: number; isVisible: boolean }) => {
  const isChinguitel = experience.company.toLowerCase().includes('chinguitel');
  const logoSrc = isChinguitel ? '/chinguitel.png' : null;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 pb-12 last:pb-0">
      
      {/* Central Timeline line & dot (Desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border border-primary/30 z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(195_100%_45%/0.5)]" />
        </div>
      </div>

      {/* LEFT: Title & Company Card */}
      <div 
        className={`transition-all duration-700 delay-100
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      >
        <div className="group card-blue p-6 md:p-7 card-hover h-full flex flex-col justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border-primary/5">
          <div className="flex items-center gap-4 mb-4">
             {logoSrc ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-border/50 bg-white p-1 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <img src={logoSrc} alt={experience.company} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Briefcase size={22} />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {experience.title}
              </h3>
              <p className="text-primary font-bold flex items-center gap-1.5 text-sm mt-0.5">
                {experience.company}
                {isChinguitel && <ExternalLink size={12} className="opacity-30 hover:opacity-100 transition-opacity" />}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed opacity-80">
            {experience.description}
          </p>
        </div>
      </div>

      {/* RIGHT: Dates & Responsibilities */}
      <div 
        className={`transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <div className="flex flex-col h-full pt-2">
          <div className="text-muted-foreground font-black text-base mb-4 flex items-center gap-2.5">
            <Clock size={18} className="text-primary/40" />
            {experience.year}
          </div>
          
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-3 flex items-center gap-2">
            Key responsibilities
          </h4>
          <ul className="space-y-2.5 mb-6">
            {experience.responsibilities?.map((resp, i) => (
              <li key={i} className="text-[14px] text-muted-foreground flex items-start gap-3 leading-snug group/item">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0 group-hover/item:bg-primary/50 transition-colors" />
                {resp}
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {experience.tech?.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-secondary/40 dark:bg-secondary/10 text-muted-foreground text-[10px] font-bold border border-border/30 hover:border-primary/20 hover:text-primary transition-all cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

/* ─── Education Compact Card ─── */
const EducationHorizontalCard = ({ education, index, isVisible }: { education: EducationItem; index: number; isVisible: boolean }) => {
  const isIscae = education.school.toLowerCase().includes('iscae');
  const isBac   = education.title.toLowerCase().includes('baccalauréat') || education.title.toLowerCase().includes('bac');
  const logoSrc = isIscae ? '/iscae.jpg' : null;

  return (
    <div
      className={`group card-blue overflow-hidden transition-all duration-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-primary/10 w-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Main row: Logo | Info | Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 md:px-8 md:py-6">

        {/* LEFT — Logo */}
        <div className="shrink-0">
          {logoSrc ? (
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 bg-white shadow-md transition-transform duration-300 group-hover:scale-105">
              <img src={logoSrc} alt={education.school} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-md">
              <GraduationCap size={24} />
            </div>
          )}
        </div>

        {/* CENTER — Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
              {education.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20 shrink-0">
              <Calendar size={9} />
              {education.year}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground/70">{education.school}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-primary/50" />
              {education.location}
            </span>
          </p>
          {education.description && (
            <p className="text-xs text-muted-foreground/70 leading-relaxed mt-1.5 line-clamp-2">
              {education.description}
            </p>
          )}
        </div>

        {/* RIGHT — Action buttons */}
        {!isBac && (
          <div className="flex sm:flex-col gap-2 shrink-0">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl
              bg-white/60 dark:bg-card/60 hover:bg-primary/10 text-muted-foreground hover:text-primary
              text-[11px] font-semibold transition-all border border-border/60 hover:border-primary/30
              shadow-sm whitespace-nowrap active:scale-95">
              <FileText size={12} />
              Certificate
              <ExternalLink size={10} className="opacity-40" />
            </button>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl
              bg-white/60 dark:bg-card/60 hover:bg-primary/10 text-muted-foreground hover:text-primary
              text-[11px] font-semibold transition-all border border-border/60 hover:border-primary/30
              shadow-sm whitespace-nowrap active:scale-95">
              <FileText size={12} />
              Transcript
              <ExternalLink size={10} className="opacity-40" />
            </button>
          </div>
        )}
      </div>

      {/* ── Highlights grid (compact) ── */}
      {education.highlights && education.highlights.length > 0 && (
        <div className="px-5 md:px-8 pb-5 pt-0">
          <div className="border-t border-primary/[6%] pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {education.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground group/hl">
                  <CheckCircle2 size={13} className="text-primary/40 group-hover/hl:text-primary transition-colors shrink-0" />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Timeline = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="timeline"
      className="section-spacing relative overflow-hidden bg-background"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-blue opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] animate-float-slow" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] animate-float" />

      {/* FULL WIDTH CONTAINER (max-w-[1500px]) */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* Section Expérience */}
        <div className="mb-24">
          <div className={`mb-12 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-[clamp(2.5rem,8vw,4rem)] font-black text-foreground mb-4 tracking-tighter leading-tight">
               {t.timeline?.experience_title || (t.timeline?.title?.split('&')[0] || 'Expérience')}
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full mb-6" />
          </div>

          <div className="space-y-12">
            {t.timeline?.experience.map((exp, index) => (
              <ExperienceSplitItem key={index} experience={exp} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Section Éducation */}
        <div>
          <div className={`mb-10 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-[clamp(2.5rem,8vw,4rem)] font-black text-foreground mb-4 tracking-tighter leading-tight">
               {t.timeline?.education_title || (t.timeline?.title?.split('&')[1]?.trim() || 'Éducation')}
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full mb-6" />
          </div>

          <div className="space-y-8">
            {t.timeline?.education.map((edu, index) => (
              <EducationHorizontalCard key={index} education={edu} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
