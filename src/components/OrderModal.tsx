import { useState, useEffect } from "react";
import { buildCarSVG, type Car } from "@/data/cars";
import { buildSCsvg, type StockCar } from "@/data/stockcars";
import { buildF1svg, teamLabel, type F1Car } from "@/data/f1cars";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  car?: Car | null;
  stockCar?: StockCar | null;
  f1Car?: F1Car | null;
}

export function OrderModal({ isOpen, onClose, car, stockCar, f1Car }: OrderModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [scale, setScale] = useState('1:24');
  const [qty, setQty] = useState('1');
  const [urgency, setUrgency] = useState('normal');
  const [base, setBase] = useState('sem');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [obs, setObs] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
      setName(''); setPhone(''); setEmail(''); setObs(''); setQty('1');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      alert('Por favor, preencha nome, telefone e e-mail para continuar.');
      return;
    }
    setSending(true);
    try {
      const modelDisplayName = car?.name || (stockCar ? `#${stockCar.num} — ${stockCar.name}` : f1Car ? `#${f1Car.num} — ${f1Car.name}` : '');
      const modelSub = car ? `${car.filmLabel} · ${car.driverLabel}` : stockCar ? `${stockCar.driver} · ${stockCar.team} · Stock Car 2026` : f1Car ? `${f1Car.driver} · ${teamLabel(f1Car.team)} · F1 2026` : '';

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("order_type", "car_miniature");
      formData.append("model_name", car?.id || stockCar?.num?.toString() || f1Car?.id || "");
      formData.append("model_display_name", modelDisplayName);
      formData.append("source_page", "order_modal");
      // Extra fields for email
      formData.append("scale", scale);
      formData.append("qty", qty);
      formData.append("urgency", urgency === 'normal' ? 'Normal — 7 a 14 dias' : urgency === 'express' ? 'Express — 3 a 5 dias' : 'Urgente — 24 a 48h');
      formData.append("base", base === 'sem' ? 'Sem base' : base === 'simples' ? 'Base simples' : 'Base premium');
      formData.append("cep", cep);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("obs", obs);
      formData.append("model_sub", modelSub);

      const { error } = await supabase.functions.invoke("create-order", { body: formData });
      if (error) throw error;

      setShowSuccess(true);
      toast({ title: "Pedido enviado!", description: "E-mail de notificação disparado." });
    } catch (err) {
      console.error("Order error:", err);
      toast({ title: "Erro ao enviar pedido", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const carPreviewHtml = car ? buildCarSVG(car, car.id + '_modal') : stockCar ? buildSCsvg(stockCar) : f1Car ? buildF1svg(f1Car) : '';
  const previewBg = car?.bg || stockCar?.bg || f1Car?.bg || '';
  const previewName = car?.name || (stockCar ? `#${stockCar.num} — ${stockCar.name}` : f1Car ? `#${f1Car.num} — ${f1Car.name}` : '');
  const previewSub = car ? `${car.filmLabel} · ${car.driverLabel}` : stockCar ? `${stockCar.driver} · ${stockCar.team} · Stock Car 2026` : f1Car ? `${f1Car.driver} · ${teamLabel(f1Car.team)} · F1 2026` : '';

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-[hsl(var(--border-custom))] gap-4">
          <div>
            <div className="font-mono-tech text-[0.62rem] tracking-[3px] uppercase mb-1" style={{ color: 'hsl(var(--accent-orange))' }}>// Pedido de Impressão 3D</div>
            <div className="font-bebas text-[1.8rem] tracking-[2px] text-white leading-none">SOLICITAR IMPRESSÃO</div>
            <div className="text-[0.85rem] text-[hsl(var(--muted-foreground))] mt-1 leading-[1.5]">Preencha os dados para receber seu orçamento e confirmar o pedido.</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex-shrink-0 bg-transparent border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] text-[1.2rem] cursor-pointer flex items-center justify-center hover:border-[hsl(var(--accent-orange))] hover:text-[hsl(var(--accent-orange))] transition-all">✕</button>
        </div>

        {/* Car Preview */}
        {(car || stockCar) && (
          <div className="mx-8 mt-0 px-5 py-4 flex items-center gap-6 border-l-[3px] border-l-[hsl(var(--accent-orange))]" style={{ background: 'hsl(var(--surface2))', border: '1px solid hsl(var(--border-custom))', borderLeft: '3px solid hsl(var(--accent-orange))' }}>
            <div className="w-[120px] h-[60px] flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ background: previewBg }} dangerouslySetInnerHTML={{ __html: carPreviewHtml }} />
            <div>
              <div className="font-mono-tech text-[0.6rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1">Modelo selecionado</div>
              <div className="font-bebas text-[1.3rem] tracking-[2px] text-white">{previewName}</div>
              <div className="font-mono-tech text-[0.62rem] tracking-[1px] mt-0.5" style={{ color: 'hsl(var(--accent-orange))' }}>{previewSub}</div>
            </div>
          </div>
        )}

        {!showSuccess ? (
          <>
            {/* Form */}
            <div className="px-8 pt-6 pb-8">
              <div className="font-mono-tech text-[0.62rem] tracking-[3px] text-[hsl(var(--muted-foreground))] uppercase mb-4 pb-2 border-b border-[hsl(var(--border-custom))]">01 — Seus dados</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Nome completo</label>
                  <input className="modal-input" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">WhatsApp / Telefone</label>
                  <input className="modal-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">E-mail</label>
                <input className="modal-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
              </div>

              <div className="font-mono-tech text-[0.62rem] tracking-[3px] text-[hsl(var(--muted-foreground))] uppercase mb-4 pb-2 border-b border-[hsl(var(--border-custom))] mt-6">02 — Detalhes da miniatura</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Escala</label>
                  <select className="modal-select" value={scale} onChange={e => setScale(e.target.value)}>
                    <option value="1:64">1:64 — Miniatura (~5cm)</option>
                    <option value="1:43">1:43 — Médio (~8cm)</option>
                    <option value="1:24">1:24 — Colecionável (~12cm)</option>
                    <option value="1:18">1:18 — Grande (~18cm)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Tecnologia</label>
                  <div className="px-3 py-2.5 font-mono-tech text-[0.82rem] tracking-[1px]" style={{ background: 'hsl(var(--bg))', border: '1px solid rgba(0,212,255,0.25)', color: 'hsl(var(--neon))' }}>✓ Filamento PLA</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Quantidade</label>
                  <input className="modal-input" type="number" min="1" max="100" value={qty} onChange={e => setQty(e.target.value)} />
                </div>
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Urgência</label>
                  <select className="modal-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                    <option value="normal">Normal — 7 a 14 dias</option>
                    <option value="express">Express — 3 a 5 dias</option>
                    <option value="urgente">Urgente — 24 a 48h</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Base</label>
                  <select className="modal-select" value={base} onChange={e => setBase(e.target.value)}>
                    <option value="sem">Sem base</option>
                    <option value="simples">Base simples</option>
                    <option value="premium">Base premium</option>
                  </select>
                </div>
              </div>

              <div className="font-mono-tech text-[0.62rem] tracking-[3px] text-[hsl(var(--muted-foreground))] uppercase mb-4 pb-2 border-b border-[hsl(var(--border-custom))] mt-6">03 — Entrega</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">CEP</label>
                  <input className="modal-input" value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" maxLength={9} />
                </div>
                <div>
                  <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Cidade / Estado</label>
                  <input className="modal-input" value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade — UF" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mb-1.5">Endereço completo</label>
                <input className="modal-input" value={address} onChange={e => setAddress(e.target.value)} placeholder="Rua, número, complemento" />
              </div>

              <div className="font-mono-tech text-[0.62rem] tracking-[3px] text-[hsl(var(--muted-foreground))] uppercase mb-4 pb-2 border-b border-[hsl(var(--border-custom))] mt-6">04 — Observações (opcional)</div>
              <textarea className="modal-textarea" value={obs} onChange={e => setObs(e.target.value)} placeholder="Alguma preferência especial, cor específica de filamento, detalhe do modelo..." />
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-[hsl(var(--border-custom))] flex flex-wrap gap-4 items-center">
              <button onClick={onClose} className="px-6 py-3.5 bg-transparent border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] font-mono-tech text-[0.68rem] tracking-[2px] uppercase cursor-pointer transition-all hover:border-[hsl(var(--muted-foreground))] hover:text-white" style={{ clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>Cancelar</button>
              <button onClick={handleSubmit} disabled={sending} className="flex-1 min-w-[200px] px-4 py-3.5 font-bebas text-[1.1rem] tracking-[3px] text-white border-none cursor-pointer transition-all hover:shadow-[0_0_25px_rgba(232,80,10,0.4)] disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'hsl(var(--accent-orange))', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>{sending ? 'Enviando...' : 'Enviar Pedido →'}</button>
              <div className="w-full font-mono-tech text-[0.58rem] tracking-[1px] text-center opacity-50" style={{ color: 'hsl(var(--muted-foreground))' }}>* Após envio entraremos em contato via WhatsApp/e-mail para confirmar o orçamento.</div>
            </div>
          </>
        ) : (
          /* Success */
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-[1.8rem]" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>✓</div>
            <div className="font-bebas text-[2rem] tracking-[3px] text-white mb-2">PEDIDO RECEBIDO!</div>
            <p className="text-[0.9rem] text-[hsl(var(--muted-foreground))] leading-[1.7]">
              Seu pedido foi enviado com sucesso.<br />
              Em breve entraremos em contato via <strong>WhatsApp ou e-mail</strong> para confirmar o orçamento e os detalhes da impressão.
            </p>
            <button onClick={onClose} className="mt-7 max-w-[240px] w-full px-4 py-3.5 font-bebas text-[1.1rem] tracking-[3px] text-white border-none cursor-pointer" style={{ background: 'hsl(var(--accent-orange))', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}
