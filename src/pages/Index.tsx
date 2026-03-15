import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { NewHeroSection } from "@/components/NewHeroSection";
import { ModalitiesSection } from "@/components/ModalitiesSection";
import { PersonSection } from "@/components/PersonSection";
import { CarsSection } from "@/components/CarsSection";
import { StockCarSection } from "@/components/StockCarSection";
import { NewUploadSection } from "@/components/NewUploadSection";
import { NewHowItWorksSection } from "@/components/NewHowItWorksSection";
import { NewFooter } from "@/components/NewFooter";
import { OrderModal } from "@/components/OrderModal";
import type { Car } from "@/data/cars";
import type { StockCar } from "@/data/stockcars";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedStockCar, setSelectedStockCar] = useState<StockCar | null>(null);

  const handleOrderCar = (car: Car) => {
    setSelectedCar(car);
    setSelectedStockCar(null);
    setModalOpen(true);
  };

  const handleOrderStockCar = (car: StockCar) => {
    setSelectedStockCar(car);
    setSelectedCar(null);
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
      <NewUploadSection />
      <NewHowItWorksSection />
      <NewFooter />
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        car={selectedCar}
        stockCar={selectedStockCar}
      />
    </div>
  );
};

export default Index;
