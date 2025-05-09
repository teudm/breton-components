import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import Section from "../../components/ui/Section.tsx";
import { getPropertyValue } from "../../sdk/getProperty.ts";
import Icon from "../../components/ui/Icon.tsx";
import AddToCartButton from "../../components/product/AddToCartButton.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
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
  const designer = getPropertyValue(additionalProperty, "Designer");
  const nome = getPropertyValue(additionalProperty, "Nome") || product.name;
  const description = product.alternateName || product.description || product.isVariantOf?.description;

  return (
    <div class="flex items-center">
      <div class="w-full md:max-w-[55%] group">
        <ImageGallerySlider page={page} />
      </div>
      <div class="hidden md:block md:w-[43.53%] bg-background-dark">
        <div class="flex flex-col gap-20 py-[108px] pr-16 pl-12">
          <div class="flex flex-col gap-2">
            {designer && (
              <div>
                <span class="uppercase text-caption">
                  Design por {designer}
                </span>
              </div>
            )}
            <div>
              <h4 class="text-h4 uppercase">{nome}</h4>
            </div>
            <div class="text-contentMini text-ui-700">
              <span>{description}</span>
            </div>
          </div>
          <div>
            <button class="flex rounded-[2px] items-center justify-center gap-4 bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3">
              <Icon id="icon-briefcase" size={24} />
              Solicitar orçamento
            </button>
          </div>
          <div>
            <span class="text-legend text-ui-500">
              Para mais opções de personalização,{" "}
              <a target="_blank" class="underline" href="#">
                fale com um de nossos consultores Breton.
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="680px" />;
