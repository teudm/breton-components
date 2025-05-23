import { useDevice } from "@deco/deco/hooks";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { TLCarouselItemProps } from "../types.ts";
import { clx } from "../../../../sdk/clx.ts";

export function TLCarouselItem({
  image,
  lcp,
}: {
  image: TLCarouselItemProps;
  lcp?: boolean;
}) {
  const { mobile, desktop, href } = image;
  const device = useDevice();

  const isMobile = device === "mobile";

  const textBoxContent = isMobile ? mobile.textBox : desktop.textBox;

  const allPositions = {
    center: { top: "50%", transform: "translateY(-50%)" },
    top: { top: "0" },
    bottom: { bottom: "0" },
  };

  const positionClass = allPositions[textBoxContent?.align ?? "bottom"];

  return (
    <a
      href={href ?? "#"}
      aria-label={textBoxContent?.title}
      class="relative block overflow-hidden w-full flex justify-center"
    >
      <Picture preload={lcp} class="w-full">
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={360}
          height={622}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={1360}
          height={622}
        />
        <img
          class="w-full object-cover duration-3000"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={textBoxContent?.title}
        />
      </Picture>
      {(textBoxContent?.description || textBoxContent?.title) && (
        <div
          class={clx(
            "absolute left-0",
            "px-6 max-md:py-6 md:py-8",
            "flex flex-col gap-4",
            "h-fit w-full justify-end items-center",
            "backdrop-blur-[10px] text-center left-auto",
            "right-auto max-md:m-6 md:m-10"
          )}
          style={{
            background: textBoxContent?.background ?? "#ffffff8f",
            color: textBoxContent?.textColor ?? "#000000",
            maxWidth: isMobile ? "calc(100% - 48px)" : "760px",
            ...positionClass,
          }}
        >
          {textBoxContent?.title && (
            <p class="text-[14px] font-medium tracking-[0.8px] leading-[24px]">
              {textBoxContent?.title}
            </p>
          )}
          {textBoxContent?.description && (
            <span class="text-[14px] font-light tracking-[0.8px] leading-[24px]">
              {textBoxContent?.description}
            </span>
          )}
        </div>
      )}
    </a>
  );
}
