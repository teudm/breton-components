import type { ImageWidget, Color } from "apps/admin/widgets.ts";

export interface TimeLineCarouselProps {
  images?: TLCarouselItemProps[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

/**
 * @titleBy alt
 */
export interface TLCarouselItemProps {

  /** @description Ano relacionado ao slider */
  ano: number;

  /** @description desktop otimized image */
  desktop: TextBoxProps & {
    image: ImageWidget;
  };

  /** @description mobile otimized image */
  mobile: TextBoxProps & {
    image: ImageWidget;
  };

  /** @description when user clicks on the image, go to this link */
  href?: string;
}

export interface TextBoxProps {
  textBox?: {
    /** @description Title */
    title?: string;

    /** @description Description */
    description?: string;

    /** @description Background of the box */
    background?: Color;

    /** @description Text Color */
    textColor?: Color;

    /** @description Text Box Position */
    align?: "top" | "bottom" | "center";
  };
}