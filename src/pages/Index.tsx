import { Navigation } from "@/components/Navigation";
import { NewHeroSection } from "@/components/NewHeroSection";
import { ModalitiesSection } from "@/components/ModalitiesSection";
import { PersonSection } from "@/components/PersonSection";
import { NewUploadSection } from "@/components/NewUploadSection";
import { NewHowItWorksSection } from "@/components/NewHowItWorksSection";
import { NewFooter } from "@/components/NewFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <NewHeroSection />
      <ModalitiesSection />
      <PersonSection />
      <NewUploadSection />
      <NewHowItWorksSection />
      <NewFooter />
    </div>
  );
};

export default Index;
