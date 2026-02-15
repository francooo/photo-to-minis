import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ThreeDPrinterSection } from "@/components/ThreeDPrinterSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  console.log("Index component is rendering correctly");

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <UploadSection />
      <HowItWorksSection />
      <ThreeDPrinterSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
