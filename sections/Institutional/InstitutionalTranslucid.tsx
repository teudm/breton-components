import { Color, ImageWidget } from "apps/admin/widgets.ts";
import { VideoProps as VideoProperties } from "../Video/Video.tsx";
import Video from "../Video/Video.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface InstitutionalTranslucidProps {
  /** @title Media Type*/
  /** @description Escolha entre vídeo ou imagem */
  mediaType: VideoProperties | InstitutionalTranslucidBannerProps;
}

export interface InstitutionalTranslucidBannerProps {
  /** @title Title of the banner */
  title?: string;

  /** @title Subtitle of the banner */
  subtitle?: string;

  /** @title Description of the banner */
  description?: string[];

  /** @title Card Background */
  cardBackground?: Color;

  /** @title Desktop Background Image */
  backgroundImageDesktop?: ImageWidget;

  /** @title Mobile Background Image */
  backgroundImageMobile?: ImageWidget;
}

export default function InstitutionalTranslucid({
  mediaType,
}: InstitutionalTranslucidProps) {
  if ("videoDesktop" in mediaType) {
    return <Video {...mediaType} />;
  }
  if ("backgroundImageDesktop" in mediaType) {
    return <InstitutionalTranslucidBanner {...mediaType} />;
  }
}

function InstitutionalTranslucidBanner({
  title,
  subtitle,
  description,
  cardBackground,
  backgroundImageDesktop,
  backgroundImageMobile,
}: InstitutionalTranslucidBannerProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const backgroundImage = isMobile
    ? backgroundImageMobile
    : backgroundImageDesktop;

  return (
    <div class="relative w-full flex flex-row-reverse items-stretch">
      <img
        class="md:max-w-[80%] ml-auto w-full object-cover"
        src={backgroundImage}
        alt={title}
      />
      <div class="bg-[#F8F5F2] md:w-[20%] w-full max-md:hidden" />
      <div
        class="md:max-w-[80%] mr-auto absolute z-10 w-full h-full left-0 max-md:hidden"
        style={{
          background:
            "linear-gradient(270deg, rgba(248, 245, 242, 0.00) 0%, #F8F5F2 100%)",
        }}
      />
      <div
        class="absolute z-20 top-[50%] left-[50%] -translate-1/2 max-md:p-6 md:py-16 md:px-12 w-full"
        style={{
          background: cardBackground,
          transform: "translate(-50%, -50%)",
          maxWidth: isMobile ? "calc(100% - 48px)" : "560px",
        }}
      >
        {subtitle && (
          <h5 class="md:text-center text-[10px] font-normal leading-4 tracking-[2.4px] uppercase">
            {subtitle}
          </h5>
        )}
        {title && (
          <h4 class="mt-2 mb-5 md:text-center text-[22px] font-semibold leading-[32px] tracking-[1.76px] uppercase">
            {title}
          </h4>
        )}
        {description && (
          <p class="md:text-center text-sm font-light leading-[24px] tracking-[0.84px] flex flex-col">
            {description.map((text, index) => (
              <span class={index + 1 === description.length ? "" : "pb-6"}>
                {text}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
