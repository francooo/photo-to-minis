import { ArrowUpRight } from "lucide-react";

export default function AtelierFooter() {
  return (
    <footer className="atelier-footer">
      <div className="atelier-container">
        <div className="atelier-footer__main">
          <a className="atelier-brand atelier-brand--footer" href="#inicio" aria-label="Sua Miniatura 3D — voltar ao início">
            <span className="atelier-brand__mark" aria-hidden="true">sm</span>
            <span className="atelier-brand__name">sua miniatura<sup>3D</sup></span>
          </a>
          <p>Fotos que viram formas.<br />Lembranças feitas para ficar.</p>
          <a className="atelier-footer__cta" href="#pedido">Comece com uma foto <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="atelier-footer__bottom">
          <span>© Sua Miniatura 3D · Peças feitas sob encomenda</span>
          <nav aria-label="Links do rodapé">
            <a href="#modelos">Miniaturas</a>
            <a href="#processo">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a href="#inicio" className="atelier-footer__back">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
