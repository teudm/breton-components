import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { AppContext } from "apps/vtex/mod.ts";
import NotFound from "../../components/search/NotFound.tsx";
import SearchResult from "../../components/search/SearchResult.tsx";

/**
 * @titleBy title
 */
export interface Banner {
  /** @description Nome do designer */
  title: string;
  /** @description Descrição */
  subtitle?: RichText;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile?: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}
export interface Props {
  /**
   * @title Id da especificação designer
   * @description É possível encontrar essa informação na VTEX
   * @default 41
   * */
  specificationId: number;
  banners: Banner[];
  /** @hide true */
  partial?: "hideMore" | "hideLess";
}
const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "",
      matcher: "/*",
      subtitle: "",
    },
  ],
  specificationId: 41,
};

function BannerSearch(props: Awaited<ReturnType<typeof loader>>) {
  if (!props) return <NotFound />;
  const { banner, page, url, partial } = props;

  if (!page) return <NotFound />;

  return (
    <>
      {banner && !partial && (
        <div
          class="grid grid-cols-1 grid-rows-1 max-h-[560px] overflow-hidden"
          id="main-banner"
        >
          <Picture
            preload
            class="col-start-1 col-span-1 row-start-1 row-span-1"
          >
            <Source
              src={banner.image?.mobile || banner.image.desktop}
              width={360}
              height={520}
              media="(max-width: 767px)"
            />
            <Source
              src={banner.image.desktop}
              width={1360}
              height={560}
              media="(min-width: 767px)"
            />
            <img
              class="w-full"
              src={banner.image.desktop}
              alt={banner.image?.alt ?? banner.title}
            />
          </Picture>

          <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 gap-4 w-full bg-black/40">
            <h1 class="text-center w-full">
              <span class="uppercase sm:text-5xl font-normal text-[40px] text-white">
                {banner.title}
              </span>
            </h1>
            {banner.subtitle && (
              <h2 class="text-center w-full">
                <span
                  class="text-xl font-medium text-white"
                  dangerouslySetInnerHTML={{ __html: banner.subtitle }}
                />
              </h2>
            )}
          </div>
        </div>
      )}
      <SearchResult
        url={url}
        page={page}
        layout={{ pagination: "show-more" }}
        startingPage={0}
        partial={partial}
      />
    </>
  );
}
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { banners, specificationId } = { ...DEFAULT_PROPS, ...props };
  const { pathname } = new URL(req.url);
  const designerName = pathname
    .split("/")[2]
    .replaceAll("-", " ")
    .toLowerCase();
  const specificationKey = `specificationFilter_${specificationId}`;
  const page = await ctx.invoke(
    "vtex/loaders/intelligentSearch/productListingPage.ts",
    {
      query: "/breton",
      count: 12,
      sort: "price:desc",
      fuzzy: "automatic",
      selectedFacets: [{ key: specificationKey, value: designerName }],
      advancedConfigs: {
        includeOriginalAttributes: [],
      },
    }
  );
  const banner = banners.find(
    ({ title }) => title.toLowerCase() === designerName
  );
  return { banner, page, url: req.url, ...props };
};
export default BannerSearch;
