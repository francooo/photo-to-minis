import { ArrowDown, ArrowUpRight, Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="atelier-hero">
      <div className="atelier-container atelier-hero__grid">
        <div className="atelier-hero__copy">
          <p className="atelier-eyebrow"><span className="atelier-eyebrow__dot" /> Uma peça feita a partir da sua foto</p>
          <h1>Uma lembrança<br />com a sua <em>forma.</em></h1>
          <p className="atelier-hero__intro">
            Transformamos sua foto em uma miniatura 3D pessoal, impressa em PLA com cuidado de ateliê. Um presente para guardar — e contar.
          </p>
          <div className="atelier-hero__actions">
            <a className="atelier-button" href="#pedido">Comece com uma foto <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="atelier-text-link" href="#processo">Conheça o processo <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <div className="atelier-proof-list" aria-label="Características do serviço">
            <span><Check size={14} aria-hidden="true" /> Peça personalizada</span>
            <span><Check size={14} aria-hidden="true" /> Impressão em PLA</span>
          </div>
        </div>

        <figure className="atelier-hero__visual">
          <div className="atelier-hero__image-wrap">
            <img
              src="/images/ronaldinho-bust.webp"
              alt="Miniatura 3D personalizada de um jogador de futebol, impressa em filamento PLA"
              // React 18 só repassa o atributo em minúsculas (fetchPriority em camelCase é do React 19)
              {...{ fetchpriority: "high" }}
            />
            <span className="atelier-image-note">Uma história<br /><em>em forma.</em></span>
          </div>
          <figcaption>
            <span>Feita sob encomenda</span>
            <span className="atelier-hero__caption-dot" />
            <span>Enviamos para todo o Brasil</span>
          </figcaption>
          <span className="atelier-hero__index" aria-hidden="true">01 <i>/</i> 04</span>
        </figure>
      </div>
      <div className="atelier-container atelier-hero__bottomline" aria-hidden="true">
        <span>Objeto com memória</span><span>—</span><span>Modelado com cuidado</span><span>—</span><span>Feito para durar</span>
      </div>
    </section>
  );
}
