import ronaldinhoBust from "@/assets/ronaldinho-bust.jpg";

export function NewHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-[5vw] pt-[120px] pb-[80px] overflow-hidden" id="home">
      {/* Background image: Ronaldinho bust miniature */}
      <img
        src={ronaldinhoBust}
        alt="Miniatura 3D do busto de Ronaldinho Gaúcho impressa em filamento PLA"
        width={1600}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover object-right z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse 55% 90% at 72% 50%, transparent 25%, rgba(8,10,14,0.78) 65%), linear-gradient(90deg, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.55) 45%, transparent 75%), radial-gradient(ellipse 70% 50% at 15% 85%, rgba(232,80,10,0.08) 0%, transparent 55%)'
      }} />

      {/* Grid */}
      <div className="absolute inset-0 z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(30,42,56,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,56,0.28) 1px, transparent 1px)',
        backgroundSize: '55px 55px',
        maskImage: 'radial-gradient(ellipse 95% 95% at 50% 50%, black 15%, transparent 80%)'
      }} />

      {/* Content */}
      <div className="relative z-[2] max-w-[680px]">
        <div className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.07)] border border-[rgba(0,212,255,0.22)] px-4 py-1.5 mb-7 font-mono-tech text-[0.68rem] tracking-[3px] text-[hsl(var(--neon))] uppercase">
          <span className="w-1.5 h-1.5 bg-[hsl(var(--neon))] rounded-full shadow-[0_0_8px_hsl(var(--neon))] animate-pulse" />
          Impressão 3D Personalizada
        </div>

        <h1 className="font-bebas text-[clamp(3.2rem,7.5vw,6.8rem)] leading-[0.88] tracking-[1px] text-white">
          <span>SUA</span>
          <span className="block text-[hsl(var(--accent-orange))]">MINIATURA</span>
          <span className="block text-transparent" style={{ WebkitTextStroke: '1px rgba(0,212,255,0.45)', opacity: 0.65 }}>EM 3D</span>
        </h1>

        <p className="mt-6 text-[1.05rem] text-[hsl(var(--muted-foreground))] leading-[1.75] max-w-[510px]">
          Da sua foto a uma miniatura perfeita de você mesmo. Impressão 3D em filamento PLA de alta precisão para presentes únicos, lembranças e colecionadores exigentes.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <button onClick={() => document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary-site">Ver Modalidades</button>
          <button onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-site">Criar Minha Miniatura</button>
        </div>

      </div>
    </section>
  );
}
