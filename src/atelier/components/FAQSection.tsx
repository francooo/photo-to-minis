import { ChevronDown } from "lucide-react";
import { faqs } from "../atelier-content";

export default function FAQSection() {
  return (
    <section className="atelier-faq atelier-section" id="duvidas">
      <div className="atelier-container atelier-faq__grid">
        <div className="atelier-faq__intro">
          <p className="atelier-eyebrow">Um pouco mais de informação</p>
          <h2>Dúvidas de quem<br /><em>está imaginando.</em></h2>
          <p>Se não encontrou aqui o que precisa, você pode começar escolhendo uma foto e seguir a conversa com a equipe.</p>
          <a className="atelier-text-link" href="#pedido">Começar por uma foto <span aria-hidden="true">↗</span></a>
        </div>
        <div className="atelier-faq__list">
          {faqs.map((item, index) => (
            <details className="atelier-faq-item" key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><ChevronDown size={18} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
