import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { NewHeroSection } from "@/components/NewHeroSection";
import { ModalitiesSection } from "@/components/ModalitiesSection";
import { PersonSection } from "@/components/PersonSection";
import { CarsSection } from "@/components/CarsSection";
import { StockCarSection } from "@/components/StockCarSection";
import { F1Section } from "@/components/F1Section";
import { NewUploadSection } from "@/components/NewUploadSection";
import { NewHowItWorksSection } from "@/components/NewHowItWorksSection";
import { NewFooter } from "@/components/NewFooter";
import { OrderModal } from "@/components/OrderModal";
import type { Car } from "@/data/cars";
import type { StockCar } from "@/data/stockcars";
import type { F1Car } from "@/data/f1cars";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedStockCar, setSelectedStockCar] = useState<StockCar | null>(null);
  const [selectedF1Car, setSelectedF1Car] = useState<F1Car | null>(null);

  const handleOrderCar = (car: Car) => {
    setSelectedCar(car);
    setSelectedStockCar(null);
    setSelectedF1Car(null);
    setModalOpen(true);
  };

  const handleOrderStockCar = (car: StockCar) => {
    setSelectedStockCar(car);
    setSelectedCar(null);
    setSelectedF1Car(null);
    setModalOpen(true);
  };

  const handleOrderF1Car = (car: F1Car) => {
    setSelectedF1Car(car);
    setSelectedCar(null);
    setSelectedStockCar(null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <NewHeroSection />
      <ModalitiesSection />
      <PersonSection />
      <CarsSection onOrderCar={handleOrderCar} />
      <StockCarSection onOrderCar={handleOrderStockCar} />
      <F1Section onOrderCar={handleOrderF1Car} />
      <NewUploadSection />
      <NewHowItWorksSection />
      <NewFooter />
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        car={selectedCar}
        stockCar={selectedStockCar}
        f1Car={selectedF1Car}
      />
    </div>
  );
};

export default Index;
