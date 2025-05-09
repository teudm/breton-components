import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface StickyBannerProps {
  content?: {
    title?: HTMLWidget;
    description?: HTMLWidget;
    titleImage?: {
      image: ImageWidget;
      width?: number;
      height?: number;
    };
    paddingBottom?: number;
  };

  principalBanner?: boolean;

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

  cta?: {
    href: string;
    label: string;
  };
}

function StickyBanner({
  content = {},
  background,
  cta,
  principalBanner,
}: StickyBannerProps) {
  const { title, description, titleImage, paddingBottom } = content;

  return (
    <Section.Tabbed>
      <section class="relative">
        <div
          class="sticky top-0 sm:mx-0 overflow-hidden group max-md:-mt-[56px] md:-mt-[100px]"
          id={principalBanner ? "main-banner" : null}
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
                  ? "md:group-hover:scale-110 duration-3000 ease-in-out"
                  : ""
              }`}
            />
          </Picture>

          <div
            class={clx(
              "absolute left-0 bottom-0",
              "px-6 pb-12 md:p-16",
              "flex flex-col",
              "h-full w-full justify-end",
              "z-10"
            )}
          >
            <div class="">
              {cta && (
                <a
                  href={cta.href}
                  class="btn btn-neutral btn-outline uppercase text-button w-fit px-[23px] font-medium"
                >
                  {cta.label}
                </a>
              )}
            </div>
          </div>
        </div>

        <div
          class={clx(
            "p-0",
            "flex flex-col",
            "h-fit w-full justify-end",
            "relative z-20",
            "md:-mt-[312px] max-md:-mt-[262px]"
          )}
          style={{ paddingBottom: paddingBottom || null }}
        >
          {title && (
            <div
              class="px-5 py-4 w-screen text-center"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {description && (
            <span
              class="text-contentMini nobreak-text-mobile pt-4 md:pb-8 md:pt-2 text-white"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {titleImage && (
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
        <div
          class="max-md:pb-[264px] md:pb-[304px]"
        />
        <div
          class="max-md:pb-[764px] md:pb-[764px] absolute bottom-0 w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 250%)",
          }}
        />
      </section>
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default StickyBanner;
