import { useState, useMemo } from "react";
import { CARS, FILM_FILTERS, DRIVER_FILTERS, buildCarSVG, driverBadgeStyle, type Car } from "@/data/cars";

interface CarsSectionProps {
  onOrderCar: (car: Car) => void;
}

export function CarsSection({ onOrderCar }: CarsSectionProps) {
  const [filmFilter, setFilmFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');

  const filtered = useMemo(() => {
    return CARS.filter(c => {
      const filmOk = filmFilter === 'all' || c.film === filmFilter;
      const driverOk = driverFilter === 'all' || c.driver === driverFilter;
      return filmOk && driverOk;
    });
  }, [filmFilter, driverFilter]);

  return (
    <section className="py-[100px] px-[5vw] relative" id="carros" style={{ background: 'hsl(var(--bg))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--border-custom)),transparent)' }} />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-4">
        <div>
          <div className="section-label">// Catálogo Velozes e Furiosos</div>
          <h2 className="section-title">TODOS OS CARROS<br />DA FRANQUIA</h2>
          <div className="divider-accent" />
          <p className="text-[0.85rem] text-[hsl(var(--muted-foreground))] -mt-2">{filtered.length} modelo{filtered.length !== 1 ? 's' : ''} da franquia</p>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <div className="flex gap-2 flex-wrap max-w-[700px]">
            {FILM_FILTERS.map(f => (
              <button key={f.key} className={`filter-btn ${filmFilter === f.key ? 'active' : ''}`} onClick={() => setFilmFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">PERSONAGEM:</span>
            <div className="flex gap-2">
              {DRIVER_FILTERS.map(d => (
                <button key={d.key} className={`filter-btn ${driverFilter === d.key ? 'active' : ''}`} onClick={() => setDriverFilter(d.key)}>{d.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((car, i) => (
          <div key={car.id + '_' + i} className="car-card" style={{ animation: `fadeUp 0.45s ${(i % 6) * 0.07}s both` }}>
            <div className="w-full aspect-video flex items-center justify-center overflow-hidden relative" style={{ background: car.bg }}>
              <div className="absolute bottom-0 left-0 right-0 h-[45%]" style={{ background: 'linear-gradient(transparent,rgba(232,80,10,0.09))' }} />
              <div dangerouslySetInnerHTML={{ __html: buildCarSVG(car, car.id + '_' + i) }} />
            </div>
            <div className="p-3 pb-5 border-t border-[hsl(var(--border-custom))]">
              <span className="inline-block font-mono-tech text-[0.58rem] tracking-[1px] px-2 py-0.5 mb-1" style={driverBadgeStyle(car.driver)}>{car.driverLabel}</span>
              <div className="font-bebas text-[1.2rem] tracking-[2px] text-white">{car.name}</div>
              <div className="font-mono-tech text-[0.58rem] tracking-[1px] text-[hsl(var(--muted-foreground))] opacity-60 mt-0.5">{car.type}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-mono-tech text-[0.63rem] text-[hsl(var(--muted-foreground))] tracking-[1px]">{car.filmLabel}</span>
              </div>
              <button className="car-card-btn" onClick={() => onOrderCar(car)}>Imprimir Este Modelo</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 font-mono-tech text-[0.75rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">
          Nenhum carro encontrado para esse filtro.
        </div>
      )}
    </section>
  );
}
