import { Upload, Printer, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Envie sua Foto",
    description: "Faça upload da sua foto favorita através do nosso formulário seguro",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: Printer,
    title: "Nossa Impressora Cria sua Miniatura",
    description: "Processamos sua imagem e criamos uma miniatura 3D detalhada usando tecnologia de ponta",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    icon: Truck,
    title: "Receba em Casa",
    description: "Sua miniatura personalizada é entregue com segurança no endereço informado",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4">
            Como <span className="bg-gradient-button bg-clip-text text-transparent">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e rápido para transformar sua foto em uma miniatura 3D incrível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <Card className="card-glow p-8 h-full hover:scale-105 transition-all duration-300">
                <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-tech text-muted-foreground mb-2">
                    PASSO {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4 w-8 h-8 text-muted-foreground/50">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-card rounded-full px-8 py-4 border border-border">
            <div className="w-4 h-4 bg-accent rounded-full animate-glow"></div>
            <span className="font-medium">Prazo de entrega: 7 dias úteis</span>
          </div>
        </div>
      </div>
    </section>
  );
}