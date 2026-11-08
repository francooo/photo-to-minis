import { Camera, PackageCheck, Printer, ScanFace } from "lucide-react";
import { processSteps } from "../atelier-content";

const stepIcons = [Camera, ScanFace, Printer, PackageCheck];

export default function ProcessSection() {
  return (
    <section className="atelier-process atelier-section" id="processo">
      <div className="atelier-container">
        <div className="atelier-process__intro">
          <div>
            <p className="atelier-eyebrow">03 / Do upload à miniatura</p>
            <h2>Um caminho simples.<br /><em>Um resultado só seu.</em></h2>
          </div>
          <p>Da foto à peça pronta, cada etapa aproxima sua lembrança de uma forma que você pode segurar.</p>
        </div>

        <div className="atelier-process__steps">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article className="atelier-process-step" key={step.number}>
                <div className="atelier-process-step__top">
                  <span className="atelier-process-step__number">{step.number}</span>
                  <span className="atelier-process-step__icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="atelier-process__material">
          <span className="atelier-material-seal" aria-hidden="true">PLA</span>
          <p><strong>Impressa em PLA.</strong> Uma escolha de material de qualidade, com camadas de 0,1 a 0,2 mm para definição cuidadosa.</p>
          <span className="atelier-material-spec">CAMADAS<br />0,1—0,2 MM</span>
        </div>
      </div>
    </section>
  );
}
