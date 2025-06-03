import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import Tabs from "../../components/ui/Tabs.tsx";
import { getPropertyValue } from "../../sdk/getProperty.ts";
import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /**
   * @title Cuidados genéricos
   * @description Arquivo que aparecerá na aba "cuidados" caso o produto não tenha esta especificação cadastrada
   */
  defaultCares?: string;
}

function TechnicalInfos({
  additionalProperty,
  description,
}: {
  additionalProperty: PropertyValue[];
  description: string | undefined;
}) {
  const largura = getPropertyValue(additionalProperty, "Largura");
  const profundidade = getPropertyValue(additionalProperty, "Profundidade");
  const altura = getPropertyValue(additionalProperty, "Altura");
  const peso = getPropertyValue(additionalProperty, "Peso");
  const properties = {
    largura,
    profundidade,
    altura,
    peso,
  };
  const dimensoesMain = getPropertyValue(
    additionalProperty,
    "Imagem curta ficha"
  );
  const dimensoesFull = getPropertyValue(
    additionalProperty,
    "Imagem completa ficha"
  );
  const hasSwitch = !!(dimensoesMain && dimensoesFull);
  return (
    <div class="flex flex-col md:flex-row justify-between gap-8">
      <div class="flex flex-col gap-10 md:pr-14">
        {description && (
          <span class="text-contentMini text-ui-700 md:w-[480px]">
            {description}
          </span>
        )}
        <div class="grid grid-cols-2 gap-2 md:gap-8 w-fit">
          {Object.entries(properties).map(
            ([key, value]) =>
              value !== undefined && (
                <div class="flex gap-4">
                  <Icon id={`icon-${key}`} size={24} />
                  <div class="flex flex-col">
                    <span class="uppercase text-primary-dark text-button">
                      {key}
                    </span>
                    <span class="uppercase text-button text-ui-700">
                      {`${value}${key === "peso" ? "kg" : "m"}`}
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {(dimensoesMain || dimensoesFull) && (
        <div class="flex flex-col gap-6 w-full">
          {hasSwitch && (
            <input
              type="checkbox"
              name="product-dimensions"
              id="product-dimensions"
              class="hidden peer"
            />
          )}
          {dimensoesMain && (
            <div class="flex flex-col">
              <span class="text-button text-ui-400 uppercase">
                Dimensões principais
              </span>
              <img
                src={dimensoesMain}
                width={664}
                class="w-full h-auto mix-blend-multiply"
                alt="Imagem das dimensões principais do produto"
              />
            </div>
          )}
          {dimensoesFull && (
            <div
              class={
                hasSwitch
                  ? "flex flex-col order-2 peer-checked:order-none h-0 overflow-hidden peer-checked:h-full transition-height duration-300"
                  : "flex flex-col"
              }
            >
              <span class="text-button text-ui-400 uppercase">
                Dimensões completas
              </span>
              <img
                src={dimensoesFull}
                width={664}
                class="w-full h-auto mix-blend-multiply"
                alt="Imagem das dimensões completas do produto"
              />
            </div>
          )}
          {hasSwitch && (
            <label
              for="product-dimensions"
              data-before="Ver mais"
              data-after="Ver menos"
              class={clx(
                "flex items-center justify-center",
                "text-button uppercase",
                "px-6 py-3",
                "mx-auto cursor-pointer",
                "transition-all duration-300",
                "before:content-[attr(data-before)] peer-checked:before:hidden",
                "after:content-[attr(data-after)] after:hidden peer-checked:after:block"
              )}
            ></label>
          )}
        </div>
      )}
    </div>
  );
}

function DownloadInfos({ downloads }: { downloads: string }) {
  if (!downloads) return <span>Não há arquivos para download</span>;
  const downloadsObject = downloads?.split(";").map(item => {
    const [fileName, fileLink] = item.split(": ").map(str => str.trim());
    return { fileName, fileLink };
  });

  return (
    <div class="flex justify-center gap-10 text-legend uppercase text-ui-700">
      {downloadsObject.length > 0 ? (
        <>
          {downloadsObject.map(download => (
            <a
              href={download.fileLink}
              target="_blank"
              class="flex flex-col gap-1 items-center"
            >
              <Icon id="icon-document" size={62} />
              <span>{download.fileName}</span>
            </a>
          ))}
        </>
      ) : (
        <span>Não há arquivos para download</span>
      )}
    </div>
  );
}

export default function ProductInfos({ page, defaultCares = "//assets.decocache.com/breton/61a91ed1-76a0-4e6f-9227-833a762a2224/Guia-de-Cuidados-BRETON.pdf" }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) return null;
  const { product } = page;
  const additionalProperty = product?.isVariantOf?.additionalProperty;
  const description =
    product.description ||
    product.isVariantOf?.description ||
    product.alternateName;

  if (!additionalProperty) return null;

  const cares =
    getPropertyValue(additionalProperty, "Cuidados") || `Guia de Cuidados Breton: ${defaultCares}`;
  const downloads = getPropertyValue(additionalProperty, "Downloads");
  const hasCares = cares && cares.trim().length > 0;
  const hasDownloads = downloads && downloads.trim().length > 0;
  const hasTechnicalInfos = additionalProperty.length > 0;

  return (
    <div
      id="infos"
      class="flex flex-col md:px-16 md:pt-20 mt-12 md:mt-0 mb-10 md:mb-20"
    >
      <Tabs.Titles
        titles={[
          hasTechnicalInfos && "Informações Técnicas",
          hasDownloads && "Download",
          hasCares && "Cuidados",
        ].filter(Boolean)}
      />
      <Tabs>
        {hasTechnicalInfos && (
          <Tabs.Tab title="Informações Técnicas" defaultChecked>
            <TechnicalInfos
              additionalProperty={additionalProperty}
              description={description}
            />
          </Tabs.Tab>
        )}
        {hasDownloads && (
          <Tabs.Tab title="Download">
            <DownloadInfos downloads={downloads} />
          </Tabs.Tab>
        )}
        {hasCares && (
          <Tabs.Tab title="Cuidados">
            <DownloadInfos downloads={cares} />
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="485px" />;
