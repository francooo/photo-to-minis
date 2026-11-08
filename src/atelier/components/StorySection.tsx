import { ArrowUpRight } from "lucide-react";

export default function StorySection() {
  return (
    <section className="atelier-story" id="personalizacao">
      <div className="atelier-container atelier-story__grid">
        <div className="atelier-story__image-block">
          <img
            src="/images/mini-craque-ronaldo.webp"
            alt="Exemplo de miniatura esportiva personalizada impressa em 3D"
            loading="lazy"
          />
          <div className="atelier-story__image-caption">
            <span className="atelier-story__caption-mark">SM / 3D</span>
            <span>Uma referência vira uma peça feita para ficar.</span>
          </div>
          <span className="atelier-story__side-note">ESTUDO DE FORMA · PEÇA SOB ENCOMENDA</span>
        </div>

        <div className="atelier-story__copy">
          <p className="atelier-eyebrow">02 / Da imagem ao objeto</p>
          <h2>Mais do que uma miniatura. <em>Um pedaço da sua história.</em></h2>
          <p className="atelier-story__lead">
            Uma foto reúne gestos, traços e lembranças. Nosso processo traduz essas referências em um modelo tridimensional e, depois, em uma peça física feita para você.
          </p>
          <div className="atelier-story__detail">
            <span className="atelier-story__detail-number">01</span>
            <p><strong>Modelagem com tecnologia.</strong> A imagem orienta a reconstrução dos detalhes faciais e corporais.</p>
          </div>
          <div className="atelier-story__detail">
            <span className="atelier-story__detail-number">02</span>
            <p><strong>Impressão com atenção.</strong> Filamento PLA de alta qualidade e camadas finas ajudam a compor a peça.</p>
          </div>
          <a className="atelier-text-link" href="#processo">Veja como funciona <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
