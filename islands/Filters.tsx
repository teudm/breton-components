import { useState } from "preact/hooks";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Avatar from "../components/ui/Avatar.tsx";
import { clx } from "../sdk/clx.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox rounded-[2px]" />
      <span class="text-[10px] uppercase font-normal tracking-[24%]">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-400 hidden">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-[16px]`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

  const handleFilterClick = (index: number) => {
    setOpenFilterIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul class="flex sm:flex-row flex-col xl:gap-10 md:gap-[1rem] gap-[1.5rem] p-4 sm:p-0 justify-center">
      {filters
        .filter(isToggle)
        .filter((filter) =>
          !["subcategoria", "classificação", "profundidade", "preço"].includes(
            filter.label.toLowerCase(),
          )
        )
        .map((filter, index) => (
          <li class="group flex flex-col gap-4 relative" key={filter.key} id={filter.key}>
            <input
              type="checkbox"
              id={`${index}-${filter.key}`}
              class="group peer opacity-0"
              checked={openFilterIndex === index}
              onChange={() => handleFilterClick(index)}
            />

            <label
              htmlFor={`${index}-${filter.key}`}
              class="cursor-pointer uppercase text-xs tracking-[2px] flex items-center gap-[8px] sm:justify-start justify-between"
            >
              {filter.label}

              <svg
                class={`block ${
                  openFilterIndex === index ? "" : ""
                } rotate-0 ${
                  openFilterIndex === index ? "rotate-180" : ""
                } transition-transform duration-300`}
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 0.999999L7 7L13 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </label>

            <div
              class={`hidden ${
                openFilterIndex === index ? "peer-checked:flex" : ""
              } absolute z-[999] min-h-fit top-[150%] bg-white border-b border-[#EEEEEE] min-w-max py-5 px-[15px]`}
            >
              <FilterValues {...filter} />
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;