import { ArrowUpRight } from "lucide-react";
import { collections } from "../atelier-content";

export default function CollectionSection() {
  return (
    <section className="atelier-collections atelier-section" id="modelos">
      <div className="atelier-container">
        <div className="atelier-section-heading atelier-section-heading--split">
          <div>
            <p className="atelier-eyebrow">01 / Um objeto que é seu</p>
            <h2>Pequena no tamanho.<br /><em>Grande na história.</em></h2>
          </div>
          <p className="atelier-section-heading__aside">
            Cada peça nasce de uma referência pessoal — e ganha seu próprio lugar na estante, na memória ou no presente.
          </p>
        </div>

        <div className="atelier-collection-grid">
          {collections.map((item) => (
            <article className={`atelier-collection-card ${item.className}`} key={item.number}>
              <a className="atelier-collection-card__image" href="#pedido" aria-label={`Começar uma encomenda: ${item.title}`}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="atelier-collection-card__number">{item.number}</span>
                <span className="atelier-collection-card__arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </a>
              <div className="atelier-collection-card__copy">
                <p className="atelier-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="atelier-collections__footer">
          <span>Uma peça única começa com uma boa história.</span>
          <a className="atelier-text-link" href="#pedido">Conte a sua <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
