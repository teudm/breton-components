import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
  designer?: string;
  collection?: string;
  alternateName?: string;
};
export interface Props {
  item: Item;
  index: number;
  showQtSelector?: boolean;
}
const QUANTITY_MAX_VALUE = 100;

function CartItem({ item, index, showQtSelector }: Props) {
  const { image, quantity } = item;
  const name =
    item.alternateName && item.alternateName.length > 0
      ? item.alternateName // deno-lint-ignore no-explicit-any
      : (item as any).item_name;
  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-4 bg-background-dark px-4 py-6"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image.replace("55-55", "132-132")}
        style={{ aspectRatio: "112 / 132" }}
        width={112}
        height={132}
        class="h-full object-contain mix-blend-multiply"
        fit="contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-4 justify-center">
        {/* Name and Remove button */}
        <div class="flex flex-col">
          <legend class="text-button uppercase">{name}</legend>
          {item.designer && item.designer.length > 0 && (
            <legend class="text-legend">Por {item.designer}</legend>
          )}
        </div>

        {/* Quantity Selector */}
        {showQtSelector && (
          <div>
            <QuantitySelector
              min={0}
              max={QUANTITY_MAX_VALUE}
              value={quantity}
              name={`item::${index}`}
            />
          </div>
        )}
      </div>
    </fieldset>
  );
}
export default CartItem;
