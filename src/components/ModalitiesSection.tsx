import { Car3DScene } from "./Car3DScene";
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
        <h2 className="section-title">DUAS FORMAS<br />DE SE TORNAR<br />UMA MINIATURA</h2>
        <div className="divider-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] mt-14" style={{ background: 'hsl(var(--border-custom))' }}>
        {/* Car Card */}
        <div onClick={() => scrollTo("carros")} className="relative overflow-hidden cursor-pointer min-h-[480px] flex flex-col justify-end group" style={{ background: 'linear-gradient(135deg, #0a0f18, #111827)' }}>
          <Car3DScene />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,14,0.95)] via-[rgba(8,10,14,0.4)] to-transparent transition-opacity group-hover:opacity-85 z-[1]" />
          <div className="absolute top-8 right-8 z-[3] font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border-custom))] px-3 py-1 bg-[rgba(8,10,14,0.6)] backdrop-blur-sm">VELOZES E FURIOSOS</div>
          <div className="relative z-[2] p-10">
            <span className="inline-block font-mono-tech text-[0.62rem] tracking-[3px] uppercase px-3 py-1 mb-4 border text-[hsl(var(--accent-orange))] border-[rgba(232,80,10,0.4)] bg-[rgba(232,80,10,0.08)]">// Velozes & Furiosos</span>
            <div className="font-bebas text-[2.2rem] tracking-[2px] text-white leading-none mb-3">CARROS<br />ICÔNICOS</div>
            <p className="text-[0.9rem] text-[hsl(var(--muted-foreground))] leading-[1.7] mb-6 max-w-[380px]">Miniaturas dos carros mais lendários da franquia. Toyota Supra, Dodge Charger, Nissan Skyline e muito mais — em escala e alta fidelidade.</p>
            <button className="inline-flex items-center gap-2 font-mono-tech text-[0.7rem] tracking-[2px] uppercase text-[hsl(var(--accent-orange))] bg-transparent border-none cursor-pointer transition-all hover:gap-4">Ver catálogo completo →</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--accent-orange))] to-transparent scale-x-0 origin-left transition-transform group-hover:scale-x-100 z-[2]" />
        </div>

        {/* Person Card */}
        <div onClick={() => scrollTo("miniaturas")} className="relative overflow-hidden cursor-pointer min-h-[480px] flex flex-col justify-end group" style={{ background: 'linear-gradient(135deg, #0a0818, #141028)' }}>
          <MiniPerson3DScene />
          <div className="absolute inset-0 transition-opacity group-hover:opacity-85 z-[1]" style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.97) 0%, rgba(20,10,40,0.35) 50%, transparent 75%)' }} />
          <div className="absolute top-8 right-8 z-[3] font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--violet2))] border border-[rgba(139,92,246,0.3)] px-3 py-1 bg-[rgba(8,10,14,0.6)] backdrop-blur-sm">NOVO</div>
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
