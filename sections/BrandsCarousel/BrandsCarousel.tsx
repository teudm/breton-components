import type { ImageWidget } from "apps/admin/widgets.ts";

export interface BrandsCarouselProps {
  allLogos: SliderImageProps[];
}

export interface SliderImageProps {
  image: ImageWidget;
  width: number;
  height: number;
}

export default function BrandsCarousel({ allLogos }: BrandsCarouselProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="logos overflow-hidden py-15 relative">
        <div className="flex whitespace-nowrap gap-[80px]">
          {Array(5).fill(
            <div className="flex z-10 gap-[80px] animate-slide">
              {allLogos && allLogos.map(({ width, height, image }) => (
                <div className="flex items-center justify-center" style={{ width }}>
                  <img
                    width={width}
                    height={height}
                    src={image}
                    alt={image}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
