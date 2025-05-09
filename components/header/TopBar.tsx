export interface Link {
  label: string;
  href: string;
}
export interface Props {
  languages?: {
    label: string;
    link: string;
  }[];
  links?: Link[];
}

function TopBar({ links = [], languages = [] }: Props) {
  return (
    <div id="top-bar" className="bg-primary max-md:hidden pointer-events-auto">
      <div className="flex justify-between container py-1">
        <div className="flex gap-4">
          {languages.map((language) => (
            <a
              key={language.label}
              href={language.link}
              class="text-white text-[10px] font-normal leading-none tracking-wide"
            >
              {language.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-10">
          {links.map(({ label, href }) => (
            <a
              href={href}
              className="text-legend opacity-[72%] text-white uppercase"
              key={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
