import { ImageWidget, Color } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

export interface InstitutionalSustainabilityProps {
  title: string;
  texts: string[];

  /** @title Background Color */
  backgroundColor: Color;

  responsabilities: Responsability[];
}

interface Responsability {
  image: ImageWidget;
  width: string;
  height: string;
  resposability: string;
  texts: string[];
}

export default function InstitutionalSustainability({
  title,
  texts,
  backgroundColor,
  responsabilities,
}: InstitutionalSustainabilityProps) {
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <div class="container md:container flex max-md:flex-col max-md:gap-[56px] max-md:pt-20 max-md:pb-16 md:py-[120px] text-white">
        <LeftColResponsabilities title={title} texts={texts} />
        <InstitutionalAllResponsabilities responsabilities={responsabilities} />
      </div>
    </div>
  );
}

function LeftColResponsabilities({
  title,
  texts,
}: {
  title: string;
  texts: string[];
}) {
  return (
    <div
      class={clx(
        `max-md:container max-md:px-0 flex max-md:flex-col max-md:gap-[32px] md:gap-[49px] max-md:max-w-[100%] md:max-w-[50%] w-full md:pr-[64px]`
      )}
    >
      <div class="max-w-[390px]">
        <h4 class="text-white text-[22px] font-semibold font-['F37 Neuro'] uppercase leading-[1.5] tracking-widest mb-6 max-w-[300px]">
          {title}
        </h4>
        <div class="flex flex-col gap-[15px]">
          {texts.map((text) => (
            <p class="text-white text-[15px] font-light font-['F37 Neuro'] leading-normal tracking-wide">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstitutionalAllResponsabilities({
  responsabilities,
}: Responsability[]) {
  return (
    <div class="flex max-md:flex-col max-md:gap-[48px] md:gap-[80px] md:max-w-[50%]">
      {responsabilities.map(
        ({ image, resposability, texts, width, height }) => (
          <div class="flex flex-col max-md:gap-4 md:gap-6 w-full">
            <div class="min-h-[64px] flex items-center">
              <object type="image/svg+xml" data={image} width={width} height={height} />
            </div>
            <div class="flex flex-col gap-4">
              <p class="text-white text-[11px] font-medium font-['F37 Neuro'] uppercase leading-normal tracking-[2.64px]">
                {resposability}
              </p>
              {texts.map((text) => (
                <p class="text-white text-sm font-light font-['F37 Neuro'] leading-normal tracking-wid">
                  {text}
                </p>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
