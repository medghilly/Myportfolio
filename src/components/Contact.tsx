import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/emailService';

const Contact = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendContactEmail(formData);
      toast({ title: t.contact.form.success, description: formData.email });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: t.contact.form.error,
        description: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="section-spacing relative overflow-hidden"
    >
      {/* Orbes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/8 rounded-full blur-[70px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-primary/6 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground text-lg">{t.contact.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className={`text-center text-muted-foreground mb-8 transition-all duration-700 delay-100
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.contact.intro}
          </p>

          <div className={`bg-card rounded-2xl p-6 md:p-8 border border-border
            hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500
            delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: t.contact.form.name, type: 'text' },
                { id: 'email', label: t.contact.form.email, type: 'email' },
              ].map((field, i) => (
                <div key={field.id} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary
                      focus:border-transparent hover:border-primary/40 transition-all duration-200"
                  />
                </div>
              ))}

              <div className={`transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary
                    focus:border-transparent hover:border-primary/40 transition-all duration-200 resize-none"
                />
              </div>

              <div className={`transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full group btn-primary flex items-center justify-center gap-2
                    rounded-xl py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? t.contact.form.sending : (
                      <>{t.contact.form.send}<Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" /></>
                    )}
                  </span>
                  {/* Shine */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                    transition-transform duration-500 bg-white/20 skew-x-12" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
