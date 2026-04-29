import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollUI from '@/components/ScrollUI';
import SocialSidebar from "@/components/SocialSidebar";
import Preloader from "@/components/Preloader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Preloader />
      <Navbar />
      <ScrollUI />
      <SocialSidebar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
