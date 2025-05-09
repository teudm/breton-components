import { Picture, Source } from "apps/website/components/Picture.tsx";
import { CommonImageProps } from "../../types.ts";
import { useDevice } from "@deco/deco/hooks";

export default function BretonVersatilityCoverItem({
  mobileImage, 
  desktopImage,
  lcp,
}: {
  mobileImage: CommonImageProps;
  desktopImage: CommonImageProps;
  lcp?: boolean;
}) {
  
  const device = useDevice();
  const isMobile = device === "mobile";
  return (
    <div
      class="relative block overflow-hidden w-full my-0 h-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobileImage.image}
          width={mobileImage.width}
          height={mobileImage.height}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktopImage.image}
          width={desktopImage.width}
          height={desktopImage.height}
        />
        <img
          className="w-full object-cover h-full"
          loading={lcp ? "eager" : "lazy"}
          src={isMobile ? mobileImage.image : desktopImage.image}
          alt={isMobile ? mobileImage.alt : desktopImage.alt}
        />
      </Picture>
    </div>
  );
}