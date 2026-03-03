import { useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function UploadSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione apenas imagens (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Por favor, selecione uma imagem menor que 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, preencha seu nome completo",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, preencha seu e-mail",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Telefone obrigatório",
        description: "Por favor, preencha seu telefone",
        variant: "destructive",
      });
      return;
    }
    
    if (!file) {
      toast({
        title: "Foto obrigatória",
        description: "Por favor, selecione uma foto para continuar",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("phone", formData.phone.trim());
      formDataToSend.append("photo", file);
      formDataToSend.append("source_page", "home");

      const { data, error } = await supabase.functions.invoke("create-order", {
        body: formDataToSend,
      });

      if (error) {
        throw new Error("Failed to submit order");
      }

      setIsSuccess(true);
      toast({
        title: "Pedido enviado com sucesso!",
        description: "Entraremos em contato em breve para confirmar os detalhes",
      });

      setFormData({ name: "", email: "", phone: "" });
      setFile(null);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Erro ao enviar pedido",
        description: "Tente novamente ou entre em contato conosco",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="upload" className="py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <Card className="card-glow max-w-2xl mx-auto text-center p-12">
            <div className="w-20 h-20 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Pedido Enviado!</h3>
            <p className="text-muted-foreground mb-6">
              Recebemos sua foto e dados. Nossa equipe entrará em contato em até 24 horas para confirmar os detalhes e informar o prazo de entrega.
            </p>
            <Button 
              onClick={() => setIsSuccess(false)}
              className="btn-hero"
              data-testid="button-new-order"
            >
              Fazer Novo Pedido
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4">
            Faça seu <span className="bg-gradient-button bg-clip-text text-transparent">Pedido</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Preencha seus dados e envie sua foto favorita para criarmos sua miniatura personalizada
          </p>
        </div>

        <Card className="card-glow max-w-2xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="h-12 text-base form-input"
                  autoComplete="name"
                  data-testid="input-name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className="h-12 text-base form-input"
                  autoComplete="email"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Telefone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Digite seu telefone"
                className="h-12 text-base form-input"
                autoComplete="tel"
                data-testid="input-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-foreground font-medium">
                Sua Foto *
              </Label>
              <div 
                className="file-upload-area"
                onClick={() => document.getElementById('photo')?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    document.getElementById('photo')?.click();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Selecionar foto"
                data-testid="button-upload-photo"
              >
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                  data-testid="input-photo"
                />
                <div className="flex flex-col items-center space-y-4 w-full h-full">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  {file ? (
                    <div className="text-primary font-medium" data-testid="text-selected-file">
                      {file.name}
                    </div>
                  ) : (
                    <div>
                      <div className="text-foreground font-medium mb-1">
                        Clique para enviar sua foto
                      </div>
                      <div className="text-sm text-muted-foreground">
                        JPG, PNG até 10MB
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <strong>Dica:</strong> Para melhores resultados, envie uma foto de alta qualidade com boa iluminação, 
                  onde a pessoa apareça de corpo inteiro ou meio corpo, sem objetos na frente.
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta w-full text-lg py-6 h-14"
              data-testid="button-submit"
            >
              {isSubmitting ? "Enviando..." : "Enviar Foto e Criar Minha Miniatura"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
