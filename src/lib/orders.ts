// A Vercel aceita no máximo 4,5 MB por requisição. Fotos maiores que isso
// são reduzidas no navegador (lado maior até 2400 px, JPEG) antes do envio.
const SHRINK_ABOVE = 1.5 * 1024 * 1024;
const MAX_REQUEST = 4.3 * 1024 * 1024;
const MAX_DIMENSION = 2400;

async function shrinkImage(file: File): Promise<File> {
  if (file.size <= SHRINK_ABOVE) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    // Formato que o navegador não decodifica (ex.: HEIC fora do Safari): envia o original
    return file;
  }
}

export async function createOrder(formData: FormData) {
  const photo = formData.get("photo");
  if (photo instanceof File) {
    const prepared = await shrinkImage(photo);
    if (prepared.size > MAX_REQUEST) {
      throw new Error("Foto muito grande. Envie uma imagem JPG ou PNG menor.");
    }
    formData.set("photo", prepared);
  }

  const res = await fetch("/api/orders", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ? JSON.stringify(body.error) : `Falha ao enviar pedido (${res.status})`);
  }

  return res.json();
}
