import { Link } from "react-router-dom";

export function NewFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border-custom))] px-[5vw] pt-16 pb-8" style={{ background: 'hsl(var(--surface))' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[hsl(var(--border-custom))] mb-8">
        <div>
          <div className="font-bebas text-[1.6rem] tracking-[3px] text-white mb-3 leading-none">
            SUA<span className="text-[hsl(var(--accent-orange))]">MINIATURA</span><em className="text-[hsl(var(--neon))] not-italic">3D</em>
          </div>
          <p className="text-[0.875rem] text-[hsl(var(--muted-foreground))] leading-[1.7] max-w-[280px] mb-5">
            Transformamos fotos em miniaturas 3D personalizadas. Presentes únicos, lembranças e peças colecionáveis com impressão de alta precisão.
          </p>
          <div className="flex gap-3">
            {['IG', 'YT', 'WA', 'TK'].map(s => (
              <a key={s} href="#" className="w-9 h-9 border border-[hsl(var(--border-custom))] flex items-center justify-center text-[hsl(var(--muted-foreground))] text-[0.72rem] no-underline hover:border-[hsl(var(--accent-orange))] hover:text-[hsl(var(--accent-orange))] hover:bg-[rgba(232,80,10,0.07)] transition-all">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bebas text-[0.95rem] tracking-[3px] text-white mb-4">Modalidades</div>
          <ul className="flex flex-col gap-2.5 list-none">
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Miniatura Pessoal</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Carros Velozes e Furiosos</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Impressão Filamento</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Impressão Resina</a></li>
          </ul>
        </div>

        <div>
          <div className="font-bebas text-[0.95rem] tracking-[3px] text-white mb-4">Serviços</div>
          <ul className="flex flex-col gap-2.5 list-none">
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Converter Foto → 3D</a></li>
            <li><Link to="/calculadora" className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors">Calculadora de Custo</Link></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Impressão Premium</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Kits Colecionáveis</a></li>
          </ul>
        </div>

        <div>
          <div className="font-bebas text-[0.95rem] tracking-[3px] text-white mb-4">Informações</div>
          <ul className="flex flex-col gap-2.5 list-none">
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Sobre nós</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Prazo de Entrega</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">FAQ</a></li>
            <li><a className="text-[0.875rem] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">Contato</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase">© 2024 Sua Miniatura em 3D — Todos os direitos reservados</div>
        <div className="flex gap-8">
          {['Política de Privacidade', 'Termos de Uso', 'Trocas e Devoluções'].map(l => (
            <a key={l} className="font-mono-tech text-[0.63rem] tracking-[1px] text-[hsl(var(--muted-foreground))] no-underline hover:text-[hsl(var(--accent-orange))] transition-colors cursor-pointer">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
