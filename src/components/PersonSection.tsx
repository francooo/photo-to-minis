import { Link } from "react-router-dom";
import { MiniatureFigure3D } from "./MiniatureFigure3D";

const steps = [
  { num: '01', title: 'Envie sua Foto', desc: 'Uma foto frontal nítida é suficiente. Para maior fidelidade, envie também de perfil.' },
  { num: '02', title: 'IA Reconstrói seu Rosto', desc: 'Algoritmo mapeia traços faciais, proporções corporais e expressão para gerar a geometria 3D.' },
  { num: '03', title: 'Revisão e Ajuste', desc: 'Você aprova o preview digital antes de mandarmos para impressão.' },
  { num: '04', title: 'Impressão & Entrega', desc: 'Filamento PLA de alta qualidade com camadas de 0.1mm para máxima fidelidade.' },
];

const chips = ['Aniversário', 'Casamento', 'Corporativo', 'Action figure', 'Lembrança'];

export function PersonSection() {
  return (
    <section className="py-[100px] px-[5vw] relative overflow-hidden" id="miniaturas" style={{ background: 'hsl(var(--surface3))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual placeholder */}
        <div className="relative">
          <div className="w-full aspect-[1/1.1] rounded-lg overflow-hidden">
            <MiniatureFigure3D />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-tech text-[0.6rem] tracking-[3px] uppercase whitespace-nowrap" style={{ color: 'rgba(139,92,246,0.5)' }}>Miniatura gerada via IA + impressão 3D</div>
        </div>

        {/* Content */}
        <div>
          <div className="section-label section-label-violet">// Sua Imagem em 3D</div>
          <h2 className="section-title">DE FOTO A<br /><span style={{ color: 'hsl(var(--violet2))' }}>MINIATURA</span><br />REAL</h2>
          <div className="divider-violet" />
          <p className="section-desc">Nossa tecnologia de IA analisa sua foto, reconstrói sua geometria facial e corporal e gera um arquivo 3D preciso — pronto para impressão em filamento ou resina de alta definição.</p>

          <div className="flex flex-col gap-0 mt-9">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start pb-9 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-11 bottom-0 w-px" style={{ background: 'linear-gradient(rgba(139,92,246,0.3),transparent)' }} />
                )}
                <div className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center font-bebas text-[1.1rem] relative z-[1]" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: 'hsl(var(--violet2))' }}>{step.num}</div>
                <div>
                  <div className="font-bebas text-[1.1rem] tracking-[2px] text-white mb-1">{step.title}</div>
                  <div className="text-[0.875rem] text-[hsl(var(--muted-foreground))] leading-[1.65]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6 flex-wrap">
            {chips.map(c => (
              <div key={c} className="px-4 py-2 font-mono-tech text-[0.62rem] tracking-[1px] border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--violet2))] hover:text-[hsl(var(--violet2))] transition-all cursor-default" style={{ background: 'hsl(var(--surface))' }}>{c}</div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Link to="/calculadora" className="btn-violet-site">Calcular Preço</Link>
            <button onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-site">Enviar Foto</button>
          </div>
        </div>
      </div>
    </section>
  );
}
