import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="3D Max" className="w-10 h-10" />
          <span className="text-2xl font-tech font-bold text-glow">3D Max</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection("como-funciona")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection("galeria")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Galeria
          </button>
          <button
            onClick={() => scrollToSection("depoimentos")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Depoimentos
          </button>
          <a
            href="https://printpal.io/tools/3d-print-cost-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Calculadora de impressão
          </a>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Contato
          </button>
          <Link
            to="/fast-and-furious"
            className="flex items-center gap-1.5 text-sm font-bold transition-all duration-300 px-3 py-1.5 rounded-full border"
            style={{
              color: "#FF6B00",
              borderColor: "rgba(255,107,0,0.4)",
              background: "rgba(255,107,0,0.08)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,107,0,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(255,107,0,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,107,0,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            🏎️ Velozes e Furiosos
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            className="btn-hero"
            onClick={() => scrollToSection("upload")}
          >
            Peça sua Miniatura
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col space-y-4 p-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
            <Link
              to="/fast-and-furious"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 font-bold px-4 py-3 rounded-xl border w-full"
              style={{
                color: "#FF6B00",
                borderColor: "rgba(255,107,0,0.4)",
                background: "rgba(255,107,0,0.08)",
              }}
            >
              🏎️ Velozes e Furiosos
            </Link>
            <Button
              className="btn-hero w-full mt-4"
              onClick={() => scrollToSection("upload")}
            >
              Peça sua Miniatura
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}