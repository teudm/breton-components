import Slider from "../../../../ui/Slider.tsx";
import { useDevice } from "@deco/deco/hooks";
import { HistorySlideProps } from "../../types.ts";

export function BretonVersatilityHistoryMobile({
  title,
  subtitle,
  topics,
  index,
}: HistorySlideProps & { index: number }) {
  return (
    <>
      {topics.map((topic, i) => (
        <Slider.Item
          index={index}
          class="carousel-item w-full transition-transform duration-500 ease-in-out relative"
          style={{ maxWidth: "100%" }}
        >
          <div class="bg-base-100 w-full h-full flex flex-col gap-[56px] max-md:px-[55px] justify-center">
            {i === 0 && (
              <div class="flex flex-col gap-2">
                <p class="text-h2">{title}</p>
                <p class="text-caption uppercase">{subtitle}</p>
              </div>
            )}
            <div class="flex flex-col gap-8">
              <div class="flex flex-col gap-2">
                <p class="text-[#242424] text-[10px] font-medium font-['F37 Neuro'] uppercase leading-none tracking-widest">
                  {topic.title}
                </p>
                <p class="text-[#242424] text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide max-md:pb-[100px]">
                  {topic.text}
                </p>
              </div>
            </div>
          </div>
        </Slider.Item>
      ))}
    </>
  );
}

export default function BretonVersatilityHistory({
  title,
  subtitle,
  topics,
  index,
}: HistorySlideProps & { index: number }) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <Slider.Item
      index={index}
      class="carousel-item w-full relative"
      style={{ maxWidth: isMobile ? "calc(100% - 24px)" : "50vw" }}
    >
      <div class="bg-base-100 w-full h-full flex flex-col gap-[56px] max-md:pt-[80px] max-md:pb-[94px] md:py-[92px] max-md:px-[32px] md:px-[120px]">
        <div class="flex flex-col gap-2">
          <p class="text-h2">{title}</p>
          <p class="text-caption uppercase">{subtitle}</p>
        </div>
        <div class="scrollbarNew max-md:pr-[24px] md:pr-[32px] flex flex-col gap-8 max-md:max-h-[337px] md:max-h-[488px] overflow-y-auto">
          {topics.map((topic) => (
            <div class="flex flex-col gap-2">
              <p class="text-[#242424] text-[10px] font-medium font-['F37 Neuro'] uppercase leading-none tracking-widest">
                {topic.title}
              </p>
              <p class="text-[#242424] text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide">
                {topic.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slider.Item>
  );
}
