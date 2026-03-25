import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function NewUploadSection() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFeedback(`✓ ${file.name} — FOTO SELECIONADA`);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Preencha nome e telefone", variant: "destructive" });
      return;
    }
    if (!selectedFile) {
      toast({ title: "Selecione uma foto", variant: "destructive" });
      return;
    }

    setSending(true);
    setFeedback("⏳ ENVIANDO PEDIDO...");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", "cliente@pedido.com");
      formData.append("phone", phone.trim());
      formData.append("photo", selectedFile);
      formData.append("order_type", "photo_miniature");
      formData.append("source_page", "upload_section");

      const { data, error } = await supabase.functions.invoke("create-order", {
        body: formData,
      });

      if (error) throw error;

      setFeedback("✓ PEDIDO ENVIADO COM SUCESSO!");
      toast({ title: "Pedido enviado!", description: "Entraremos em contato em breve." });
      setName("");
      setPhone("");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error:", err);
      setFeedback("✗ ERRO AO ENVIAR — TENTE NOVAMENTE");
      toast({ title: "Erro ao enviar pedido", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const steps = [
    { num: '01', title: 'Upload da Foto', desc: 'JPG, PNG ou HEIC. Quanto mais nítida, melhor o modelo 3D.' },
    { num: '02', title: 'Análise por IA', desc: 'Identificação e reconstrução da geometria em 3D.' },
    { num: '03', title: 'Geração do STL/OBJ', desc: 'Arquivo compatível com qualquer impressora 3D.' },
    { num: '04', title: 'Impressão & Entrega', desc: 'Imprimimos ou você baixa o arquivo para imprimir.' },
  ];

  return (
    <section className="py-[100px] px-[5vw] relative overflow-hidden" id="upload" style={{ background: 'hsl(var(--surface2))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent 10%,hsl(var(--border-custom)) 50%,transparent 90%)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Info */}
        <div>
          <div className="section-label section-label-neon">// AI Converter</div>
          <h2 className="section-title">FOTO PARA<br />ARQUIVO 3D</h2>
          <div className="divider-neon" />
          <p className="section-desc">Envie uma foto sua e nossa IA converte em arquivo 3D com precisão milimétrica, pronto para filamento ou resina.</p>

          <div className="flex flex-col gap-0 mt-8">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start pb-9 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-11 bottom-0 w-px" style={{ background: 'linear-gradient(rgba(0,212,255,0.3),transparent)' }} />
                )}
                <div className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center font-bebas text-[1.1rem] relative z-[1]" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: 'hsl(var(--neon))' }}>{step.num}</div>
                <div>
                  <div className="font-bebas text-[1.1rem] tracking-[2px] text-white mb-1">{step.title}</div>
                  <div className="text-[0.875rem] text-[hsl(var(--muted-foreground))] leading-[1.65]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upload zone + form */}
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

          {/* Step 1: Upload area (clickable only when no file selected) */}
          {!selectedFile ? (
            <div className="upload-zone cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <svg className="w-[60px] h-[60px] mx-auto mb-6 opacity-70" viewBox="0 0 64 64" fill="none" style={{ color: 'hsl(var(--neon))' }}>
                <rect x="4" y="4" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
                <path d="M32 42 L32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 30 L32 22 L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 48 L44 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
              <div className="font-bebas text-[1.5rem] tracking-[3px] text-white mb-2">ARRASTE SUA FOTO</div>
              <div className="font-mono-tech text-[0.68rem] tracking-[2px] text-[hsl(var(--muted-foreground))] mb-4">Clique para selecionar sua foto</div>
              <div className="flex gap-2 justify-center mb-4">
                {['JPG', 'PNG', 'HEIC', 'WEBP'].map(f => (
                  <span key={f} className="font-mono-tech text-[0.58rem] tracking-[1px] px-2 py-0.5 border border-[hsl(var(--border-custom))] text-[hsl(var(--muted-foreground))] uppercase">{f}</span>
                ))}
              </div>
              <div className="font-mono-tech text-[0.6rem] tracking-[1px] text-[hsl(var(--muted-foreground))] opacity-70">
                ① Primeiro faça o upload da imagem — depois preencha seus dados
              </div>
            </div>
          ) : (
            /* Step 2: File selected — show preview + form fields */
            <div className="upload-zone cursor-default">
              <div className="mb-4">
                <img src={previewUrl!} alt="Preview" className="max-w-[200px] max-h-[150px] mx-auto rounded border border-[hsl(var(--border-custom))] object-cover" />
              </div>
              <div className="font-mono-tech text-[0.68rem] tracking-[2px] text-[hsl(var(--neon))] mb-2">
                ✓ {selectedFile.name}
              </div>
              <button
                onClick={() => { setSelectedFile(null); setPreviewUrl(null); setFeedback(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="font-mono-tech text-[0.6rem] tracking-[1px] text-[hsl(var(--muted-foreground))] underline mb-5 cursor-pointer bg-transparent border-none hover:text-white transition-colors"
                type="button"
              >
                TROCAR FOTO
              </button>

              <div className="font-mono-tech text-[0.6rem] tracking-[1px] text-[hsl(var(--muted-foreground))] mb-3 opacity-80">
                ② Agora preencha seu nome e telefone para enviar o pedido
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-3 w-full max-w-[320px] mx-auto mb-5">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 font-mono-tech text-[0.8rem] tracking-[1px] text-white border border-[hsl(var(--border-custom))] rounded-none outline-none focus:border-[hsl(var(--neon))] transition-colors placeholder:text-[hsl(var(--muted-foreground))]"
                  style={{ background: 'hsl(var(--surface))' }}
                />
                <input
                  type="tel"
                  placeholder="Telefone (WhatsApp)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 font-mono-tech text-[0.8rem] tracking-[1px] text-white border border-[hsl(var(--border-custom))] rounded-none outline-none focus:border-[hsl(var(--neon))] transition-colors placeholder:text-[hsl(var(--muted-foreground))]"
                  style={{ background: 'hsl(var(--surface))' }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                className="inline-block px-7 py-3 font-bebas text-[0.95rem] tracking-[3px] cursor-pointer border-none transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'hsl(var(--neon))', color: 'hsl(var(--bg))', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}
                type="button"
              >
                {sending ? 'ENVIANDO...' : 'ENVIAR PEDIDO'}
              </button>

              {feedback && (
                <div className="mt-4 font-mono-tech text-[0.68rem] tracking-[2px]" style={{ color: 'hsl(var(--neon))' }}>{feedback}</div>
              )}
            </div>
          )}
          <div className="mt-6 border border-[hsl(var(--border-custom))] px-6 py-4 flex justify-between items-center" style={{ background: 'hsl(var(--surface))' }}>
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">TEMPO</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">2–5 <span className="text-[0.9rem] text-[hsl(var(--muted-foreground))]">MIN</span></div>
            </div>
            <div className="w-px h-[38px]" style={{ background: 'hsl(var(--border-custom))' }} />
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">FORMATOS</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">STL/OBJ</div>
            </div>
            <div className="w-px h-[38px]" style={{ background: 'hsl(var(--border-custom))' }} />
            <div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))]">PRECISÃO</div>
              <div className="font-bebas text-[1.35rem] tracking-[2px] text-white">0.1<span className="text-[0.9rem] text-[hsl(var(--muted-foreground))]">MM</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
