import { ProductListingPage } from "apps/commerce/types.ts";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};

const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};

const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior valor",
  "price:asc": "Menor valor",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  return (
    <>
      <input type="checkbox" id="sort-menu" class="peer hidden" />
      <label
        for="sort-menu"
        class="btn btn-glass text-button uppercase w-full"
      >
        Ordenar
      </label>
      <div
        class="absolute z-20 right-0 top-full w-full bg-white border border-gray-300 opacity-0 peer-checked:opacity-100 peer-checked:visible invisible transition-opacity"
      >
        <ul class="py-2">
          {options.map(({ value, label }) => (
            <li key={value}>
              <a
                href={value}
                class={`block px-4 py-2 text-gray-700 text-caption uppercase ${
                  value === current ? "font-bold" : ""
                }`}
              >
                {labels[label] ?? label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sort;
