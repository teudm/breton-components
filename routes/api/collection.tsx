import { Handlers } from "$fresh/server.ts";
import { apiFetch } from "../utils/_apiFetch.ts";
import { SUBDOMAIN } from "../utils/_constant.ts";

/**
 * Requisições HTTP para obtenção de produtos no catálogo.
 * 
 * GetProductsByCollection
 * Doc: https://developers.vtex.com/docs/api-reference/search-api#get-/api/catalog_system/pub/products/search
 * @property {Function} GET - Obtém produtos de uma coleção específica.
 * @param {Request} req - Objeto de requisição HTTP.
 * @returns {Promise<Response>} - Resposta HTTP contendo os produtos da coleção.
 * @throws {Response} - Retorna erro 400 caso o parâmetro "collectionId" não seja fornecido.
 */
export const handler: Handlers = {
  GET: async (req) => {

    const url = new URL(req.url);
    const collection = url.searchParams.get("collectionId");

    if (!collection) {
      return new Response(JSON.stringify({ error: "collection is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const urlFetch = `${SUBDOMAIN}/api/catalog_system/pub/products/search?fq=productClusterIds:${collection}&_from=0&_to=4`;

    return await apiFetch(urlFetch, "GET");
  },
};
