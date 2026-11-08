export async function createOrder(formData: FormData) {
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
