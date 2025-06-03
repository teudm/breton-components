import { Handlers } from "$fresh/server.ts";
import { apiFetch } from "../utils/_apiFetch.ts";
import { SUBDOMAIN } from "../utils/_constant.ts";

/**
 * Requisições HTTP para obtenção de produtos no catálogo através de IDs específicos.
 * 
 * GetProductsByIds
 * Doc: https://developers.vtex.com/docs/api-reference/search-api#get-/api/catalog_system/pub/products/search
 * @property {Function} GET - Obtém produtos com base nos IDs fornecidos.
 * @param {Request} req - Objeto de requisição HTTP contendo os parâmetros de busca.
 * @returns {Promise<Response>} - Resposta HTTP contendo os produtos encontrados.
 * @throws {Response} - Retorna erro 400 caso o parâmetro "products" não seja fornecido.
 */
export const handler: Handlers = {
  GET: async (req) => {
    const url = new URL(req.url);
    const products = url.searchParams.get("products");    

    if (!products) {
      return new Response(JSON.stringify({ error: "products are required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const allProducts = products.split(",");
    const productsToFetch = allProducts.join("&fq=productId:");

    const urlFetch = `${SUBDOMAIN}/api/catalog_system/pub/products/search?fq=productId:${productsToFetch}`;

    return await apiFetch(urlFetch, "GET");
  },
};
