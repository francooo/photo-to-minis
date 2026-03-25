import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { NewFooter } from "@/components/NewFooter";

const scaleData = [
  { label: '1:64 (~5cm)', grams: 8, chips: ['Miniatura discreta', 'Chaveiro ou display', 'Mais barato'] },
  { label: '1:43 (~8cm)', grams: 18, chips: ['Popular em coleções', 'Bom detalhamento', 'Boa relação custo'] },
  { label: '1:24 (~12cm)', grams: 38, chips: ['Ideal para coleção', 'Cabe na palma da mão', 'Popular'] },
  { label: '1:18 (~18cm)', grams: 95, chips: ['Grande e imponente', 'Máximo detalhamento', 'Premium'] },
];

export default function Calculator() {
  const [scaleIdx, setScaleIdx] = useState(2);
  const [modalIdx, setModalIdx] = useState(0);
  const [filMat, setFilMat] = useState(8);
  const [infill, setInfill] = useState(20);
  const [supIdx, setSupIdx] = useState(0);
  const [finish, setFinish] = useState(80);
  const [baseIdx, setBaseIdx] = useState(0);
  const [urgency, setUrgency] = useState(0);
  const [region, setRegion] = useState(18);
  const [freteType, setFreteType] = useState(1);
  const [qty, setQty] = useState(1);

  const result = useMemo(() => {
    const sd = scaleData[scaleIdx];
    const grams = sd.grams;
    const infillMod = 0.3 + (infill / 100) * 0.7;
    const supMod = [0, 0.12, 0.28][supIdx];
    const baseCost = [0, 15, 40][baseIdx];
    const modalCostMod = [1.1, 1.0][modalIdx];
    const matCost = grams * filMat * infillMod * (1 + supMod) * modalCostMod;
    const opCost = finish + urgency;
    const frete = region * freteType;
    const infraCost = baseCost + frete;
    const disc = qty >= 20 ? 0.25 : qty >= 10 ? 0.15 : qty >= 5 ? 0.08 : 0;
    const subtotal = (matCost + opCost) * qty + infraCost;
    const discAmt = subtotal * disc;
    const total = subtotal - discAmt;
    const estWeight = Math.round(grams * infillMod);
    return { sd, matCost, opCost, infraCost, baseCost, frete, disc, discAmt, total, estWeight, qty };
  }, [scaleIdx, modalIdx, filMat, infill, supIdx, finish, baseIdx, urgency, region, freteType, qty]);

  const fmt = (n: number) => n.toFixed(2).replace('.', ',');
  const modalLabels = ['Miniatura Pessoal', 'Personalizado'];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg))' }}>
      <Navigation />
      
      {/* Hero */}
      <div className="relative px-[5vw] pt-[150px] pb-[60px] border-b border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface3))' }}>
        <div className="relative z-[2]">
          <span className="font-mono-tech text-[0.68rem] tracking-[4px] text-[hsl(var(--neon))] block mb-3">// Calculadora de Impressão 3D</span>
          <h1 className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] tracking-[2px] text-white leading-[0.9] mb-4">CALCULE O <span className="text-[hsl(var(--neon))]">CUSTO</span><br />DA SUA MINIATURA</h1>
          <p className="text-[1rem] text-[hsl(var(--muted-foreground))] max-w-[500px] leading-[1.7]">Filamento PLA de alta qualidade — configure escala, acabamento e quantidade. Orçamento instantâneo e transparente.</p>
        </div>
      </div>

      {/* Tech Info */}
      <div className="px-[5vw] pt-10">
        <div className="font-mono-tech text-[0.65rem] tracking-[3px] text-[hsl(var(--muted-foreground))] mb-4 uppercase">// Tecnologia de impressão</div>
        <div className="p-5 flex items-center gap-5 border border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface2))' }}>
          <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(232,80,10,0.1)', border: '1px solid rgba(232,80,10,0.25)' }}>
            <span className="text-[hsl(var(--accent-orange))]">⬡</span>
          </div>
          <div>
            <div className="font-bebas text-[1.2rem] tracking-[2px] text-white">Filamento PLA</div>
            <div className="font-mono-tech text-[0.62rem] tracking-[1px] text-[hsl(var(--muted-foreground))] mt-0.5">Impressão FDM com filamento PLA de alta qualidade — 0.1 a 0.3mm</div>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="px-[5vw] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 pt-12">
          {/* LEFT: Inputs */}
          <div className="space-y-6">
            {/* Tipo de Peça */}
            <div className="p-8 border border-[hsl(var(--border-custom))] relative" style={{ background: 'hsl(var(--surface))' }}>
              <div className="absolute top-0 left-[10%] right-[10%] h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--accent-orange)),transparent)' }} />
              <div className="font-bebas text-[1.2rem] tracking-[3px] text-white mb-6 pb-4 border-b border-[hsl(var(--border-custom))] flex items-center gap-3">Tipo de Peça <span className="font-mono-tech text-[0.65rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">// defina o que será impresso</span></div>
              
              <div className="mb-5">
                <label className="block font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Modalidade</label>
                <div className="flex gap-[2px]" style={{ background: 'hsl(var(--border-custom))' }}>
                  {modalLabels.map((l, i) => (
                    <button key={l} onClick={() => setModalIdx(i)} className={`seg-btn ${modalIdx === i ? 'active' : ''}`}>{l}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Escala / Tamanho</label>
                <div className="flex gap-[2px]" style={{ background: 'hsl(var(--border-custom))' }}>
                  {scaleData.map((s, i) => (
                    <button key={i} onClick={() => setScaleIdx(i)} className={`seg-btn ${scaleIdx === i ? 'active' : ''}`}>
                      {s.label.split(' ')[0]} <span className="block text-[0.55rem] opacity-60">{s.label.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {scaleData[scaleIdx].chips.map(c => (
                    <span key={c} className="font-mono-tech text-[0.6rem] tracking-[1px] px-2 py-0.5 border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] opacity-60">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Material */}
            <div className="p-8 border border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface))' }}>
              <div className="font-bebas text-[1.2rem] tracking-[3px] text-white mb-6 pb-4 border-b border-[hsl(var(--border-custom))]">Material <span className="font-mono-tech text-[0.65rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">// filamento PLA</span></div>

              <div className="mb-5">
                <label className="block font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Tipo de Filamento</label>
                <select className="calc-select" value={filMat} onChange={e => setFilMat(Number(e.target.value))}>
                  <option value={8}>PLA Standard — R$ 8/10g</option>
                  <option value={12}>PLA+ Premium — R$ 12/10g</option>
                  <option value={18}>PLA Silk — R$ 18/10g</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="flex justify-between font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Infill <em className="not-italic text-[hsl(var(--neon))]">{infill}%</em></label>
                <input type="range" min="10" max="100" step="5" value={infill} onChange={e => setInfill(Number(e.target.value))} className="w-full h-1 appearance-none cursor-pointer" style={{ background: 'hsl(var(--border-custom))' }} />
              </div>

              <div>
                <label className="block font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Suportes</label>
                <div className="flex gap-[2px]" style={{ background: 'hsl(var(--border-custom))' }}>
                  {['Sem suportes', 'Simples', 'Complexos'].map((l, i) => (
                    <button key={l} onClick={() => setSupIdx(i)} className={`seg-btn ${supIdx === i ? 'active' : ''}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Acabamento */}
            <div className="p-8 border border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface))' }}>
              <div className="font-bebas text-[1.2rem] tracking-[3px] text-white mb-6 pb-4 border-b border-[hsl(var(--border-custom))]">Acabamento</div>
              <div className="mb-5">
                <select className="calc-select" value={finish} onChange={e => setFinish(Number(e.target.value))}>
                  <option value={0}>Sem acabamento — Bruto</option>
                  <option value={20}>Lixamento básico</option>
                  <option value={45}>Primer + cor base</option>
                  <option value={80}>Acabamento detalhado</option>
                  <option value={130}>Premium</option>
                  <option value={200}>Colecionável Master</option>
                </select>
              </div>
              <div>
                <label className="block font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Base de exposição</label>
                <div className="flex gap-[2px]" style={{ background: 'hsl(var(--border-custom))' }}>
                  {['Sem base', 'Simples (+R$15)', 'Premium (+R$40)'].map((l, i) => (
                    <button key={l} onClick={() => setBaseIdx(i)} className={`seg-btn ${baseIdx === i ? 'active' : ''}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pedido */}
            <div className="p-8 border border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface))' }}>
              <div className="font-bebas text-[1.2rem] tracking-[3px] text-white mb-6 pb-4 border-b border-[hsl(var(--border-custom))]">Pedido</div>
              <div className="mb-5">
                <label className="flex justify-between font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-2">Quantidade <em className="not-italic text-[hsl(var(--neon))]">{qty}</em></label>
                <input type="range" min="1" max="50" step="1" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full h-1 appearance-none cursor-pointer" style={{ background: 'hsl(var(--border-custom))' }} />
              </div>
              <div className="mb-5">
                <select className="calc-select" value={urgency} onChange={e => setUrgency(Number(e.target.value))}>
                  <option value={0}>Normal — 7 a 14 dias (sem taxa)</option>
                  <option value={35}>Express — 3 a 5 dias (+R$35)</option>
                  <option value={80}>Urgente — 24 a 48h (+R$80)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select className="calc-select" value={region} onChange={e => setRegion(Number(e.target.value))}>
                  <option value={18}>Sul / Sudeste — R$18</option>
                  <option value={24}>Centro-Oeste — R$24</option>
                  <option value={30}>Norte / Nordeste — R$30</option>
                  <option value={0}>Retirada local — Grátis</option>
                </select>
                <select className="calc-select" value={freteType} onChange={e => setFreteType(Number(e.target.value))}>
                  <option value={1}>PAC — Econômico</option>
                  <option value={1.4}>SEDEX — Rápido (+40%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT: Result */}
          <div>
            <div className="sticky top-[90px] p-8 border border-[hsl(var(--border-custom))] relative" style={{ background: 'hsl(var(--surface3))' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,hsl(var(--neon)),hsl(var(--accent-orange)))' }} />
              <div className="font-mono-tech text-[0.65rem] tracking-[3px] text-[hsl(var(--muted-foreground))] uppercase mb-5 pb-4 border-b border-[hsl(var(--border-custom))]">Resumo do Orçamento</div>

              {[
                ['Tecnologia', 'Filamento PLA'],
                ['Modalidade', modalLabels[modalIdx]],
                ['Escala', result.sd.label],
                ['Peso estimado', `~${result.estWeight}g`],
                ['Quantidade', `× ${qty}`],
              ].map(([lbl, val]) => (
                <div key={lbl as string} className="flex justify-between items-center py-2.5 border-b border-[rgba(30,42,56,0.5)]">
                  <span className="text-[0.85rem] text-[hsl(var(--muted-foreground))]">{lbl}</span>
                  <span className="font-mono-tech text-[0.82rem] text-[hsl(var(--foreground))]">{val}</span>
                </div>
              ))}

              <div className="mt-4 p-4 border border-[hsl(var(--border-custom))]" style={{ background: 'hsl(var(--surface))' }}>
                <div className="font-mono-tech text-[0.6rem] tracking-[2px] opacity-50 text-[hsl(var(--muted-foreground))] mb-2">BREAKDOWN</div>
                {[
                  ['Material', `R$ ${fmt(result.matCost * qty)}`],
                  ['Acabamento', `R$ ${fmt(finish * qty)}`],
                  ['Base', result.baseCost > 0 ? `R$ ${fmt(result.baseCost)}` : '—'],
                  ['Urgência', urgency > 0 ? `R$ ${fmt(urgency)}` : 'Grátis'],
                  ['Desconto', result.disc > 0 ? `-R$ ${fmt(result.discAmt)} (${Math.round(result.disc * 100)}%)` : '—'],
                  ['Frete', result.frete > 0 ? `R$ ${fmt(result.frete)}` : 'Grátis'],
                ].map(([lbl, val]) => (
                  <div key={lbl as string} className="flex justify-between text-[0.8rem] text-[hsl(var(--muted-foreground))] py-1">{lbl}<span>{val}</span></div>
                ))}
              </div>

              <div className="pt-5 mt-2">
                <div className="font-bebas text-[0.9rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">Total Estimado</div>
                <span className="font-bebas text-[2.4rem] tracking-[2px] block mt-0.5" style={{ color: 'hsl(var(--accent-orange))' }}>R$ {fmt(result.total)}</span>
              </div>

              <button className="block w-full mt-6 py-3.5 font-bebas text-[1.1rem] tracking-[3px] text-white border-none cursor-pointer transition-all hover:shadow-[0_0_25px_rgba(232,80,10,0.4)]" style={{ background: 'hsl(var(--accent-orange))', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>Solicitar Impressão</button>
              <div className="mt-4 text-center font-mono-tech text-[0.58rem] tracking-[1px] opacity-50 text-[hsl(var(--muted-foreground))]">* Valores estimados. Confirmação após análise do arquivo 3D.</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-[5vw] py-8" style={{ background: 'hsl(var(--surface))' }}>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="font-mono-tech text-[0.63rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase">© 2024 Sua Miniatura em 3D</div>
          <Link to="/" className="nav-cta text-[0.65rem]">← Voltar ao Site</Link>
        </div>
      </footer>
    </div>
  );
}
