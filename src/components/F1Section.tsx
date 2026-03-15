import { useState, useMemo } from "react";
import { F1_CARS, F1_FILTERS, buildF1svg, teamLabel, teamBadgeStyle, type F1Car } from "@/data/f1cars";

interface F1SectionProps {
  onOrderCar: (car: F1Car) => void;
}

export function F1Section({ onOrderCar }: F1SectionProps) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return F1_CARS.filter(c => filter === 'all' || c.team === filter);
  }, [filter]);

  return (
    <section className="py-[100px] px-[5vw] relative overflow-hidden" id="f1" style={{ background: 'hsl(var(--surface3))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,0,0,0.4),transparent)' }} />

      <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-[rgba(255,0,0,0.08)] border border-[rgba(255,0,0,0.25)] px-3 py-1 font-mono-tech text-[0.62rem] tracking-[3px] text-[#ff2200] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#ff2200] rounded-full shadow-[0_0_6px_#ff2200]" />
            FIA Formula 1 World Championship
          </div>
          <div className="section-label" style={{ color: '#ff2200' }}>// Temporada 2026</div>
          <h2 className="section-title">FÓRMULA 1<br /><span style={{ color: '#ff2200' }}>TEMPORADA 2026</span></h2>
          <div className="h-px w-[60px] my-5" style={{ background: 'linear-gradient(90deg,#ff2200,transparent)' }} />
          <p className="section-desc">Os 20 carros que disputam o campeonato mundial. 10 equipes, 24 GPs, a maior velocidade do automobilismo. Miniaturas fiéis com pintura e detalhes de cada escuderia.</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2 flex-wrap max-w-[600px]">
            {F1_FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`font-mono-tech text-[0.63rem] tracking-[2px] uppercase px-4 py-1.5 border cursor-pointer transition-all ${filter === f.key ? 'border-[#ff2200] text-[#ff2200] bg-[rgba(255,0,0,0.07)]' : 'border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] bg-transparent hover:border-[#ff2200] hover:text-[#ff2200]'}`}
                style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--muted-foreground))] text-right">Hybrid V6 • DRS • Pirelli</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((car, i) => (
          <div key={car.id} className="sc-card" style={{ animation: `fadeUp 0.4s ${(i % 4) * 0.06}s both`, borderColor: 'rgba(255,0,0,0.12)' }}>
            <div className="w-full aspect-[16/8] flex items-center justify-center overflow-hidden relative" style={{ background: car.bg }}>
              <div dangerouslySetInnerHTML={{ __html: buildF1svg(car) }} />
            </div>
            <div className="p-3 pb-5 border-t border-[hsl(var(--border-custom))]">
              <span className="inline-flex items-center gap-1.5 font-mono-tech text-[0.58rem] tracking-[2px] uppercase px-2 py-0.5 mb-2" style={teamBadgeStyle(car.team)}>{teamLabel(car.team)}</span>
              <div className="font-bebas text-[1.25rem] tracking-[2px] text-white leading-none">{car.name}</div>
              <div className="flex justify-between items-end mt-2">
                <div className="font-mono-tech text-[0.62rem] text-[hsl(var(--muted-foreground))] tracking-[1px] leading-[1.5]">
                  {car.driver}
                </div>
                <div className="font-bebas text-[2rem] tracking-[1px] opacity-25 leading-none">#{car.num}</div>
              </div>
              <button className="sc-card-btn" style={{ background: 'linear-gradient(90deg, #ff2200, #cc1100)', borderColor: 'rgba(255,34,0,0.4)' }} onClick={() => onOrderCar(car)}>Imprimir Este Modelo</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px mt-12" style={{ background: 'hsl(var(--border-custom))' }}>
        {[
          { val: '20', label: 'Pilotos no Grid' },
          { val: '24', label: 'Grandes Prêmios' },
          { val: 'V6', label: 'Hybrid Turbo' },
        ].map(s => (
          <div key={s.label} className="text-center py-6 px-8" style={{ background: 'hsl(var(--bg))' }}>
            <div className="font-bebas text-[2rem] tracking-[2px]" style={{ color: '#ff2200' }}>{s.val}</div>
            <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
