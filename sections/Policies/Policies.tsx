import type { RichText } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

export interface PoliciesProps {
  /** @title Título */
  title: string;

  /** @title Subtítulo */
  subtitle: string;

  /** @title Conteúdo em HTML */
  text: RichText;
}

export default function Policies({ policies }: { policies: PoliciesProps[] }) {

  return (
    <section
      className={clx(
        "md:-mt-4 max-md:mt-8 max-md:mx-6 max-md:mb-[96px]",
        "max-md:flex max-md:flex-col max-md:gap-[64px]"
      )}
    >
      {policies.map((policy) => (
        <div key={policy.title} className="md:grid md:grid-cols-[32%_68%]">
          <div
            className="md:pl-[64px] md:pr-6 md:pt-[80px] md:bg-background-dark"
          >
            <div>
              <p className="text-caption uppercase mb-2 max-md:text-center">{policy.subtitle}</p>
              <p className="text-h4 max-md:text-[20px] uppercase max-md:mb-6 max-md:text-center">
                {policy.title}
              </p>
            </div>
          </div>
          <div className="md:pr-[64px] md:pl-[42px] md:pt-[80px] md:pb-[64px]">
            <div
              className="text-[#333] text-base font-light leading-normal tracking-wide"
              dangerouslySetInnerHTML={{ __html: policy.text }}
            />
          </div>
        </div>
      ))}
      <div className="md:grid md:grid-cols-[32%_68%]">
        <div
          className="md:min-h-[100px] md:bg-background-dark"
        />
        <div></div>
      </div>
    </section>
  );
}
