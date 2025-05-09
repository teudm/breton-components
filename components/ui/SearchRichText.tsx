import { RichText } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
import { clx } from "../../sdk/clx.ts";


/** @titleBy matcher */
interface SearchRichText {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher?: string;
  richTitle?: string;
  richContent?: RichText;
}

function RichTextShowMore({ content }: { content: RichText }) {
  return (
    <>
      <input
        type="checkbox"
        name="showMore"
        id="showMore"
        class="hidden peer"
      />
      <div
        class="flex flex-col mb-10 [&>p:nth-child(n+2)]:hidden peer-checked:[&>p:nth-child(n+2)]:block text-left"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <label
        for="showMore"
        class={clx(
          "btn btn-glass text-button uppercase",
          "before:content-['Ler_Menos'] before:hidden peer-checked:before:block",
          "after:content-['Ler_Mais'] after:block peer-checked:after:hidden"
        )}
      ></label>
    </>
  );
}

function SearchRichText(props: SectionProps<ReturnType<typeof loader>>) {
  const { richText } = props;
  if (!richText) {
    return null;
  }
  const { richTitle, richContent } = richText;
  return (
    <div class="container flex items-center w-full flex-col gap-10 mb-20 md:mb-[96px] mt-16 md:mt-[152px]">
      {richTitle && <h2 class="text-h2Mobile md:text-h2">{richTitle}</h2>}
      {
        richContent && (
          <div class="text-content text-center">
            {richContent.split("</p><p>").length < 2 ? (
              <span
                class="flex flex-col gap-2 text-left"
                dangerouslySetInnerHTML={{ __html: richContent }}
              ></span>
            ) : (
              <RichTextShowMore content={richContent} />
            )}
          </div>
        )
        // <>
        //   <div class="text-content flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: richContent }}></div>
        // </>
      }
    </div>
  );
}

export interface Props {
  richTexts?: SearchRichText[];
}
export const loader = (props: Props, req: Request) => {
  const { richTexts } = { ...props };
  const richText = richTexts?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { richText };
};

export default SearchRichText;
