import { useLang } from "../../sdk/useLang.tsx";

function accountName(): string {
  const language = useLang();

  const allLanguages = {
    "en-US": "newbretonen",
    "es-ES": "newbretones",
    "pt-BR": "newbreton",
  };

  return allLanguages[language];
}

export const SUBDOMAIN = `https://${accountName()}.vtexcommercestable.com.br`;
