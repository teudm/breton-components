import { type AppContext } from "apps/vtex/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { cartFrom } from "./loader.ts";
import { getPropertyValue } from "../../getProperty.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, req, ctx) => {
    const response = await ctx.invoke(
      "vtex/actions/cart/addItems.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart
    );

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
        const product = products.find(
          prod => prod.productID === item.productId
        );
        if (
          product &&
          product.isVariantOf &&
          product.isVariantOf.additionalProperty
        ) {
          const designer = getPropertyValue(
            product.isVariantOf.additionalProperty,
            "Designer"
          );
          const name =
            getPropertyValue(product.isVariantOf.additionalProperty, "Nome") ||
            product.name;
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
            },
          };
        }
        return item;
      });
      response.items = updatedItems;
    }
    return cartFrom(response, req.url);
  },
  setQuantity: async ({ items }, req, ctx) => {
    const response = await ctx.invoke("vtex/actions/cart/updateItems.ts", {
      allowedOutdatedData: ["paymentData"],
      orderItems: items.map((quantity, index) => ({ quantity, index })),
    });

    const { items: responseItems } = response;
    if (responseItems.length > 0) {
      const productIds = responseItems.map(item => item.productId);
      const products = await ctx.invoke(
        "vtex/loaders/intelligentSearch/productList.ts",
        {
          props: {
            ids: productIds,
          },
        }
      );
      if (!products) return cartFrom(response, req.url);
      const updatedItems = responseItems.map(item => {
        const product = products.find(
          prod => prod.productID === item.productId
        );
        if (
          product &&
          product.isVariantOf &&
          product.isVariantOf.additionalProperty
        ) {
          const designer = getPropertyValue(
            product.isVariantOf.additionalProperty,
            "Designer"
          );
          const name =
            getPropertyValue(product.isVariantOf.additionalProperty, "Nome") ||
            product.name;
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
            },
          };
        }
        return item;
      });
      response.items = updatedItems;
    }
    return cartFrom(response, req.url);
  },
  // setCoupon: async ({ coupon }, req, ctx) => {
  //   const response = await ctx.invoke(
  //     "vtex/actions/cart/updateCoupons.ts",
  //     { text: coupon ?? undefined },
  //   );

  //   return cartFrom(response, req.url);
  // },
};

export default actions;
