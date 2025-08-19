import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/3d-miniature-result.jpg";

const galleryImages = [
  {
    src: gallery1,
    title: "Miniaturas Detalhadas",
    description: "Coleção de miniaturas personalizadas com riqueza de detalhes",
  },
  {
    src: gallery2,
    title: "Processo de Impressão",
    description: "Nossa impressora 3D de alta precisão em ação",
  },
  {
    src: gallery1,
    title: "Resultados Incríveis",
    description: "Veja a qualidade e precisão dos nossos trabalhos",
  },
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="galeria" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4">
            Nossa <span className="bg-gradient-button bg-clip-text text-transparent">Galeria</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja exemplos incríveis de miniaturas que já criamos para nossos clientes satisfeitos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-glow overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
                
                {/* Overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={nextSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Image info */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                {galleryImages[currentIndex].title}
              </h3>
              <p className="text-muted-foreground">
                {galleryImages[currentIndex].description}
              </p>
            </div>
          </Card>

          {/* Thumbnails */}
          <div className="flex justify-center space-x-4 mt-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-primary shadow-glow-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={galleryImages[index].src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold font-tech text-primary mb-2">200+</div>
            <div className="text-muted-foreground">Miniaturas Criadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold font-tech text-secondary mb-2">98%</div>
            <div className="text-muted-foreground">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold font-tech text-accent mb-2">A combinar</div>
            <div className="text-muted-foreground">Entrega</div>
          </div>
        </div>
      </div>
    </section>
  );
}