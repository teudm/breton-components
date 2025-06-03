import { clx } from "../../../../../sdk/clx.ts";
import Icon from "../../../../ui/Icon.tsx";

export default function VersatilityWishlistButton({ id }: { id: string }) {
  return (
    <div
      class="wishListButton absolute z-10 top-2 right-2"
    >
      <button
        id={id}
        data-wishlist-button
        disabled
        type="button"
        aria-label="Add to wishlist"
        class={clx(
          "btn no-animation",
          "btn-circle btn-ghost btn-sm",
          "min-h-9 h-fit"
        )}
      >
        <Icon id="icon-heart" class="[.htmx-request_&]:hidden" fill="none" />
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
      </button>
    </div>
  );
}
