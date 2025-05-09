import { SectionProps } from "@deco/deco";

interface SearchTerm {
  defaultTerm?: string;
}

function SearchTerm({ searchTerm }: SectionProps<typeof loader>) {
  if(!searchTerm) return null;

  return (
    <div class="grid grid-cols-1 grid-rows-1 max-h-[560px] overflow-hidden pt-[30px] pb-[50px]">
      <div class="container gap-[16px] flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <p class="text-center uppercase text-[11px] font-medium text-black w-full tracking-[1px]">
          resultado para a busca:
        </p>
        <h1 class="text-center w-full">
          <span class="uppercase sm:text-[40px] font-medium text-black text-base-100 text-2xl tracking-[1px]">
            {`"${searchTerm}"`}
          </span>
        </h1>
      </div>
    </div>
  );
}

export const loader = ({ defaultTerm }: SearchTerm, { url }: Request) => {
  const searchParams = new URLSearchParams(new URL(url)?.search)
  const searchTerm = searchParams?.get("q") ?? defaultTerm;
  return {
    searchTerm,
  };
};

export default SearchTerm;
