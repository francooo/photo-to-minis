import { Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer id="contato" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="3D Max" className="w-8 h-8" />
              <span className="text-xl font-tech font-bold">3D Max</span>
            </div>
            <p className="text-muted-foreground">
              Transformando fotos em miniaturas 3D incríveis desde 2023.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Links Úteis</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Política de Privacidade</div>
              <div>Termos de Uso</div>
              <div>FAQ</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>contato@3dmax.com.br</div>
              <div>(11) 99999-9999</div>
              <div>São Paulo, SP</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Redes Sociais</h4>
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer" />
              <MessageCircle className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 3D Max. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}