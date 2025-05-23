import { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";
import { useDevice } from "@deco/deco/hooks";

export interface InstitutionalResponsabilitiesProps {
  /** @title Title */
  title: string;

  /** @title Texts below title */
  texts: string[];

  /** @title Responsabilities */
  responsabilities: Responsability[];
}

interface Responsability {
  image: ImageWidget;
  width: string;
  height: string;
  resposability: string;
  text: string;
}

export default function InstitutionalResponsabilities({
  title,
  texts,
  responsabilities,
}: InstitutionalResponsabilitiesProps) {
  return (
    <div class="md:container flex max-md:flex-col max-md:gap-10">
      <LeftColResponsabilities title={title} texts={texts} />
      <InstitutionalAllResponsabilities responsabilities={responsabilities} />
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
        `max-md:container flex max-md:flex-col max-md:gap-[32px] md:gap-[49px] max-md:max-w-[100%] md:max-w-[50%] w-full md:pr-[64px]`
      )}
    >
      <div class="max-w-[390px]">
        <h4 class="text-black text-[22px] font-semibold font-['F37 Neuro'] uppercase leading-[1.5] tracking-widest mb-6 max-w-[300px]">
          {title}
        </h4>
        <div class="flex flex-col gap-[15px]">
          {texts.map((text) => (
            <p class="text-black text-[15px] font-light font-['F37 Neuro'] leading-normal tracking-wide">
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
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div
      class="md:max-w-[50%] w-full max-md:gap-10 md:gap-y-[64px] md:gap-x-[80px] max-md:flex max-md: md:grid md:grid-cols-2 max-md:overflow-auto max-md:ml-6 max-md:pr-6"
      style={{ maxWidth: isMobile ? "calc(100% - 24px)" : "auto" }}
    >
      {responsabilities.map(({ image, resposability, text, width, height }) => (
        <div
          class="flex flex-col max-md:gap-4 md:gap-6 w-full"
          style={{ minWidth: isMobile ? "calc(100% - 32px)" : "auto" }}
        >
          <div class="min-h-[64px] flex items-center">
            <img class="w-auto h-auto object-cover" src={image} width={width} height={height} />
          </div>
          <div class="flex flex-col md:gap-4">
            <p class="text-black text-[11px] font-medium font-['F37 Neuro'] uppercase leading-normal tracking-[2.64px]">
              {resposability}
            </p>
            <p class="text-black text-sm font-light font-['F37 Neuro'] leading-normal tracking-wid">
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
