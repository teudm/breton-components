import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { useComponent } from "../../sections/Component.tsx";
import Icon from "../../components/ui/Icon.tsx";
import CartItem, { Item } from "./Item.tsx";
import { useScript } from "@deco/deco/hooks";
import RequestQuoteModal from "./RequestQuoteModal.tsx";
export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
  };
}
const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send", // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }
      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach(container => {
        container
          ?.querySelectorAll("button")
          .forEach(node => (node.disabled = true));
        container
          ?.querySelectorAll("input")
          .forEach(node => (node.disabled = true));
      });
    }
  );
};
const sendBeginCheckoutEvent = () => {
  const quoteForm = document.querySelector('#product-quote-form');
  const products = quoteForm &&
  JSON.parse(
    decodeURIComponent(
      quoteForm.querySelector<HTMLInputElement>('input[name="products-quote"]')
        ?.value || "[]"
    ));
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};
export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? { cart: await ctx.invoke("site/loaders/minicart.ts") } // error fallback
    : { cart: await ctx.invoke("site/actions/minicart/submit.ts") };
export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Ocorreu algum erro enquanto carregávamos seu carrinho
        </span>
        <span class="text-sm text-center">
          Por favor, clique no botão abaixo para recarregar
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Recarregar
      </button>
    </div>
  );
}
export default function Cart({
  cart: {
    platformCart,
    storefront: { items },
  },
}: {
  cart: Minicart;
}) {
  const count = items.length;
  return (
    <>
      <form
        class="contents"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(JSON.stringify({ items }))}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300"
          )}
        >
          {count === 0 ? (
            <>
              <div class="p-6 flex-grow flex flex-col gap-4 w-full">
                <div class="py-16 px-4 bg-background-dark w-full flex flex-col gap-4 items-center justify-center text-black text-button uppercase">
                  <div class="inline-flex">
                    <Icon id="icon-briefcase" size={24} />
                    <span
                      class={clx(
                        "-ml-1 w-5 h-5",
                        "text-contentMini font-medium text-primary text-center text-white",
                        "bg-black rounded-full bag-badge",
                        "flex items-center justify-center"
                      )}
                    >
                      0
                    </span>
                  </div>
                  <span>Carrinho vazio</span>
                </div>
              </div>
              <footer class="w-full p-6">
                <label
                  for={MINICART_DRAWER_ID}
                  class="btn btn-glass uppercase text-button w-full"
                >
                  Continuar navegando
                </label>
              </footer>
            </>
          ) : (
            <>
              {/* Cart Items */}
              <ul
                role="list"
                class="p-6 flex-grow overflow-y-auto flex flex-col gap-4 w-full"
              >
                {items.map((item, index) => (
                  <li>
                    <CartItem item={item} index={index} showQtSelector />
                  </li>
                ))}
              </ul>

              {/* Cart Footer */}
              <footer class="w-full">
                <div class="p-6">
                  <label
                    for="product-quote"
                    class="flex cursor-pointer items-center justify-center rounded-[2px] bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3"
                    hx-on:click={useScript(sendBeginCheckoutEvent)}
                  >
                    <span class="[.htmx-request_&]:hidden flex gap-4">
                      <Icon id="icon-briefcase" size={24} />
                      Solicitar orçamento
                    </span>
                    <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                  </label>
                </div>
              </footer>
            </>
          )}
        </div>
      </form>
      <RequestQuoteModal items={items} />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
