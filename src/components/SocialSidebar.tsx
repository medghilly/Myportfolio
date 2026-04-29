import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const SocialSidebar = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { icon: Github, href: "https://github.com/medghilly", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/medghilly", label: "LinkedIn" },
    { icon: Mail, href: "mailto:medghilly@gmail.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/yournumber", label: "WhatsApp" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed right-6 bottom-32 z-40 hidden lg:flex flex-col gap-4"
        >
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: -5 }}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-primary/10 shadow-xl text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors group relative"
              >
                <Icon size={20} />
                <span className="absolute right-full mr-3 px-2 py-1 rounded bg-foreground text-background text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
          <div className="w-px h-12 bg-primary/20 self-center" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialSidebar;
