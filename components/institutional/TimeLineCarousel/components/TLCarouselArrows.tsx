import Icon from "../../../../components/ui/Icon.tsx";
import Slider from "../../../../components/ui/Slider.tsx";

export function TLCarouselArrows() {
  return (
    <div class="mt-[20px] absolute top-[50%] -translate-y-1/2 w-full flex justify-between">
      <div class="flex items-center justify-start mx-4 z-10 col-start-1 row-start-2">
        <Slider.PrevButton
          class="btn btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE] bg-white text-black"
          disabled={false}
        >
          <Icon id="chevron-left" size={32} />
        </Slider.PrevButton>
      </div>

      <div class="flex items-center justify-end mx-4 z-10 col-start-3 row-start-2">
        <Slider.NextButton
          class="btn btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE] bg-white text-black"
          disabled={false}
        >
          <Icon id="chevron-right" size={32} />
        </Slider.NextButton>
      </div>
    </div>
  );
}
