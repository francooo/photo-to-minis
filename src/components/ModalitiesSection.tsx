import { MiniPerson3DScene } from "./MiniPerson3DScene";

export function ModalitiesSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-[100px] px-[5vw] relative bg-[hsl(var(--surface))] overflow-hidden" id="modalidades">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--border-custom)),transparent)' }} />

      <div className="max-w-[600px] mb-0">
        <div className="section-label">// Escolha sua modalidade</div>
        <h2 className="section-title">TRANSFORME-SE<br />EM UMA<br />MINIATURA 3D</h2>
        <div className="divider-accent" />
      </div>

      <div className="mt-14 max-w-[800px] mx-auto">
        {/* Person Card */}
        <div onClick={() => scrollTo("miniaturas")} className="relative overflow-hidden cursor-pointer min-h-[480px] flex flex-col justify-end group" style={{ background: 'linear-gradient(135deg, #0a0818, #141028)' }}>
          <MiniPerson3DScene />
          <div className="absolute inset-0 transition-opacity group-hover:opacity-85 z-[1]" style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.97) 0%, rgba(20,10,40,0.35) 50%, transparent 75%)' }} />
          <div className="absolute top-8 right-8 z-[3] font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--violet2))] border border-[rgba(139,92,246,0.3)] px-3 py-1 bg-[rgba(8,10,14,0.6)] backdrop-blur-sm">DESTAQUE</div>
          <div className="relative z-[2] p-10">
            <span className="inline-block font-mono-tech text-[0.62rem] tracking-[3px] uppercase px-3 py-1 mb-4 border text-[hsl(var(--violet2))] border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.08)]">// Sua imagem em 3D</span>
            <div className="font-bebas text-[2.2rem] tracking-[2px] text-white leading-none mb-3">VOCÊ<br />EM MINIATURA</div>
            <p className="text-[0.9rem] text-[hsl(var(--muted-foreground))] leading-[1.7] mb-6 max-w-[380px]">Envie sua foto e transformamos em uma miniatura fiel de você. Presente único, lembrança eterna — para datas especiais, presentes corporativos e muito mais.</p>
            <button className="inline-flex items-center gap-2 font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--violet2))] bg-transparent border-none cursor-pointer transition-all hover:gap-4">Criar minha miniatura →</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--violet))] to-transparent scale-x-0 origin-left transition-transform group-hover:scale-x-100 z-[2]" />
        </div>
      </div>
    </section>
  );
}
