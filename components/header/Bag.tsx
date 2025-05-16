import { MINICART_DRAWER_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe(sdk => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;
    if (!counter) {
      return;
    }
    counter.innerText = count > 9 ? "9+" : count.toString();
  });
function Bag() {
  const id = useId();
  return (
    <>
      <label
        class="inline-flex cursor-pointer"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span>
          <Icon id="icon-briefcase" />
        </span>
        <span
          id={id}
          class={clx(
            "-ml-1 w-5 h-5",
            "text-contentMini font-medium text-primary text-center",
            "bg-white rounded-full bag-badge",
            "flex items-center justify-center",
            "transition-all duration-300",
            "group-hover:bg-primary group-hover:text-white"
          )}
        />
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}
export default Bag;
