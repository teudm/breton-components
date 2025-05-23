import BretonVersatilityContent from "../../components/institutional/VersatilityCarousel/components/BretonVersatilityContent.tsx";
import { filterPlaces } from "../../components/institutional/VersatilityCarousel/events/filterPlaces.ts";
import { rotateArrow } from "../../components/institutional/VersatilityCarousel/events/rotateArrow.ts";
import { BretonVersatilityCarouselProps } from "../../components/institutional/VersatilityCarousel/types.ts";
import { useScript, useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";

export default function BretonVersatilityCarousel({
  title,
  subtitle,
  places,
  limitPerPage = 6,
}: BretonVersatilityCarouselProps) {
  const device = useDevice();
  const isMobile = device === "mobile";
  const placesNames: string[] = [];

  const id = useId();

  places.forEach((place) => {
    if (!placesNames.includes(place.type)) {
      placesNames.push(place.type);
    }
  });

  return (
    <>
      <div class="flex flex-col gap-10">
        <div class="container flex justify-between items-end flex-wrap max-md:hidden">
          <div class="flex flex-col gap-2">
            <p class="text-caption uppercase">{subtitle}</p>
            <h2 class="text-h4 uppercase">{title}</h2>
          </div>
          <div id="selectCustomGroup">
            <div id="filterPlacesSelect" class="uppercase relative">
              <button
                id="filterPlacesToggleButton"
                type="button"
                class="selectCustom flex"
              >
                <span>FILTRE POR CATEGORIA</span>
                <span class="selectCustomAfter" />
              </button>
              <form
                id="filterAllPlaces"
                class="scrollbarNew hidden absolute z-10 top-[32px] flex flex-col gap-4 bg-[#FCF9F7] border border-[#F1EBE8] p-6 w-[calc(100%+16px)] overflow-y-auto max-h-[184px]"
              >
                {placesNames.map((place) => (
                  <div id={`eachPlace-${place}`} class="flex gap-[10px] relative">
                    <input
                      type="checkbox"
                      id={place}
                      name={place}
                      class="w-[22px] h-[22px] bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-200 z-10"
                    />
                    <div class="hidden w-auto h-auto absolute top-0 left-0" id="eachPlaceChecked">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M0 2C0 0.89543 0.895431 0 2 0H20C21.1046 0 22 0.895431 22 2V20C22 21.1046 21.1046 22 20 22H2C0.89543 22 0 21.1046 0 20V2Z"
                          fill="#672135"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.17172 14.3138L9.58594 15.728L11.0002 14.3138L17.3641 7.94985L15.9499 6.53564L9.58594 12.8996L6.0504 9.36407L4.63619 10.7783L8.17172 14.3138Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <label for={place} class="text-caption">
                      {place}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>

        <BretonVersatilityContent places={places} id={id} />

        <button
          type="button"
          id={`showMoreButton-${id}`}
          class="btn btn-ghost border border-black hidden flex self-center"
        >
          <span class="inline text-xs uppercase font-medium [.htmx-request_&]:hidden tracking-[1px]">
            Carregar mais
          </span>
          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </button>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(filterPlaces, places, limitPerPage, id, isMobile),
        }}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(rotateArrow, "filterPlacesToggleButton"),
        }}
      />
    </>
  );
}
