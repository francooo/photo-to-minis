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
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione apenas imagens (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 10MB)
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
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('miniature-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('miniature-photos')
        .getPublicUrl(filePath);

      // Save order to database
      const { error: dbError } = await supabase
        .from('miniature_orders')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          photo_url: urlData.publicUrl,
          photo_path: filePath,
        });

      if (dbError) throw dbError;

      // Send email notification
      try {
        await supabase.functions.invoke('send-order-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            photo_url: urlData.publicUrl
          }
        });
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't block the success flow if email fails
      }

      setIsSuccess(true);
      toast({
        title: "Pedido enviado com sucesso!",
        description: "Entraremos em contato em breve para confirmar os detalhes",
      });

      // Reset form
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
                <Label htmlFor="name" className="text-foreground font-medium">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">Telefone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-foreground font-medium">Sua Foto *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors bg-muted/30">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  {file ? (
                    <div className="text-primary font-medium">
                      ✓ {file.name}
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
                </label>
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
              className="btn-cta w-full text-lg py-6"
            >
              {isSubmitting ? "Enviando..." : "Enviar Foto e Criar Minha Miniatura"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}