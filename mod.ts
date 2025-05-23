import commerce from "apps/commerce/mod.ts";
import { Props as WebsiteProps } from "apps/website/mod.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import { type Section } from "@deco/deco/blocks";
import { type App as A, type AppContext as AC } from "@deco/deco";
import { PreviewContainer } from "apps/utils/preview.tsx";

export interface Props extends WebsiteProps {
  /**
   * @title Language
   * @description Select store language
   */
  language: Language;
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
}
export type Language =
  | "pt-BR"
  | "en-US"
  | "es-ES"
export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";
export let _platform: Platform = "custom";
export let _lang: Language = "pt-BR";
export type App = ReturnType<typeof App>;
// @ts-ignore somehow deno task check breaks, I have no idea why
export type AppContext = AC<App>;
let firstRun = true;

/**
 * @title Breton Components
 * @description Componentes das lojas multilínguas Breton
 * @category Breton
 * @logo https://image.isu.pub/171121190353-4767fde106e4bbc28104b705bc8c86dd/jpg/page_1_thumb_large.jpg
 */
export default function App({
  ...state
}: Props): A<Manifest, Props, [ReturnType<typeof commerce>]> {
  _platform = state.platform || "custom";
  _lang = state.language || "pt-BR";
  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
  }
  return {
    state,
    manifest,
    dependencies: [commerce(state)],
  };
}

// It is important to use the same name as the default export of the app
export const preview = () => {
  return {
    Component: PreviewContainer,
    props: {
      name: "Breton Components",
      owner: "Corebiz.ag",
      description: "Componentes das lojas multilínguas Breton",
      logo: "https://image.isu.pub/171121190353-4767fde106e4bbc28104b705bc8c86dd/jpg/page_1_thumb_large.jpg",
      images: [],
      tabs: [],
    },
  };
};
