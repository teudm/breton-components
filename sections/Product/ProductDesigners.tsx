import { ProductDetailsPage } from "apps/commerce/types.ts";
import { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { type SectionProps } from "@deco/deco";

interface DesignerBlock {
  img: {
    /** @title Desktop Image */
    desktop: ImageWidget;
    /** @title Mobile Image */
    mobile: ImageWidget;
  };
  /** @title Top Text */
  topText: string;
  /** @title Architect(s) Name's */
  architects: string;
  /** @title Text to show */
  text: HTMLWidget;
}

export interface Props {
  /** @title Designer Block */
  designerBlock: DesignerBlock[];

  /** @title stamp Image */
  stamp: ImageWidget;

  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDesigners(props: SectionProps<ReturnType<typeof loader>> | null) {

  if (!props) return <></>;

  const { designerInfos, stamp } = props;

  return (
    <>
      {designerInfos.map((block) => (
        <div class="grid md:grid-cols-2">
          <div class="relative">
            <Picture>
              <Source
                media="(max-width: 767px)"
                fetchPriority="auto"
                src={block.img.mobile}
                width={280}
                height={336}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority="auto"
                src={block.img.desktop}
                width={576}
                height={608}
              />
              <img
                loading="lazy"
                src={block.img.desktop}
                alt="product designers banner"
                class="md:w-[calc(100%-97px)]"
              />
            </Picture>
            <div class="absolute top-0 right-0 max-md:p-[18px] max-w-[151px]">
              <img
                src={stamp}
                alt="Product Designers Stamp"
              />
            </div>
          </div>
          <div class="pl-6 max-md:pt-8 md:pt-[168px] max-md:pl-6 md:pr-[13.5vw]">
            <p class="text-caption uppercase mb-2 font-normal">
              {block.topText}
            </p>
            <p class="text-h2 max-md:mb-4 md:mb-6">
              Design por {block.architects}
            </p>
            <div
              class="text-neutral-800 text-sm font-light leading-normal tracking-wide max-md:mb-8 md:mb-10"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
            <a
              href={`/breton?filter.brand=breton&filter.designer=${block.architects}&page=1`}
              class="flex bg-white/20 rounded-[1px] backdrop-blur-[10px] w-fit rounded-sm outline outline-1 outline-offset-[-1px] outline-black py-[10px] px-6 gap-4 items-center justify-center hover:bg-white/30 transition duration-300"
            >
              <span class="text-button">VER PRODUTOS</span>
              <Icon id="arrow-right" />
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Carrega informações do designer com base na página e bloco de designers fornecidos.
 * 
 * @param {Props} params - Parâmetros da função.
 * @param {PageType} params.page - Objeto da página contendo informações do produto.
 * @param {DesignerBlockType[]} params.designerBlock - Lista de blocos com informações de designers.
 * @param {StampType} params.stamp - Objeto adicional passado junto aos dados carregados.
 * @param {Request} _req - Objeto da requisição (não utilizado).
 * 
 * @returns {{ designerInfos: DesignerBlockType[], stamp: StampType } | null} 
 * Retorna as informações filtradas dos designers e o stamp, ou null se os dados forem inválidos.
 */
export const loader = ({ page, designerBlock, stamp }: Props, _req: Request) => {
  if (!page || !designerBlock) {
    return null;
  }

  const { product } = page;

  const designer =
    product.isVariantOf?.additionalProperty.find(
      (property) => property.name === "Designer"
    )?.value ?? "";

  const designerInfos = designerBlock.filter((block) =>
    block.architects.toLowerCase().includes(designer.toLowerCase())
  );

  return { designerInfos, stamp };
};
