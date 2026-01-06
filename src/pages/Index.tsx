import { LanguageProvider } from '@/contexts/LanguageContext';
import FloatingShapes from '@/components/FloatingShapes';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Floating Background Shapes */}
        <FloatingShapes />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <ContactSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
