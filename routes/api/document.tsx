import { Handlers } from "$fresh/server.ts";
import { SUBDOMAIN } from "../utils/_constant.ts";
import { apiFetch } from "../utils/_apiFetch.ts";

/**
 * Requisições HTTP para operações em documentos no Master Data
 * 
 * CreateDocument
 * Doc: https://developers.vtex.com/docs/api-reference/master-data-api-v2#get-/api/dataentities/-dataEntityName-/documents/-id-
 * @property {Function} POST - Cria um documento em uma entidade específica.
 * @param {Request} req - Objeto de requisição HTTP.
 * @returns {Promise<Response>} - Resposta HTTP contendo o resultado da operação.
 * @throws {Response} - Retorna erro 400 caso tenha problemas no corpo da requisição.
 */
export const handler: Handlers = {
  POST: async (req) => {

    const url = new URL(req.url);
    const entityName = url.searchParams.get("entityName");

    if (!entityName) {
      return new Response(JSON.stringify({ error: "entityName is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const data = await req.json();

    const urlFetch = `${SUBDOMAIN}/api/dataentities/${entityName}/documents/`;

    return await apiFetch(urlFetch, "POST", data);
  },
};