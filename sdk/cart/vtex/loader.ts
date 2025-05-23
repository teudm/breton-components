import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import type a from "apps/vtex/loaders/cart.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { getPropertyValue } from "../../getProperty.ts";

export type Cart = Awaited<ReturnType<typeof a>>;

interface bretonInfos {
  designer: string;
  collection: string;
  name: string;
}

export const cartFrom = (form: Cart, url: string): Minicart => {
  const { items } = form ?? { items: [] };
  const coupon = form?.marketingData?.coupon ?? undefined;

  return {
    platformCart: form as unknown as Record<string, unknown>,
    storefront: {
      items: items.map((item, index) => {
        const detailUrl = new URL(item.detailUrl, url).href;
        return {
          ...itemToAnalyticsItem({ ...item, detailUrl, coupon }, index),
          image: item.imageUrl,
          listPrice: item.listPrice / 100,
          designer: (item.additionalInfo as unknown as bretonInfos).designer,
          collection: (item.additionalInfo as unknown as bretonInfos).collection,
          alternateName: (item.additionalInfo as unknown as bretonInfos).name,
        };
      }),
    },
  };
};

async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext
): Promise<Minicart> {
  const response = await ctx.invoke("vtex/loaders/cart.ts");
  const { items } = response;
  if (items.length > 0) {
    const productIds = items.map(item => item.productId);
    const products = await ctx.invoke(
      "vtex/loaders/intelligentSearch/productList.ts",
      {
        props: {
          ids: productIds,
        },
      }
    );
    if (!products) return cartFrom(response, req.url);
    const updatedItems = items.map(item => {
      const product = products.find(prod => prod.productID === item.productId);
      if (product && product.isVariantOf && product.isVariantOf.additionalProperty) {
        const designer = getPropertyValue(
          product.isVariantOf.additionalProperty,
          "Designer"
        );
        const name = getPropertyValue(
          product.isVariantOf.additionalProperty,
          "Nome"
        ) || product.name;
        const collection = getPropertyValue(
          product.isVariantOf.additionalProperty,
          "Coleção"
        );
        return {
          ...item,
          additionalInfo: {
            ...item.additionalInfo,
            designer,
            name,
            collection,
          }
        }
      }
      return item;
    });
    response.items = updatedItems;
  }
  return cartFrom(response, req.url);
}

export default loader;
