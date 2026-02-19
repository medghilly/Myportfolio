import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Code, Shield, Wrench } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

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
    { key: 'web', icon: Code, skills: skillsData.web, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { key: 'network', icon: Shield, skills: skillsData.network, color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
    { key: 'devops', icon: Wrench, skills: skillsData.devops, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className={`section-spacing transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className="bg-card rounded-2xl border border-border card-hover overflow-hidden"
                style={{
                  transitionDelay: isVisible ? `${catIndex * 120}ms` : '0ms',
                }}
              >
                {/* Category header */}
                <div className={`flex items-center gap-4 px-6 py-4 border-b border-border`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${category.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t.skills.categories[category.key as keyof typeof t.skills.categories]}
                  </h3>
                </div>

                {/* Skills grid — 2 columns */}
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 p-6">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name} className="flex items-center gap-4">
                      {/* Skill name */}
                      <span className="text-sm font-medium text-foreground w-36 shrink-0">
                        {skill.name}
                      </span>

                      {/* Bar + % */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all ease-out"
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDuration: `${700 + i * 60}ms`,
                              transitionDelay: isVisible ? `${catIndex * 120 + i * 50}ms` : '0ms',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground w-8 text-right shrink-0">
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
