import { type RichText, type ImageWidget } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";
import MiddleBanner from "./MiddleBanner.tsx";

interface BannerProps {
  title: string;
  description?: RichText;

  images: {
    mobile: {
      image: ImageWidget;
      width?: number;
      height?: number;
    };
    desktop: {
      image: ImageWidget;
      width?: number;
      height?: number;
    };
  };

  cta?: {
    href: string;
    label: string;
  };
}

export interface Props {
  /** @title Banner da esquerda */
  leftBanner: BannerProps;
  /** @title Banner da direita */
  rightBanner: BannerProps;
}

function DoubleBanner({ leftBanner, rightBanner }: Props) {
  return (
    <Section.Tabbed>
      <div class="flex flex-col md:flex-row md:gap-4">
        <MiddleBanner
          images={leftBanner.images}
          title={leftBanner.title}
          cta={leftBanner.cta}
          description={leftBanner.description}
        />
        <MiddleBanner
          images={rightBanner.images}
          title={rightBanner.title}
          cta={rightBanner.cta}
          description={rightBanner.description}
        />
      </div>
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default DoubleBanner;
