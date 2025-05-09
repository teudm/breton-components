import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { getPropertyValue } from "../../sdk/getProperty.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /** 
   * @title Imagem padrão
   * @description Renderizada apenas quando não há uma imagem cadastrada na VTEX 
  */
  defaultImageBanner: ImageWidget;
}

const handleBottomBar = () => {
  const productName = document.querySelector("#product-name");
  const bottomBar = document.querySelector("#bottom-bar");

  if (!productName || !bottomBar) {
    console.error(
      "Elementos necessários (#product-name e/ou #bottom-bar) não encontrados."
    );
    return;
  }

  // Configura o Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Elemento está visível: esconde a barra
        bottomBar.classList.add("opacity-0");
        bottomBar.classList.remove("opacity-100");
      } else {
        // Elemento saiu da tela: mostra a barra
        bottomBar.classList.add("opacity-100");
        bottomBar.classList.remove("opacity-0");
      }
    });
  });

  // Observa o elemento productName
  observer.observe(productName);
};

export default function ProductMainBanner({ page, defaultImageBanner }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  const { product } = page;

  const additionalProperty = product?.isVariantOf?.additionalProperty;

  if (!additionalProperty) return null;

  const bannerValue =
    getPropertyValue(additionalProperty, "Imagem Banner PDP") ||
    defaultImageBanner;
  const bannerMobile = getPropertyValue(additionalProperty, "Imagem Banner PDP Mobile") || bannerValue;
  const designerValue = getPropertyValue(additionalProperty, "Designer");
  const nameValue = getPropertyValue(additionalProperty, "Nome");

  return (
    <>
      {/* Barra fixa */}
      <div
        id="bottom-bar"
        class="fixed border-t border-lines bottom-0 py-2 md:py-3 px-4 md:px-16 bg-background z-20 w-full opacity-0 transition-opacity duration-300"
      >
        <div class="flex justify-between items-center">
          <div class="hidden md:flex flex-col">
            <h5 class="text-h5 text-black">{nameValue || product.name}</h5>
            {designerValue && <span class="text-caption">por {designerValue}</span>}
          </div>
          <div class="flex max-md:gap-1 max-md:w-full">
            <a href="#infos" class="flex justify-center gap-4 items-center px-6 py-3 uppercase text-button text-black">
              <Icon id="icon-ruler" size={24} />
              <span class="max-md:hidden">ficha técnica</span>
            </a>
            <button class="flex rounded-[2px] items-center justify-center gap-4 bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3 max-md:w-full">
              <Icon id="icon-briefcase" size={24} />
              <div>
                <span class="max-md:hidden">solicitar </span>
                <span>orçamento</span>
              </div>
            </button>
          </div>
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(handleBottomBar) }}
        />
      </div>
      {/* Banner */}
      <div id="main-banner" class="relative mb-4">
        <Picture preload={true}>
          <Source
            media="(max-width: 767px)"
            fetchPriority="high"
            src={bannerMobile}
            width={360}
            height={720}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority="high"
            src={bannerValue}
            width={1360}
            height={700}
          />
          <img
            class="w-full object-cover md:group-hover:scale-110 duration-3000 ease-in-out"
            loading="eager"
            src={bannerValue}
            alt={""}
          />
        </Picture>
        <div class="absolute w-full h-full left-0 top-0 flex items-center justify-center">
          <div
            id="product-name"
            class="flex flex-col gap-2 items-center justify-center"
          >
            <h1 class="text-h1Mobile text-center lg:text-h1 text-white uppercase">
              {nameValue || product.name}
            </h1>
            {designerValue && (
              <span class="text-button text-white uppercase">
                design por {designerValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
