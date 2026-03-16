import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-[5vw] h-[70px] bg-[rgba(8,10,14,0.92)] backdrop-blur-[20px] border-b border-[hsl(var(--border-custom))]">
      <Link to="/" className="font-bebas text-[1.45rem] tracking-[2px] text-white no-underline leading-none">
        SUA<span className="text-[hsl(var(--accent-orange))]">MINIATURA</span><em className="text-[hsl(var(--neon))] not-italic">3D</em>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden lg:flex gap-8 list-none">
        <li><button onClick={() => scrollToSection("modalidades")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Modalidades</button></li>
        <li><button onClick={() => scrollToSection("carros")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Catálogo V&F</button></li>
        <li><button onClick={() => scrollToSection("miniaturas")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Miniatura Pessoal</button></li>
        <li><button onClick={() => scrollToSection("stockcar")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Stock Car 2026</button></li>
        <li><button onClick={() => scrollToSection("f1")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Fórmula 1</button></li>
        <li><button onClick={() => scrollToSection("processo")} className="font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--neon))] transition-colors bg-transparent border-none cursor-pointer">Como Funciona</button></li>
      </ul>

      {/* Desktop Actions */}
      <div className="hidden lg:flex gap-3 items-center">
        <Link to="/calculadora" className="nav-cta-ghost">Calculadora</Link>
        <button onClick={() => scrollToSection("upload")} className="nav-cta">Criar Minha Mini</button>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white text-2xl bg-transparent border-none cursor-pointer">
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border-custom))] lg:hidden flex flex-col p-6 gap-4 z-50">
          <button onClick={() => scrollToSection("modalidades")} className="font-mono-tech text-[0.75rem] tracking-[2px] uppercase text-left text-[hsl(var(--muted-foreground))] bg-transparent border-none cursor-pointer">Modalidades</button>
          <button onClick={() => scrollToSection("carros")} className="font-mono-tech text-[0.75rem] tracking-[2px] uppercase text-left text-[hsl(var(--muted-foreground))] bg-transparent border-none cursor-pointer">Catálogo V&F</button>
          <button onClick={() => scrollToSection("miniaturas")} className="font-mono-tech text-[0.75rem] tracking-[2px] uppercase text-left text-[hsl(var(--muted-foreground))] bg-transparent border-none cursor-pointer">Miniatura Pessoal</button>
          <button onClick={() => scrollToSection("stockcar")} className="font-mono-tech text-[0.75rem] tracking-[2px] uppercase text-left text-[hsl(var(--muted-foreground))] bg-transparent border-none cursor-pointer">Stock Car 2026</button>
          <button onClick={() => scrollToSection("processo")} className="font-mono-tech text-[0.75rem] tracking-[2px] uppercase text-left text-[hsl(var(--muted-foreground))] bg-transparent border-none cursor-pointer">Como Funciona</button>
          <Link to="/calculadora" onClick={() => setIsMenuOpen(false)} className="nav-cta-ghost text-center">Calculadora</Link>
          <button onClick={() => scrollToSection("upload")} className="nav-cta text-center">Criar Minha Mini</button>
        </div>
      )}
    </nav>
  );
}
