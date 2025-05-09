/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

// import { Suggestion } from "apps/commerce/types.ts";
// import { useComponent } from "../../../sections/Component.tsx";
// import { Props as SuggestionProps } from "./Suggestions.tsx";
// import { asResolved } from "@deco/deco";
// import { type Resolved } from "@deco/deco";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

export interface CustomSuggestions {
  label: string;
  href: string;
}

export interface ImageLinks {
  label: string;
  mobileLabel?: string;
  href: string;
  image: ImageWidget;
}
export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;

  // loader: Resolved<Suggestion | null>;
  /** @maxItems 7 */
  suggestions?: CustomSuggestions[];
  /** @maxItems 4 */
  images?: ImageLinks[];
}
const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });

  if (input) {
    const clearSearch = document.querySelector("#clear-search");
    clearSearch?.addEventListener("click", (event) => {
      event.preventDefault();
      input.value = "";
    });
    input.addEventListener("click", () => {
      clearSearch?.classList.remove("hidden");
      document
        .getElementById("search-submit")
        ?.classList.remove("translate-x-[58px]");
    });
  }

  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;
    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as HTMLInputElement | null;
      if (input) {
        input.checked = true;
        document.getElementById(formId)?.focus();
      }
    }
  });
};
// const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar({
  placeholder = "What are you looking for?",
  suggestions,
  images,
}: SearchbarProps) {
  const slot = useId();
  const device = useDevice();
  return (
    <div class="w-full flex flex-col min-h-[560px] justify-between gap-5 md:p-4 text-black overflow-hidden">
      <div class="mt-[52px]">
        <form
          id={SEARCHBAR_INPUT_FORM_ID}
          action={ACTION}
          class="flex items-center md:w-[520px] border-b border-[#EEEEEE] py-4 mx-4 md:mx-auto overflow-hidden"
        >
          <button id="clear-search" class="hidden">
            <Icon id="clear-search" size={16} class="mr-4" />
          </button>
          <input
            autoFocus
            tabIndex={0}
            class="outline-none flex-grow text-button uppercase bg-transparent"
            name={NAME}
            placeholder={placeholder}
            autocomplete="off"
            hx-target={`#${slot}`}
            id={"search-menu-input"}
            // hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            //   loader: asResolved(loader),
            // })}
            hx-trigger={`input changed delay:300ms, ${NAME}`}
            hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
            hx-swap="innerHTML"
          />
          <button
            type="submit"
            class="flex gap-2 translate-x-[58px] transition-transform duration-300"
            aria-label="Search"
            id="search-submit"
            for={SEARCHBAR_INPUT_FORM_ID}
            tabIndex={-1}
          >
            {/* <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" /> */}
            <Icon id="search" class="inline" />
            <span class="text-button">Buscar</span>
          </button>
        </form>
        {suggestions && (
          <div class="overflow-auto mt-16 md:mt-10 px-5 md:p-0 hide-scrollbar">
            <div class="flex gap-2 md:justify-center">
              {suggestions.map(({ href, label }) => (
                <a
                  href={href}
                  class="h-12 rounded-[2px] border border-[#EEEEEE] px-[23px] flex items-center justify-center"
                >
                  <span class="text-button opacity-[64%] uppercase">{label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {images && (
        <div class="flex flex-col gap-4 mx-4 md:m-0">
          <span class="uppercase text-caption text-center">Inspire-se</span>
          <div class="grid grid-cols-2 md:flex gap-4">
            {images.map(({ label, mobileLabel, href, image }) => (
              <a
                class="flex relative w-full items-center group/submenu overflow-hidden"
                href={href}
              >
                <img
                  class="w-full h-auto object-cover md:group-hover/submenu:scale-110 duration-3000"
                  src={image || ""}
                  alt={label}
                />
                <span class="absolute flex items-center justify-center h-full w-full text-h5Mobile md:text-h5 text-white uppercase">
                  <span class="max-w-[50%] text-center">{(device === "mobile" && mobileLabel) ? mobileLabel : label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
      {/* Suggestions slot
      <div id={slot} /> */}

      {/* Send search events as the user types */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            SEARCHBAR_INPUT_FORM_ID,
            NAME,
            SEARCHBAR_POPUP_ID
          ),
        }}
      />
    </div>
  );
}
