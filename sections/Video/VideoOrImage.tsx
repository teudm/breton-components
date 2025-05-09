import type { FullBannerProps } from "../Banner/FullBanner.tsx";
import FullBanner from "../Banner/FullBanner.tsx";
import { VideoProps as VideoProperties } from "./Video.tsx";
import Video from "./Video.tsx";

type VideoOrImageProps = {
  /** @title Media Type*/
  /** @description Escolha entre vídeo ou imagem */
  mediaType: VideoProperties | FullBannerProps;
  /** @title É o bloco inicial? */
  initialBlock?: boolean;
};

export default function VideoOrImage({
  mediaType,
  initialBlock,
}: VideoOrImageProps) {
  if ('background' in mediaType) {
    return <FullBanner {...mediaType} initialBlock={initialBlock} />;
  }

  if ('videoDesktop' in mediaType) {
    return <Video {...mediaType} initialBlock={initialBlock} />;
  }
}
