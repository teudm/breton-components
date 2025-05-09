import { ImageWidget, Color } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";

export interface InstitutionalOrdenatedListProps {
  /** @title Title*/
  title: string;

  /** @title Description*/
  description: string;

  /** @title Banner Image */
  bannerImage: ImageWidget;

  /** @title Background Color */
  backgroundColor: Color;

  /** @title List */
  list: string[];
}

export default function InstitutionalOrdenatedList({
  title,
  description,
  bannerImage,
  backgroundColor,
  list,
}: InstitutionalOrdenatedListProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div style={{ backgroundColor }}>
      <div
        class="container grid text-white max-md:pt-[48px] md:pt-[185px] max-md:pb-[48px] md:pb-[120px] items-start"
        style={{ gridTemplateColumns: isMobile ? "1fr" : "auto 50%", gap: isMobile ? "40px" :"117px" }}
      >
        <div class="flex max-md:flex-col max-md:items-start md:items-center gap-10">
          <img src={bannerImage} alt={title} />
          <div class="flex flex-col gap-4">
            <h3 class="max-md:text-[34px] md:text-[40px] font-medium max-md:leading-10 md:leading-[48px] max-md:tracking-[5.44px] md:tracking-[6.4px] uppercase">
              {title}
            </h3>
            <p class="text-[15px] font-light leading-[24px] tracking-[0.9px] max-md:max-w-[270px]">
              {description}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-12 max-md:max-w-[312px]">
          {list.map((item, index) => (
            <div class="flex flex-col gap-2">
              <p class="text-[15px] font-light leading-[24px] tracking-[0.9px]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
