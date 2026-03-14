import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Code, Shield, Wrench } from 'lucide-react';

interface Skill { name: string; level: number; }

const skillsData: Record<string, Skill[]> = {
  web: [
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 75 },
    { name: 'TypeScript', level: 80 },
    { name: 'TailwindCSS', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Django', level: 65 },
    { name: 'Flask', level: 60 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'JavaScript', level: 85 },
  ],
  network: [
    { name: 'Cisco (Routing, VLAN)', level: 80 },
    { name: 'Fortinet', level: 70 },
    { name: 'OSPF', level: 75 },
    { name: 'DHCP', level: 85 },
    { name: 'DNS', level: 85 },
    { name: 'Active Directory', level: 70 },
    { name: 'Firewalls', level: 75 },
    { name: 'VPN', level: 70 },
  ],
  devops: [
    { name: 'Git/GitHub', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'Linux', level: 80 },
    { name: 'Ansible', level: 60 },
    { name: 'VirtualBox', level: 75 },
    { name: 'VMware', level: 70 },
    { name: 'Python', level: 75 },
    { name: 'Bash', level: 72 },
  ],
};

const Skills = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const categories = [
    { key: 'web',     icon: Code,   skills: skillsData.web,     color: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400',    bar: 'bg-blue-500' },
    { key: 'network', icon: Shield, skills: skillsData.network, color: 'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-600 dark:text-violet-400', bar: 'bg-violet-500' },
    { key: 'devops',  icon: Wrench, skills: skillsData.devops,  color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="section-spacing relative overflow-hidden"
    >
      {/* Orbes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[90px] animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '3s' }} />

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.skills.title}</h2>
          <p className="text-muted-foreground text-lg">{t.skills.subtitle}</p>
        </div>

        <div className="space-y-6">
          {categories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className={`bg-card rounded-2xl border border-border overflow-hidden
                  hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: isVisible ? `${catIndex * 150}ms` : '0ms' }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center
                    transition-transform duration-300 hover:scale-110 hover:rotate-3 ${category.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t.skills.categories[category.key as keyof typeof t.skills.categories]}
                  </h3>
                </div>

                {/* Skills grid */}
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 p-6">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name} className="flex items-center gap-4 group">
                      <span className="text-sm font-medium text-foreground w-36 shrink-0
                        group-hover:text-primary transition-colors duration-200">
                        {skill.name}
                      </span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ease-out relative overflow-hidden ${category.bar}`}
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDuration: `${800 + i * 60}ms`,
                              transitionDelay: isVisible ? `${catIndex * 150 + i * 50}ms` : '0ms',
                            }}
                          >
                            {/* Shimmer sur la barre */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground w-8 text-right shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
