import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const scrollToUpload = () => {
    const element = document.getElementById("upload");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black font-tech mb-6 text-glow">
            Transforme sua foto em uma
            <span className="bg-gradient-button bg-clip-text text-transparent"> miniatura 3D incrível!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Envie sua foto favorita e receba uma miniatura exclusiva feita em impressora 3D com riqueza de detalhes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="btn-cta text-lg px-8 py-6"
              onClick={scrollToUpload}
            >
              Quero minha Miniatura Agora
            </Button>
            
            <p className="text-sm text-muted-foreground">
              ⚡ Entrega a combinar
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-glow"></div>
        </div>
      </div>
    </section>
  );
}