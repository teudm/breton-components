import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../../components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { getPropertyValue } from "../../sdk/getProperty.ts";
import Section from "../../components/ui/Section.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Bullet {
  /**
   * @title Label do produto
   * @description Apenas para identificação no painel admin da Deco, sem impacto na página
   */
  label?: string;
  /**
   * @title Localização vertical
   * @default 50
   * @maximum 99
   * @minimum 1
   */
  yLocation: number;
  /**
   * @title Localização horizontal
   * @default 50
   * @maximum 99
   * @minimum 1
   */
  xLocation: number;
  /**
   * @title Produto
   */
  products: Product[] | null;
}

/** @titleBy title */
export interface Banner {
  /**
   * @title Título
   */
  title: string;
  image: ImageWidget;
  bullets?: Bullet[];
}

export interface Props {
  banner?: Banner[];
  /**
   * @title Título da seção
   * @default "Descubra a versatilidade da Breton"
   */
  sectionTitle: string;
  /**
   * @title Subtítulo da seção
   * @default "SEUS ESTILOS FAVORITOS"
   */
  sectionSubtitle: string;
}

export default function BulletPoints({
  banner,
  sectionTitle,
  sectionSubtitle,
}: Props) {
  const id = useId();

  return (
    <div id={id} class="my-10 md:my-20">
      <div
        class={clx(
          "flex max-md:flex-col",
          "md:justify-between md:items-end max-md:gap-6",
          "px-6 md:px-16 mb-4 md:mb-10"
        )}
      >
        <div class="flex flex-col gap-2">
          <span class="text-caption uppercase text-black">
            {sectionSubtitle}
          </span>
          <h4 class="text-h4Mobile md:text-h4 uppercase text-black">
            {sectionTitle}
          </h4>
        </div>
        <div class="grid grid-cols-2 md:flex gap-2">
          {banner &&
            banner.map(({ title }, index) => (
              <Slider.Dot
                class={clx(
                  "text-button text-black uppercase",
                  "bg-white/10 hover:bg-black/[.03] max-md:bg-black/[.03]",
                  "disabled:text-white disabled:bg-black/80 disabled:hover:bg-black/75",
                  "md:px-6 h-8 rounded-[2px] transition-all duration-300"
                )}
                index={index}
              >
                {title}
              </Slider.Dot>
            ))}
        </div>
      </div>
      <div
        class={clx(
          "grid",
          "grid-rows-[1fr_32px_1fr_64px]",
          "grid-cols-[32px_1fr_32px] min-h-[660px]",
          "sm:grid-cols-[88px_1fr_88px] sm:min-h-min",
          "w-full"
        )}
      >
        <div class="col-span-full row-span-full flex">
          <Slider class="carousel carousel-center w-full gap-1 md:gap-4 md:px-4">
            {banner &&
              banner.map(({ image, bullets, title }, index) => (
                <Slider.Item
                  index={index}
                  class={clx(
                    "carousel-item bullet-points-carousel-item overflow-hidden relative",
                    "w-[calc(100%-24px)] md:w-[calc(100%-112px)]",
                    "first:w-[calc(100%-12px)] md:first:w-[calc(100%-56px)]",
                    "last:w-[calc(100%-12px)] md:last:w-[calc(100%-56px)]"
                  )}
                >
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    class="w-full object-cover"
                  />
                  {bullets &&
                    bullets.map(({ yLocation, xLocation, products }, index) => {
                      if (!products) return null;
                      const [product] = products;
                      const {
                        image: pImages,
                        isVariantOf,
                        description: pDescription,
                      } = product;

                      const [image] = isVariantOf?.image ?? pImages ?? [];

                      const additionalProperty =
                        isVariantOf?.additionalProperty;

                      if (!additionalProperty) return null;

                      const designer = getPropertyValue(
                        additionalProperty,
                        "Designer"
                      );
                      const nome =
                        getPropertyValue(additionalProperty, "Nome") ||
                        product.name;
                      const description =
                        pDescription || isVariantOf?.description;
                      const bulletId = `bullet-${useId()}`;

                      return (
                        <div class="absolute w-full h-full pointer-events-none flex items-center justify-center">
                          <input
                            type="checkbox"
                            id={bulletId}
                            class="hidden peer"
                          />
                          <label for={bulletId} class="w-full h-full absolute top-0 left-0 z-20 peer-checked:pointer-events-auto"/>
                          <div
                            class="absolute bullet-point-label pointer-events-auto peer-checked:z-10"
                            style={{
                              top: `${
                                yLocation < 0
                                  ? 0
                                  : yLocation > 95
                                  ? 95
                                  : yLocation
                              }%`,
                              left: `${
                                xLocation < 0
                                  ? 0
                                  : xLocation > 95
                                  ? 95
                                  : xLocation
                              }%`,
                            }}
                          >
                            <label
                              for={bulletId}
                              class={clx(
                                "bg-white/0",
                                "rounded-full w-10 h-10",
                                "flex items-center justify-center",
                                "cursor-pointer",
                                "shadow-[4px_12px_32px_rgba(0,0,0,0.35)]",
                                "group"
                              )}
                              style={{ "--random": index }}
                            >
                              <div
                                class={clx(
                                  "bullet-point-button",
                                  "w-6 h-6 bg-white rounded-full",
                                  "flex items-center justify-center",
                                  "text-primary group-hover:p-1 group-hover:animate-none"
                                )}
                              >
                                <Icon class="" id="icon-plus-mini" size={16} />
                              </div>
                            </label>
                          </div>
                          <div
                            class={clx(
                              "hidden peer-checked:flex items-center justify-center",
                              "absolute z-30 pointer-events-auto",
                              "w-full md:w-[35.29%] py-[52px] md:py-10 max-md:px-8"
                            )}
                          >
                            <div
                              class={clx(
                                "flex flex-col bg-white",
                                "h-fit max-h-full md:overflow-auto custom-scrollbar",
                                "z-20 relative"
                              )}
                              style={{boxShadow: "4px 8px var(--elevation-elevation-blur-m, 16px) 0px rgba(0, 0, 0, 0.08)"}}
                            >
                              <label
                                for={bulletId}
                                class="absolute top-2 md:top-4 right-2 md:right-4 w-12 h-12 flex items-center justify-center cursor-pointer z-20"
                              >
                                <Icon id="icon-close" size={24} />
                              </label>
                              <img
                                src={image.url}
                                alt="imagem do produto"
                                class="w-full h-auto object-cover mb-4"
                                loading="lazy"
                              />
                              <div class="mx-6 md:mx-14 mb-6 md:mb-14 flex flex-col overflow-hidden">
                                <h5 class="text-h5Mobile md:text-h5 mb-2 uppercase">{nome}</h5>
                                <span class="text-legend mb-4">
                                  by{" "}
                                  <span class="text-primary underline">
                                    {designer}
                                  </span>
                                </span>
                                <span class="text-ui-800 max-md:text-ellipsis max-md:overflow-hidden text-contentMini mb-6 md:mb-10">
                                  {description}
                                </span>
                                <a
                                  href={product.url}
                                  class="btn btn-glass uppercase text-button w-fit"
                                >
                                  Ver detalhes
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider.Item>
              ))}
          </Slider>
        </div>
        <div class="hidden md:flex items-center justify-end z-10 col-start-1 row-start-2">
          <Slider.PrevButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled={false}
          >
            <Icon id="chevron-left" size={32} />
          </Slider.PrevButton>
        </div>

        <div class="hidden md:flex items-center justify-start z-10 col-start-3 row-start-2">
          <Slider.NextButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled={false}
          >
            <Icon id="chevron-right" size={32} />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="960px" />;
