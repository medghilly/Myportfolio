import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Shield, Wrench } from 'lucide-react';

const skillsData = {
  web: [
    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 
    'Node.js', 'Django', 'Flask', 'HTML/CSS', 'JavaScript'
  ],
  network: [
    'Cisco (Routing, VLAN)', 'Fortinet', 'OSPF', 
    'DHCP', 'DNS', 'Active Directory', 'Firewalls', 'VPN'
  ],
  devops: [
    'Git/GitHub', 'Docker', 'Linux', 'Ansible',
    'VirtualBox', 'VMware', 'Python', 'Bash'
  ]
};

const Skills = () => {
  const { t } = useLanguage();

  const categories = [
    { key: 'web', icon: Code, skills: skillsData.web },
    { key: 'network', icon: Shield, skills: skillsData.network },
    { key: 'devops', icon: Wrench, skills: skillsData.devops },
  ];

  return (
    <section id="skills" className="section-spacing">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className="bg-card rounded-2xl p-6 card-hover border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t.skills.categories[category.key as keyof typeof t.skills.categories]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
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
