import AtelierFooter from "./components/AtelierFooter";
import AtelierHeader from "./components/AtelierHeader";
import CollectionSection from "./components/CollectionSection";
import FAQSection from "./components/FAQSection";
import HeroSection from "./components/HeroSection";
import OrderSection from "./components/OrderSection";
import ProcessSection from "./components/ProcessSection";
import StorySection from "./components/StorySection";
import "./atelier.css";

export default function AtelierPage() {
  return (
    <div className="atelier-site" id="inicio">
      <AtelierHeader />
      <main>
        <HeroSection />
        <CollectionSection />
        <StorySection />
        <ProcessSection />
        <OrderSection />
        <FAQSection />
      </main>
      <AtelierFooter />
    </div>
  );
}
