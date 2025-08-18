import { Button } from "@/components/ui/button";

export function CTASection() {
  const scrollToUpload = () => {
    const element = document.getElementById("upload");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold font-tech mb-6 text-white">
          Pronto para ter sua miniatura exclusiva?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Não perca mais tempo! Transforme sua foto favorita em uma miniatura 3D incrível hoje mesmo.
        </p>
        <Button 
          className="btn-cta text-2xl px-12 py-6"
          onClick={scrollToUpload}
        >
          Peça Agora
        </Button>
      </div>
    </section>
  );
}