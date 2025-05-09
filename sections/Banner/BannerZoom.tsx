import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { useDevice } from "@deco/deco/hooks";

export interface BannerZoomProps {

  /** @title Background Image */
  background: {
    mobile: {
      image: ImageWidget;
      width?: number;
      height?: number;
    };
    
    desktop: {
      image: ImageWidget;
      width?: number;
      height?: number;
    };

    /** @title Hover Zoom? */
    hoverZoom?: boolean;
  };

  /** @title Padding Bottom of the GradientBox */
  boxPaddingBottom?: {
    desktop: number;
    mobile: number;
  };

  /** @title Content of the GradientBox */
  description?: string;
}

function BannerZoom({ content = {}, background, description, boxPaddingBottom }: BannerZoomProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const { title } = content;

  const pbDesktop = boxPaddingBottom ? boxPaddingBottom.desktop : 116;
  const pbMobile = boxPaddingBottom ? boxPaddingBottom.mobile : 316;

  const pb = isMobile ? `${pbMobile}px` : `${pbDesktop}px`;
  

  return (
    <Section.Tabbed>
      <div
        class="relative sm:mx-0 overflow-hidden group"
        style={{paddingBottom: pb}}
      >
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={background.mobile.image}
            width={background.mobile.width || 360}
            height={background.mobile.height || 800}
          />
          <Source
            media="(min-width: 640px)"
            src={background.desktop.image}
            width={background.desktop.width || 1360}
            height={background.desktop.height || 760}
          />
          <img
            src={background.desktop.image}
            alt={title}
            class={`w-full object-cover ${
              background.hoverZoom
                ? "md:scale-[0.9] md:hover:scale-[1] duration-3000 ease-in-out"
                : ""
            }`}
          />
        </Picture>

        {description && (
          <div
            class={clx(
              "absolute left-0 bottom-0",
              "max-md:px-6 md:px-[141px]",
              "flex flex-col",
              "h-fit w-full justify-end items-center"
            )}
          >
            <span class="text-center max-md:p-6 md:px-12 md:py-10 bg-[#ffffff8f] backdrop-blur-[10px] max-w-[814px] text-[15px] font-light tracking-[0.9px] leading-[24px]">
              {description}
            </span>
          </div>
        )}
      </div>
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default BannerZoom;
