import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, AlertCircle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CAR_MODELS: Record<string, { display_name: string; film: string; image_url: string; color: string }> = {
  supra: {
    display_name: "Toyota Supra MK4",
    film: "Velozes e Furiosos (2001)",
    image_url: "/cars/supra.png",
    color: "#FF6B00",
  },
  eclipse: {
    display_name: "Mitsubishi Eclipse",
    film: "Velozes e Furiosos (2001)",
    image_url: "/cars/eclipse.png",
    color: "#39FF14",
  },
  skyline: {
    display_name: "Nissan Skyline GT-R R34",
    film: "2 Fast 2 Furious (2003)",
    image_url: "/cars/skyline.png",
    color: "#00C8FF",
  },
};

export default function CarOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const model = searchParams.get("model") || "";
  const carData = CAR_MODELS[model];

  useEffect(() => {
    if (!carData) {
      navigate("/fast-and-furious", { replace: true });
    }
  }, [carData, navigate]);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!carData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({ title: "Nome obrigatório", description: "Por favor, preencha seu nome completo", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "E-mail obrigatório", description: "Por favor, preencha seu e-mail", variant: "destructive" });
      return;
    }
    if (!formData.phone.trim()) {
      toast({ title: "Telefone obrigatório", description: "Por favor, preencha seu telefone", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("phone", formData.phone.trim());
      formDataToSend.append("order_type", "car_miniature");
      formDataToSend.append("model_name", model);
      formDataToSend.append("model_display_name", carData.display_name);
      formDataToSend.append("model_image_url", carData.image_url);
      formDataToSend.append("source_page", "fast-and-furious");

      const { error } = await supabase.functions.invoke("create-order", {
        body: formDataToSend,
      });

      if (error) throw new Error("Failed to submit order");

      setIsSuccess(true);
      toast({ title: "Pedido enviado com sucesso!", description: "Entraremos em contato em breve para confirmar os detalhes" });
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({ title: "Erro ao enviar pedido", description: "Tente novamente ou entre em contato conosco", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <Card className="card-glow max-w-2xl mx-auto text-center p-12">
            <div className="w-20 h-20 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Pedido Enviado!</h3>
            <p className="text-muted-foreground mb-6">
              Recebemos seu pedido da miniatura <strong>{carData.display_name}</strong>. Nossa equipe entrará em contato em até 24 horas para confirmar os detalhes e informar o prazo de entrega.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={() => setIsSuccess(false)} className="btn-hero">
                Fazer Novo Pedido
              </Button>
              <Button onClick={() => navigate("/fast-and-furious")} variant="outline">
                Voltar à Coleção
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4">
            Encomendar <span className="bg-gradient-button bg-clip-text text-transparent">Miniatura</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Preencha seus dados para encomendar a miniatura do {carData.display_name}
          </p>
        </div>

        <Card className="card-glow max-w-2xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Car preview — replaces the photo upload */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Modelo Selecionado</Label>
              <div className="rounded-lg border-2 border-muted p-6 text-center" style={{ borderColor: `${carData.color}44` }}>
                <div className="relative mx-auto mb-4 max-w-xs">
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-30"
                    style={{ background: carData.color }}
                  />
                  <img
                    src={carData.image_url}
                    alt={carData.display_name}
                    className="relative w-full h-auto object-contain drop-shadow-lg"
                  />
                </div>
                <div className="font-bold text-lg" style={{ color: carData.color }}>
                  {carData.display_name}
                </div>
                <div className="text-sm text-muted-foreground">{carData.film}</div>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary">
                  <Check className="w-4 h-4" />
                  Imagem do modelo já incluída automaticamente
                </div>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Nome Completo *</Label>
                <Input
                  id="name" name="name" type="text" required
                  value={formData.name} onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="h-12 text-base form-input" autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">E-mail *</Label>
                <Input
                  id="email" name="email" type="email" required
                  value={formData.email} onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className="h-12 text-base form-input" autoComplete="email"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">Telefone *</Label>
              <Input
                id="phone" name="phone" type="tel" required
                value={formData.phone} onChange={handleInputChange}
                placeholder="Digite seu telefone"
                className="h-12 text-base form-input" autoComplete="tel"
              />
            </div>

            {/* Tip */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Car className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <strong>Info:</strong> Sua miniatura será uma réplica fiel do <strong>{carData.display_name}</strong> do filme <strong>{carData.film}</strong>, produzida em impressão 3D de alta qualidade.
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta w-full text-lg py-6 h-14"
            >
              {isSubmitting ? "Enviando..." : "Finalizar Encomenda"}
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate("/fast-and-furious")} className="text-muted-foreground">
            ← Voltar à coleção Velozes & Furiosos
          </Button>
        </div>
      </div>
    </section>
  );
}
