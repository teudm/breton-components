/**
 * Realiza uma requisição HTTP personalizada utilizando fetch.
 *
 * @param {string} url - A URL para onde a requisição será enviada.
 * @param {string} method - O método HTTP a ser utilizado (GET, POST, PUT, DELETE, etc.).
 * @param {string} [body] - O corpo da requisição em formato JSON (opcional).
 * @returns {Promise<Response>} - Retorna uma Promise contendo a resposta da requisição.
 */
export async function apiFetch(url: string, method: string, body?: string | object) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}