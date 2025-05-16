import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
}
const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!)
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
};
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe(_sdk => {
    const container = document.getElementById(id);
    // enable interactivity
    container
      ?.querySelectorAll<HTMLButtonElement>("button")
      .forEach(node => (node.disabled = false));
  });
};
const useAddToCart = ({ product, seller }: Props) => {
  const { productID } = product;
  return {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity: 1, seller: seller, id: productID }],
  };
};

function AddToCartButton(props: Props) {
  const { product, item, class: _class, children } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  return (
    <div
      id={id}
      class="flex max-md:w-full"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps })
      )}
    >
      <button
        disabled
        type="button"
        class={clx("flex-grow disabled:opacity-20 group", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        {children}
        <span class="group-disabled:inline hidden loading loading-spinner" />
      </button>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default AddToCartButton;
