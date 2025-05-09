import { ImageWidget, Color } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

interface RightColProps {
  background: Color;
  productName: string;
  author: string;
  image: ImageWidget;

  /** @hide true */
  inverted?: boolean;
}

interface LeftColProps {
  title: string;
  texts: string[];
  image: ImageWidget;

  /** @hide true */
  inverted?: boolean;
}

export interface InstitutionalSustainableMaterialsProps {
  /** @title Left Column */
  leftCol: LeftColProps;

  /** @title Right Column */
  rightCol: RightColProps;

  /** @title Invert Columns? */
  inverted?: boolean;
}

export default function InstitutionalSustainableMaterials({
  leftCol,
  rightCol,
  inverted = false,
}: InstitutionalSustainableMaterialsProps) {

  return (
    <div
      class={`flex ${
        inverted
          ? "max-md:flex-col md:flex-row-reverse"
          : "max-md:flex-col flex-row"
      } max-md:gap-8`}
    >
      <LeftColSustainableMaterials {...leftCol} inverted={inverted} />
      <RightColSustainableMaterials {...rightCol} inverted={inverted} />
    </div>
  );
}

function LeftColSustainableMaterials({ title, texts, image, inverted }: LeftColProps) {

  return (
    <div
      class={`flex max-md:flex-col max-md:gap-[32px] md:gap-[49px] max-md:max-w-[100%] md:max-w-[50%] w-full md:items-center ${
        inverted ? "max-md:px-[24px] md:pr-[138px]" : "max-md:px-[24px] md:pl-[138px]"
      }`}
    >
      <object type="image/svg+xml" data={image} class="w-[86px] h-[95px]" />
      <div class="max-w-[392px]">
        <h4 class="text-black text-[22px] font-semibold font-['F37 Neuro'] uppercase leading-loose tracking-widest max-md:mb-2 md:mb-6">
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

function RightColSustainableMaterials({
  background,
  productName,
  author,
  image,
  inverted,
}: RightColProps) {
  return (
    <div class={`${inverted ? "pr-[57px]" : "pl-[57px]"} relative w-full`}>
      <img
        class={`absolute ${inverted ? "left-0" : "right-0"} top-0 mt-[102px]`}
        src={image}
        alt=""
      />
      <div
        class={clx(
          "max-md:h-[391px] md:h-[520px] max-md:w-[262px] md:w-[310px]",
          "pb-8  flex flex-col justify-end",
          `${inverted ? "mr-auto items-start pl-6" : "ml-auto items-end pr-6"}`
        )}
        style={{ backgroundColor: background }}
      >
        <p class="text-right text-white text-[10px] font-normal font-['F37 Neuro'] uppercase leading-[1.5] tracking-widest">
          {productName}
        </p>
        <p class="text-right text-white text-[10px] font-normal font-['F37 Neuro'] uppercase leading-[1.5] tracking-widest">
          POR {author}
        </p>
      </div>
    </div>
  );
}
