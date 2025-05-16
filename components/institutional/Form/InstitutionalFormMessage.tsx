import { clx } from "../../../sdk/clx.ts";
import { InstitutionalFormMessageProps } from "./types.ts";

export function InstitutionalFormMessage({
  content,
  idString,
  class: _class
}: {
  content: InstitutionalFormMessageProps;
  idString: string;
  class?: string;
}) {
  return (
    <div id={idString} class={clx("flex-col gap-6 hidden", _class)}>
      <div class="flex flex-col gap-6">
        <p class="text-black text-[22px] font-semibold font-['F37 Neuro'] uppercase leading-loose tracking-widest">
          {content.title}
        </p>
        <p class="text-black text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide">
          {content.text}
        </p>
      </div>
    </div>
  );
}