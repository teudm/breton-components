import type { App, FnContext } from "@deco/deco";
import { PreviewContainer } from "apps/utils/preview.tsx";
import manifest, { Manifest } from "./manifest.gen.ts";

export type AppContext = FnContext<State, Manifest>;

export interface Props {
  /**
   * @title Language
   * @description Select store language
   */
  language: "pt-BR" | "en-US" | "es-ES";
}

// Here we define the state of the app
// You choose what to put in the state
export interface State extends Omit<Props, "token">{}

/**
 * @title Breton Components
 * @description Componentes das lojas multilínguas Breton
 * @category Breton
 * @logo https://image.isu.pub/171121190353-4767fde106e4bbc28104b705bc8c86dd/jpg/page_1_thumb_large.jpg
 */
export default function App(props: Props): App<Manifest, State> {
  const { language: _lang } = props;

  // it is the state of the app, all data
  // here will be available in the context of
  // loaders, actions and workflows
  const state = { ...props };

  return {
    state,
    manifest,
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
