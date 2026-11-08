import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Miniaturas", href: "#modelos" },
  { label: "Como funciona", href: "#processo" },
  { label: "Para presentear", href: "#ocasioes" },
  { label: "Dúvidas", href: "#duvidas" },
];

export default function AtelierHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="atelier-header">
      <div className="atelier-container atelier-header__inner">
        <a className="atelier-brand" href="#inicio" aria-label="Sua Miniatura 3D — início">
          <span className="atelier-brand__mark" aria-hidden="true">sm</span>
          <span className="atelier-brand__name">sua miniatura<sup>3D</sup></span>
        </a>

        <nav className="atelier-nav atelier-nav--desktop" aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <a className="atelier-button atelier-button--header" href="#pedido">
          <span>Começar uma peça</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="atelier-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="atelier-nav atelier-nav--mobile" aria-label="Navegação para celular">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="atelier-nav__mobile-cta" href="#pedido" onClick={() => setMenuOpen(false)}>
            Começar uma peça <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
