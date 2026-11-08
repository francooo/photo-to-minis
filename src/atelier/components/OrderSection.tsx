import { useId, useRef, useState, type DragEvent, type FormEvent } from "react";
import { ArrowUpRight, Check, ImagePlus, LoaderCircle } from "lucide-react";
import { occasions } from "../atelier-content";
import { createOrder } from "@/lib/orders";
import { toast } from "@/hooks/use-toast";

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { name: string; phone: string; email: string };
type Errors = Partial<Record<keyof Fields | "photo" | "form", string>>;

const emptyFields: Fields = { name: "", phone: "", email: "" };

function validatePhoto(file: File): string | null {
  const isImage = file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
  if (!isImage) return "Escolha um arquivo de imagem (JPG, PNG, HEIC ou WEBP).";
  if (file.size > MAX_PHOTO_BYTES) return "A foto precisa ter até 10 MB.";
  return null;
}

function validate(fields: Fields, photo: File | null): Errors {
  const errors: Errors = {};
  if (!photo) errors.photo = "Escolha a foto que dá início à sua miniatura.";
  if (!fields.name.trim()) errors.name = "Conte como podemos chamar você.";
  if (fields.phone.replace(/\D/g, "").length < 10) errors.phone = "Informe um WhatsApp com DDD.";
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Informe um e-mail válido.";
  return errors;
}

export default function OrderSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [isDragging, setIsDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const pickPhoto = (file: File | null | undefined) => {
    if (!file) return;
    const problem = validatePhoto(file);
    if (problem) {
      setErrors((e) => ({ ...e, photo: problem }));
      return;
    }
    setSelectedPhoto(file);
    setErrors((e) => ({ ...e, photo: undefined, form: undefined }));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    pickPhoto(event.dataTransfer.files?.[0]);
  };

  const setField = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields, selectedPhoto);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["photo", "name", "phone", "email"] as const).find((k) => found[k]);
      document.getElementById(first === "photo" ? `${uid}-photo` : `${uid}-${first}`)?.focus();
      return;
    }

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("name", fields.name.trim());
      formData.append("phone", fields.phone.trim());
      formData.append("email", fields.email.trim());
      formData.append("photo", selectedPhoto!);
      formData.append("order_type", "photo_miniature");
      formData.append("source_page", "atelier");
      await createOrder(formData);
      setSent(true);
      toast({ title: "Pedido enviado!", description: "Vamos falar com você pelo WhatsApp em breve." });
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      const message =
        error instanceof Error && error.message.startsWith("Foto muito grande")
          ? error.message
          : "Não foi possível enviar agora. Tente de novo em instantes.";
      setErrors({ form: message });
      toast({ title: "Erro ao enviar pedido", description: message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const startOver = () => {
    setSent(false);
    setSelectedPhoto(null);
    setFields(emptyFields);
    setErrors({});
    if (inputRef.current) inputRef.current.value = "";
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `${uid}-${key}`,
    name: key,
    value: fields[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setField(key, e.target.value),
    "aria-invalid": Boolean(errors[key]) || undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  return (
    <section className="atelier-order atelier-section" id="pedido">
      <div className="atelier-container atelier-order__grid">
        <div className="atelier-order__copy">
          <p className="atelier-eyebrow">04 / A sua vez</p>
          <h2>Uma lembrança<br />com a sua <em>assinatura.</em></h2>
          <p className="atelier-order__lead">
            Para uma data especial, para alguém querido ou para a sua coleção: escolha a imagem que dá início à sua miniatura.
          </p>
          <div className="atelier-occasion-list" id="ocasioes" aria-label="Ocasiões para presentear">
            {occasions.map((occasion) => <span key={occasion}>{occasion}</span>)}
          </div>
          <div className="atelier-order__note"><Check size={15} aria-hidden="true" /> Uma foto nítida é suficiente para começar.</div>
        </div>

        <div className={`atelier-upload-card ${sent ? "atelier-upload-card--sent" : ""}`} aria-live="polite">
          {sent ? (
            <div className="atelier-sent">
              <span className="atelier-upload-drop__success"><Check size={20} aria-hidden="true" /></span>
              <p className="atelier-eyebrow">PEDIDO RECEBIDO</p>
              <h3>Recebemos sua foto.</h3>
              <p>
                Obrigado, {fields.name.trim().split(" ")[0]}. Vamos analisar a imagem e falar com você pelo WhatsApp
                {" "}{fields.phone.trim()} para combinar os detalhes da sua miniatura.
              </p>
              <button type="button" className="atelier-text-link atelier-sent__again" onClick={startOver}>
                Enviar outra foto <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="atelier-upload-card__heading">
                <span className="atelier-upload-card__icon"><ImagePlus size={19} aria-hidden="true" /></span>
                <div><p className="atelier-eyebrow">PRIMEIRO PASSO</p><h3>Escolha sua foto</h3></div>
              </div>

              <label
                className={`atelier-upload-drop ${selectedPhoto ? "has-file" : ""} ${isDragging ? "is-dragging" : ""} ${errors.photo ? "has-error" : ""}`}
                htmlFor={`${uid}-photo`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
              >
                {selectedPhoto ? (
                  <>
                    <span className="atelier-upload-drop__success"><Check size={20} aria-hidden="true" /></span>
                    <strong>Foto selecionada</strong>
                    <span className="atelier-upload-drop__filename">{selectedPhoto.name}</span>
                    <span className="atelier-upload-drop__hint">Clique para escolher outra imagem</span>
                  </>
                ) : (
                  <>
                    <span className="atelier-upload-drop__symbol"><ImagePlus size={22} aria-hidden="true" /></span>
                    <strong>Arraste sua foto para cá</strong>
                    <span>ou <u>selecione um arquivo</u></span>
                    <span className="atelier-upload-drop__hint">JPG · PNG · HEIC · WEBP</span>
                  </>
                )}
                <input
                  ref={inputRef}
                  id={`${uid}-photo`}
                  className="atelier-sr-only"
                  type="file"
                  accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
                  aria-invalid={Boolean(errors.photo) || undefined}
                  aria-describedby={errors.photo ? `${uid}-photo-error` : undefined}
                  onChange={(event) => pickPhoto(event.currentTarget.files?.[0])}
                />
              </label>
              {errors.photo && <p className="atelier-field__error" id={`${uid}-photo-error`}>{errors.photo}</p>}
              <p className="atelier-upload-card__footnote">Uma imagem frontal e bem iluminada ajuda a revelar os detalhes.</p>

              <div className="atelier-fields">
                <div className="atelier-field atelier-field--full">
                  <label htmlFor={`${uid}-name`}>Nome</label>
                  <input type="text" autoComplete="name" placeholder="Seu nome" {...fieldProps("name")} />
                  {errors.name && <p className="atelier-field__error" id={`${uid}-name-error`}>{errors.name}</p>}
                </div>
                <div className="atelier-field">
                  <label htmlFor={`${uid}-phone`}>WhatsApp</label>
                  <input type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 90000-0000" {...fieldProps("phone")} />
                  {errors.phone && <p className="atelier-field__error" id={`${uid}-phone-error`}>{errors.phone}</p>}
                </div>
                <div className="atelier-field">
                  <label htmlFor={`${uid}-email`}>E-mail</label>
                  <input type="email" inputMode="email" autoComplete="email" placeholder="voce@email.com" {...fieldProps("email")} />
                  {errors.email && <p className="atelier-field__error" id={`${uid}-email-error`}>{errors.email}</p>}
                </div>
              </div>

              {errors.form && <p className="atelier-field__error atelier-form-error" role="alert">{errors.form}</p>}

              <button type="submit" className="atelier-button atelier-submit" disabled={sending}>
                {sending ? (
                  <>Enviando… <LoaderCircle size={17} className="atelier-spin" aria-hidden="true" /></>
                ) : (
                  <>Enviar pedido <ArrowUpRight size={17} aria-hidden="true" /></>
                )}
              </button>

              <a className="atelier-upload-card__link" href="#duvidas">Ainda tem dúvidas? Consulte as respostas <ArrowUpRight size={14} aria-hidden="true" /></a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
