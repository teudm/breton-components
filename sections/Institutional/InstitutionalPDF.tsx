import { ImageWidget, Color } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";

export interface InstitutionalPDFProps {
  bannerImage: ImageWidget;
  bannerImageMobile: ImageWidget;
  title: string;
  label: string;

  /** @title PDF Download Link */
  pdfLink: string;

  image: ImageWidget;
  gradientColor: Color;
}

export default function InstitutionalPDF({
  bannerImage,
  bannerImageMobile,
  title,
  label,
  pdfLink,
  image,
  gradientColor,
}: InstitutionalPDFProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const backgroundGradient = isMobile
    ? `linear-gradient(90deg, rgba(18, 52, 15, 0.00) -15%, ${gradientColor} 15%, ${gradientColor} 85%, rgba(18, 52, 15, 0.00) 115%)`
    : `linear-gradient(90deg, rgba(18, 52, 15, 0.00) 0%, ${gradientColor} 25%, ${gradientColor} 75%, rgba(18, 52, 15, 0.00) 100%)`;

  return (
    <div
      class="container relative max-md:min-h-[168px] md:min-h-[120px] rounded-sm max-md:max-w-[calc(100%-48px)] max-md:m-auto"
      style={{
        background: `url(${
          isMobile ? bannerImageMobile : bannerImage
        }) center center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <a
        class="absolute w-full h-full left-0 top-0 flex items-center justify-center rounded-sm"
        style={{
          background: backgroundGradient,
        }}
        href={pdfLink ? pdfLink : "#"}
        target="_blank"
        aria-label={`Download ${title} PDF`}
      >
        <div class="flex items-center justify-center gap-6 max-md:max-w-[calc(100%-48px)]">
          <img src={image} alt="" class="max-md:hidden" />
          <div class="flex flex-col gap-2">
            <p class="text-white font-semibold uppercase text-h5Mobile text-center md:text-h5 max-md:text-center">
              {title}
            </p>
            <p class="text-white text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide max-md:text-center">
              {label}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
