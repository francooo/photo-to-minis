import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "João Silva",
    rating: 5,
    text: "Fiquei impressionado com a qualidade da miniatura, parece real! O acabamento é perfeito e superou todas as minhas expectativas.",
    avatar: "JS",
  },
  {
    name: "Ana Paula",
    rating: 5,
    text: "A entrega foi rápida e o resultado superou minhas expectativas. Recomendo para quem quer uma lembrança única e especial!",
    avatar: "AP",
  },
  {
    name: "Carlos Mendes",
    rating: 5,
    text: "Excelente trabalho! A miniatura ficou idêntica à foto. Vou fazer mais pedidos para presentear a família toda.",
    avatar: "CM",
  },
  {
    name: "Maria Santos",
    rating: 5,
    text: "Serviço incrível! A comunicação foi clara desde o início e o resultado final é simplesmente fantástico. Parabéns!",
    avatar: "MS",
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4">
            O que nossos <span className="bg-gradient-button bg-clip-text text-transparent">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de pessoas que já transformaram suas fotos em miniaturas incríveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="card-glow p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-accent text-accent" 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-muted-foreground leading-relaxed italic">
                "{testimonial.text}"
              </blockquote>
              
              {/* Decorative quote mark */}
              <div className="text-6xl text-primary/20 font-serif absolute top-4 right-6 group-hover:text-primary/40 transition-colors">
                "
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-center">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <span>200+ Avaliações 5 Estrelas</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-accent font-bold text-sm">✓</span>
            </div>
            <span>Garantia de Qualidade</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">24h</span>
            </div>
            <span>Suporte Rápido</span>
          </div>
        </div>
      </div>
    </section>
  );
}