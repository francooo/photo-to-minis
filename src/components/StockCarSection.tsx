import { useState, useMemo } from "react";
import { SC_CARS, SC_FILTERS, buildSCsvg, type StockCar } from "@/data/stockcars";

interface StockCarSectionProps {
  onOrderCar: (car: StockCar) => void;
}

export function StockCarSection({ onOrderCar }: StockCarSectionProps) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return SC_CARS.filter(c => filter === 'all' || c.maker === filter);
  }, [filter]);

  const makerBadgeStyle = (maker: string) => {
    if (maker === 'chevrolet') return { color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)', background: 'rgba(255,215,0,0.07)' };
    if (maker === 'toyota') return { color: '#ff4444', border: '1px solid rgba(255,50,50,0.3)', background: 'rgba(255,50,50,0.07)' };
    return { color: '#ff8888', border: '1px solid rgba(255,100,100,0.25)', background: 'rgba(255,80,80,0.06)' };
  };

  const makerLabel = (maker: string) => {
    if (maker === 'chevrolet') return 'Chevrolet';
    if (maker === 'toyota') return 'Toyota';
    return 'Mitsubishi';
  };

  return (
    <section className="py-[100px] px-[5vw] relative overflow-hidden" id="stockcar" style={{ background: 'hsl(var(--surface2))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,220,0,0.4),transparent)' }} />

      <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-[rgba(255,200,0,0.08)] border border-[rgba(255,200,0,0.25)] px-3 py-1 font-mono-tech text-[0.62rem] tracking-[3px] text-[#ffd700] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#ffd700] rounded-full shadow-[0_0_6px_#ffd700]" />
            BRB Stock Car Pro Series
          </div>
          <div className="section-label" style={{ color: '#ffd700' }}>// Temporada 2026</div>
          <h2 className="section-title">STOCK CAR<br /><span style={{ color: '#ffd700' }}>BRASIL 2026</span></h2>
          <div className="h-px w-[60px] my-5" style={{ background: 'linear-gradient(90deg,#ffd700,transparent)' }} />
          <p className="section-desc">Os três modelos SUV que disputam a principal categoria do automobilismo brasileiro com motor V8 naturalmente aspirado. 34 carros, 12 etapas, potência de sobra.</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2 flex-wrap">
            {SC_FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`font-mono-tech text-[0.63rem] tracking-[2px] uppercase px-4 py-1.5 border cursor-pointer transition-all ${filter === f.key ? 'border-[#ffd700] text-[#ffd700] bg-[rgba(255,215,0,0.07)]' : 'border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] bg-transparent hover:border-[#ffd700] hover:text-[#ffd700]'}`}
                style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--muted-foreground))] text-right">Motor V8 • SNG-02 • Hankook</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((car, i) => (
          <div key={car.id} className={`sc-card sc-card-${car.maker}`} style={{ animation: `fadeUp 0.4s ${(i % 4) * 0.06}s both` }}>
            <div className="w-full aspect-[16/8] flex items-center justify-center overflow-hidden relative" style={{ background: car.bg }}>
              <div dangerouslySetInnerHTML={{ __html: buildSCsvg(car) }} />
            </div>
            <div className="p-3 pb-5 border-t border-[hsl(var(--border-custom))]">
              <span className="inline-flex items-center gap-1.5 font-mono-tech text-[0.58rem] tracking-[2px] uppercase px-2 py-0.5 mb-2" style={makerBadgeStyle(car.maker)}>{makerLabel(car.maker)}</span>
              <div className="font-bebas text-[1.25rem] tracking-[2px] text-white leading-none">{car.name}</div>
              <div className="flex justify-between items-end mt-2">
                <div className="font-mono-tech text-[0.62rem] text-[hsl(var(--muted-foreground))] tracking-[1px] leading-[1.5]">
                  {car.driver}<br />
                  <span className="text-[0.58rem] opacity-60">{car.team}</span>
                </div>
                <div className="font-bebas text-[2rem] tracking-[1px] opacity-25 leading-none">#{car.num}</div>
              </div>
              <button className="sc-card-btn" onClick={() => onOrderCar(car)}>Imprimir Este Modelo</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px mt-12" style={{ background: 'hsl(var(--border-custom))' }}>
        {[
          { val: '34', label: 'Carros no Grid' },
          { val: '12', label: 'Etapas' },
          { val: 'V8', label: 'Motor Naturalmente Aspirado' },
        ].map(s => (
          <div key={s.label} className="text-center py-6 px-8" style={{ background: 'hsl(var(--bg))' }}>
            <div className="font-bebas text-[2rem] tracking-[2px]" style={{ color: '#ffd700' }}>{s.val}</div>
            <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
