import { clx } from "../../sdk/clx.ts";

/** @titleBy label */
export interface Languages {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface FooterLanguageProps {
  title: string;
  languages: Languages[];
}

function FooterLanguageSelector({ title, languages }: FooterLanguageProps) {
  return (
    <div class="flex flex-col gap-4">
      <span class="text-caption opacity-60 uppercase">{title}</span>
      <div class="flex gap-5">
        {languages.map(({ label, href, isActive }) => (
          <a
            class={clx(
              `text-contentMini uppercase ${
                isActive ? "opacity-40 pointer-events-none" : "underline"
              }`,
            )}
            href={href}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default FooterLanguageSelector;
