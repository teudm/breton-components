import { ImageWidget } from "apps/admin/widgets.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

/** @titleBy collectionId */
export interface Area {
  /** @title Id da coleção */
  collectionId: number;
  /**
   * @title Quantidade de produtos
   * @description A quantidade de produtos que serão exibidos no scroll (padrão: 6)
   * */
  count?: number;
  /**
   * @title Imagem desktop
   * @description Resolução indicada: 992 x 520
   * */
  desktopImage: ImageWidget;
  /**
   * @title Imagem mobile
   * @description Resolução indicada: 360 x 384
   * */
  mobileImage: ImageWidget;
}

export interface RelatedProducts {
  /**
   * @title Integration
   * @hide true
   * @readOnly true
   * */
  page: ProductDetailsPage | null;
  /** @title Título */
  title: string;
  /** @title Subtítulo */
  subtitle: string;
  /** @title Area ambientada */
  areas: Area[];
}

const onLoad = () => {
  const scrollContainer = document.getElementById("scroll-products");
  const shadowTop = document.getElementById("shadow-top");
  const shadowBottom = document.getElementById("shadow-bottom");

  if (!scrollContainer || !shadowTop || !shadowBottom) return;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    shadowTop.style.opacity = atTop ? "0" : "1";
    shadowBottom.style.opacity = atBottom ? "0" : "1";
  };

  const scroll = (direction = "down") => {
    const offset = direction === "down" ? 100 : -100;
    scrollContainer.scrollBy({ top: offset, behavior: "smooth" });
  };

  shadowTop.addEventListener("click", () => scroll("up"));
  shadowBottom.addEventListener("click", () => scroll("down"));

  handleScroll();

  scrollContainer.addEventListener("scroll", handleScroll);
};

export default function RelatedProducts(
  props: Awaited<ReturnType<typeof loader>>
) {
  const { area, products, title, subtitle } = props;
  const device = useDevice();
  const isMobile = device === "mobile";
  if (!area || products.length === 0) return null;
  return (
    <div class="md:container md:pb-10 mb-20">
      <div class="mb-8 md:mb-10 max-md:container">
        <p class="text-caption mb-2">{subtitle}</p>
        <p class="text-h4Mobile md:text-h4">{title}</p>
      </div>
      <div
        class="flex max-md:flex-col max-md:gap-2 md:justify-between md:relative"
        style={{ aspectRatio: isMobile ? "" : "1232 / 520" }}
      >
        <div class="md:w-[80.52%] h-fit">
          <Image
            src={isMobile ? area.mobileImage : area.desktopImage}
            width={isMobile ? 360 : 992}
            height={isMobile ? 384 : 520}
            class="w-full"
          />
        </div>
        <div
          class="md:w-[14.24%] max-md:px-2 overflow-auto hide-scrollbar md:snap-y md:snap-mandatory flex md:flex-col gap-4"
          id="scroll-products"
        >
          {products?.map(product => (
            <ProductCard
              key={`product-card-${product.productID}`}
              product={product}
              class="md:snap-center max-md:min-w-[56%] h-full max-md:pr-4 md:pb-4 max-md:border-r md:border-b border-lines last:p-0 last:border-none rounded-none"
              variant="pdp"
            />
          ))}
          {!isMobile && (
            <>
              <div
                id="shadow-top"
                class="absolute opacity-0 top-0 flex flex-col w-[14.24%] transition-opacity cursor-pointer"
                role="button"
                aria-label="scroll-up"
              >
                <div class="w-full flex justify-center bg-background">
                  <Icon
                    id="seta-direita"
                    class="-rotate-90 opacity-30"
                    size={32}
                  />
                </div>
                <div class="related-products-shadow-top w-full h-20" />
              </div>
              <div
                id="shadow-bottom"
                class="absolute bottom-0 flex flex-col w-[14.24%] transition-opacity cursor-pointer"
                role="button"
                aria-label="scroll-down"
              >
                <div class="related-products-shadow-bottom w-full h-20" />
                <div class="w-full flex justify-center bg-background">
                  <Icon
                    id="seta-direita"
                    class="rotate-90 opacity-30"
                    size={32}
                  />
                </div>
              </div>
              <script
                type="module"
                dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader(
  props: RelatedProducts,
  _req: Request,
  ctx: AppContext
) {
  const { page, areas, title, subtitle } = { ...props };
  const fallback = { area: undefined, products: [] };
  if (!page || !areas) return fallback;
  const { product } = page;
  const clusters = product.additionalProperty
    ?.filter(property => property.name === "cluster")
    .map(property => property.propertyID);

  if (!clusters || clusters.length === 0) return fallback;

  const area = areas.find(area =>
    clusters.includes(area.collectionId.toString())
  );
  if (!area) return fallback;
  const products = await ctx.invoke(
    "vtex/loaders/intelligentSearch/productList.ts",
    {
      collection: `${area.collectionId}`,
      count: area.count || 6,
    }
  );
  if (!products) return fallback;
  return { area, products, title, subtitle };
}
