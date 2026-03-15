import { useState, useRef } from "react";

export function NewUploadSection() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeedback(`✓ ${file.name} — PROCESSANDO...`);
    setTimeout(() => setFeedback('✓ ARQUIVO RECEBIDO — IA ANALISANDO GEOMETRIA'), 1500);
    setTimeout(() => setFeedback('✓ MODELO 3D GERADO — PRONTO PARA IMPRESSÃO!'), 4000);
  };

  const steps = [
    { num: '01', title: 'Upload da Foto', desc: 'JPG, PNG ou HEIC. Quanto mais nítida, melhor o modelo 3D.' },
    { num: '02', title: 'Análise por IA', desc: 'Identificação e reconstrução da geometria em 3D.' },
    { num: '03', title: 'Geração do STL/OBJ', desc: 'Arquivo compatível com qualquer impressora 3D.' },
    { num: '04', title: 'Impressão & Entrega', desc: 'Imprimimos ou você baixa o arquivo para imprimir.' },
  ];

  return (
    <section className="py-[100px] px-[5vw] relative overflow-hidden" id="upload" style={{ background: 'hsl(var(--surface2))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent 10%,hsl(var(--border-custom)) 50%,transparent 90%)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Info */}
        <div>
          <div className="section-label section-label-neon">// AI Converter</div>
          <h2 className="section-title">FOTO PARA<br />ARQUIVO 3D</h2>
          <div className="divider-neon" />
          <p className="section-desc">Envie uma foto — de você ou do seu carro — e nossa IA converte em arquivo 3D com precisão milimétrica, pronto para filamento ou resina.</p>

          <div className="flex flex-col gap-0 mt-8">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start pb-9 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-11 bottom-0 w-px" style={{ background: 'linear-gradient(rgba(0,212,255,0.3),transparent)' }} />
                )}
                <div className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center font-bebas text-[1.1rem] relative z-[1]" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: 'hsl(var(--neon))' }}>{step.num}</div>
                <div>
                  <div className="font-bebas text-[1.1rem] tracking-[2px] text-white mb-1">{step.title}</div>
                  <div className="text-[0.875rem] text-[hsl(var(--muted-foreground))] leading-[1.65]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upload zone */}
        <div>
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <svg className="w-[60px] h-[60px] mx-auto mb-6 opacity-70" viewBox="0 0 64 64" fill="none" style={{ color: 'hsl(var(--neon))' }}>
              <rect x="4" y="4" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
              <path d="M32 42 L32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 30 L32 22 L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 48 L44 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
            </svg>
            <div className="font-bebas text-[1.5rem] tracking-[3px] text-white mb-2">ARRASTE SUA FOTO</div>
            <div className="font-mono-tech text-[0.68rem] tracking-[2px] text-[hsl(var(--muted-foreground))] mb-6">Ou clique para selecionar — carro ou pessoa!</div>
            <div className="flex gap-2 justify-center mb-6">
              {['JPG', 'PNG', 'HEIC', 'WEBP'].map(f => (
                <span key={f} className="font-mono-tech text-[0.58rem] tracking-[1px] px-2 py-0.5 border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] uppercase">{f}</span>
              ))}
            </div>
            <button className="inline-block px-7 py-3 font-bebas text-[0.95rem] tracking-[3px] cursor-pointer border-none transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:-translate-y-0.5" style={{ background: 'hsl(var(--neon))', color: 'hsl(var(--bg))', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }} type="button">Selecionar Arquivo</button>
            {feedback && (
              <div className="mt-4 font-mono-tech text-[0.68rem] tracking-[2px]" style={{ color: 'hsl(var(--neon))' }}>{feedback}</div>
            )}
          </div>
          <div className="mt-6 border border-[hsl(var(--border-custom))] px-6 py-4 flex justify-between items-center" style={{ background: 'hsl(var(--surface))' }}>
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">TEMPO</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">2–5 <span className="text-[0.9rem] text-[hsl(var(--muted-foreground))]">MIN</span></div>
            </div>
            <div className="w-px h-[38px]" style={{ background: 'hsl(var(--border-custom))' }} />
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">FORMATOS</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">STL/OBJ</div>
            </div>
            <div className="w-px h-[38px]" style={{ background: 'hsl(var(--border-custom))' }} />
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">PRECISÃO</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">0.1<span className="text-[0.9rem] text-[hsl(var(--muted-foreground))]">MM</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
