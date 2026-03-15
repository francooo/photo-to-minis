export function NewHowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: <svg className="w-[34px] h-[34px]" viewBox="0 0 36 36" fill="none" style={{ color: 'hsl(var(--accent-orange))' }}><rect x="3" y="3" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 28L13 21L18 26L25 17L30 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
      title: 'Envie a Foto',
      desc: 'Carro ou pessoa — qualquer foto nítida serve de base para o modelo 3D.'
    },
    {
      num: '02',
      icon: <svg className="w-[34px] h-[34px]" viewBox="0 0 36 36" fill="none" style={{ color: 'hsl(var(--accent-orange))' }}><path d="M18 6L30 12V24L18 30L6 24V12L18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M18 6V18M30 12L18 18M6 12L18 18" stroke="currentColor" strokeWidth="1" opacity="0.5"/></svg>,
      title: 'IA Gera o 3D',
      desc: 'Geometria, proporções e detalhes mapeados automaticamente com visão computacional.'
    },
    {
      num: '03',
      icon: <svg className="w-[34px] h-[34px]" viewBox="0 0 36 36" fill="none" style={{ color: 'hsl(var(--accent-orange))' }}><path d="M8 28V16L18 8L28 16V28H22V22H14V28H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      title: 'Impressão 3D',
      desc: 'Filamento FDM ou resina de alta resolução. Camadas de 0.05 a 0.2mm.'
    },
    {
      num: '04',
      icon: <svg className="w-[34px] h-[34px]" viewBox="0 0 36 36" fill="none" style={{ color: 'hsl(var(--accent-orange))' }}><path d="M12 30L6 24L18 12L30 24L24 30H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M18 6V9M30 18H27M18 30V27M6 18H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Embalagem & Envio',
      desc: 'Embalagem antiimpacto e envio seguro para todo o Brasil.'
    }
  ];

  return (
    <section className="py-[100px] px-[5vw] relative" id="processo" style={{ background: 'hsl(var(--bg))' }}>
      <div>
        <div className="section-label">// Processo Completo</div>
        <h2 className="section-title">DO UPLOAD À<br />MINIATURA</h2>
        <div className="divider-accent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-12" style={{ background: 'hsl(var(--border-custom))' }}>
        {steps.map((step, i) => (
          <div key={step.num} className="how-item relative">
            <div className="font-bebas text-[3.8rem] leading-none mb-3 transition-colors" style={{ color: 'hsl(var(--border-custom))' }}>{step.num}</div>
            <div className="mb-3">{step.icon}</div>
            <div className="font-bebas text-[1.1rem] tracking-[2px] text-white mb-1">{step.title}</div>
            <div className="text-[0.85rem] text-[hsl(var(--muted-foreground))] leading-[1.7]">{step.desc}</div>
            {i < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-[1] text-[0.7rem]" style={{ background: 'hsl(var(--bg))', border: '1px solid hsl(var(--border-custom))', color: 'hsl(var(--accent-orange))' }}>→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
