import { type RichText, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { useDevice } from "@deco/deco/hooks";

export interface FullBannerProps {

  /** @title Informações do Conteúdo */
  content?: {
    title?: RichText;
    description?: RichText;
    titleImageDesktop?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    titleImageMobile?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
  };

  /** @hide True */
  initialBlock?: boolean;

  /** @title Informações do Background da Imagem */
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
    hoverZoom?: boolean;
  };

  /** @title Has Gradient? */
  /** @default true */
  hasGradient?: boolean;
}

function FullBanner({
  content = {},
  background,
  initialBlock,
  hasGradient = true,
}: FullBannerProps) {
  const { title, description, titleImageDesktop, titleImageMobile } = content;
  const device = useDevice();
  const isMobile = device === "mobile";
  const titleImage = isMobile ? titleImageMobile : titleImageDesktop;

  return (
    <section>
      <div
        class="relative sm:mx-0 overflow-hidden group"
        id={initialBlock ? "main-banner" : null}
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
            class={`w-full object-cover ${background.hoverZoom ? "md:group-hover:scale-110 duration-3000 ease-in-out" : ""}`}
          />
        </Picture>

        <div
          class={clx(
            "absolute left-0 top-[50%]",
            "pb-12 px-0",
            "flex flex-col",
            "h-fit w-full",
            "z-20 -translate-y-[50%]"
          )}
        >
          {title && (
            <div
              class="md:px-5 py-4 text-center"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {description && (
            <span
              class="text-contentMini nobreak-text-mobile pt-4 md:pb-8 md:pt-2 text-white"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {titleImage && titleImage.image && (
            <div class="flex justify-center">
              <img
                src={titleImage.image}
                alt={title}
                class="w-20 h-20 object-contain"
                style={{ width: titleImage.width, height: titleImage.height }}
              />
            </div>
          )}
        </div>
        {hasGradient && <div
          class={clx(
            "absolute left-0 bottom-0",
            "md:h-[400px] max-md:h-[360px] w-full",
            "flex flex-col",
            "h-fit w-full justify-end",
            "bg-banner-gradient z-10"
          )}
        />}
      </div>
    </section>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default FullBanner;
