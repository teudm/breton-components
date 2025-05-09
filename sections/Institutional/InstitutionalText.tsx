import { type HTMLWidget } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";

export interface InstitutionalTextProps {
  title?: HTMLWidget;
  subTitle?: HTMLWidget;
  description?: HTMLWidget;
}

function InstitutionalText({
  title,
  description,
  subTitle,
}: InstitutionalTextProps) {  

  return (
    <Section.Tabbed>
      {
        <div class="max-w-[800px] m-auto max-md:max-w-[calc(100%-48px)]">
          {subTitle && subTitle.length > 1 && <div dangerouslySetInnerHTML={{ __html: subTitle }} />}
          {title && title.length > 1 && <div dangerouslySetInnerHTML={{ __html: title }} />}
          {description && description.length > 1 && (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>
      }
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default InstitutionalText;
