import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title: string;
  description?: HTMLWidget;

  images: {
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
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta }: Props) {
  return (
    <Section.Tabbed>
      <div class="relative sm:mx-0 overflow-hidden group md:mb-4">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile.image}
            width={images.mobile.width || 360}
            height={images.mobile.height || 640}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop.image}
            width={images.desktop.width || 1360}
            height={images.desktop.height || 800}
          />
          <img
            src={images.desktop.image}
            alt={title}
            class="w-full object-cover md:group-hover:scale-110 duration-3000 ease-in-out"
          />
        </Picture>

        <div
          class={clx(
            "absolute left-0 bottom-0",
            "px-6 pb-12 md:p-16",
            "flex flex-col",
            "h-fit w-full justify-end",
            "bg-banner-gradient",
          )}
        >
          {title && (
            <span class="font-normal text-h2Mobile md:text-h2 text-white">
              {title}
            </span>
          )}
          {description && (
            <span
              class="text-contentMini nobreak-text-mobile pt-4 pb-8 md:pt-2 text-white"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
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
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
