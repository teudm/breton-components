import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | `icon-${string}`
  | "search"
  | "shopping_bag"
  | "menu"
  | "account_circle"
  | "close"
  | "chevron-right"
  | "chevron-left"
  | "favorite"
  | "home_pin"
  | "call"
  | "local_shipping"
  | "pan_zoom"
  | "share"
  | "sell"
  | "check-circle"
  | "error"
  | "trash"
  | "icon-close"
  | "seta-direita"
  | "clear-search"
  | "corebiz-logo"
  | "icon-pause"
  | "icon-mute"
  | "icon-unmute"
  | "icon-play"
  | "icon-document"
  | "icon-largura"
  | "icon-profundidade"
  | "icon-peso"
  | "icon-altura"
  | "icon-briefcase"
  | "icon-plus"
  | "icon-plus-mini"
  | "icon-less"
  | "icon-maximize"
  | "icon-user"
  | "icon-heart"
  | "icon-increase"
  | "icon-decrease"
  | "icon-ruler"
  | "arrow-right"
  | "institutional-slide-close"
  | "icon-trash"
  | "icon-filter";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({ id, size = 24, width, height, ...otherProps }: Props) {
  return (
    <svg {...otherProps} width={width ?? size} height={height ?? size}>
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;