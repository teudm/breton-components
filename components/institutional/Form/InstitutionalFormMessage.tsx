import { InstitutionalFormMessageProps } from "./types.ts";

export function InstitutionalFormMessage({
  content,
  idString,
}: {
  content: InstitutionalFormMessageProps;
  idString: string;
}) {
  return (
    <div id={idString} class="flex-col gap-6 hidden">
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