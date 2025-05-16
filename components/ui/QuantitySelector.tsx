import { type JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "./Icon.tsx";

const onClick = (delta: number) => {
  // doidera!
  event!.stopPropagation();
  const button = event!.currentTarget as HTMLButtonElement;
  const input = button.parentElement
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  const min = Number(input.min) || -Infinity;
  const max = Number(input.max) || Infinity;
  input.value = `${Math.min(Math.max(input.valueAsNumber + delta, min), max)}`;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
function QuantitySelector(
  { id = useId(), disabled, ...props }: JSX.IntrinsicElements["input"],
) {
  const quantity = props.value;
  return (
    <div class="join text-black">
      <button
        type="button"
        class="btn btn-square btn-ghost no-animation w-10 h-10 border border-lines rounded-[1px]"
        hx-on:click={useScript(onClick, -1)}
        disabled={disabled}
      >
        <Icon id={quantity != "1" ? "icon-decrease" : "icon-trash"} size={20} />
      </button>
      <div
        data-tip={`A quantidade deve estar entre ${props.min} e ${props.max}`}
        class={clx(
          "flex-grow join-item",
          "flex justify-center items-center",
          "has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom",
        )}
      >
        <input
          id={id}
          class={clx(
            "input text-center bg-transparent text-button text-[#111] flex-grow [appearance:textfield]",
            "invalid:input-error",
            "w-10 h-10"
          )}
          disabled={disabled}
          inputMode="numeric"
          type="number"
          {...props}
        />
      </div>
      <button
        type="button"
        class="btn btn-square btn-ghost no-animation w-10 h-10 border border-lines rounded-[1px]"
        hx-on:click={useScript(onClick, 1)}
        disabled={disabled}
      >
        <Icon id="icon-increase" size={20} />
      </button>
    </div>
  );
}
export default QuantitySelector;
