import { ProductDetailsPage } from "apps/commerce/types.ts";
import { VideoWidget as Video } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

export interface ProductVideo {
  /** @title Label de identificação */
  /** @description Campo apenas para identificação no admin, sem alterações no front */
  label: string;
  /** @title Vídeo */
  /** @description Formato indicado: mp4 */
  video: Video;
  /** @title Descrição */
  description: string;
  /** @title Id do produto */
  /** @description O vídeo e a descrição serão renderizados apenas quando o produto acessado possuir o mesmo id que o digitado aqui */
  productId: string;
}

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  videos?: ProductVideo[];
}

const handleVideo = () => {
  const video: HTMLVideoElement | null = document.querySelector('#product-video');
  const playButton = document.querySelector('#play');
  const muteButton = document.querySelector('#mute');
  if (!video || !playButton || !muteButton) return;
  playButton.addEventListener('change', ({ target }) => {
    (target as HTMLInputElement)?.checked ? video.play() : video.pause();
  });
  muteButton.addEventListener('change', ({ target }) => {
    video.muted = (target as HTMLInputElement)?.checked;
  });
}

export default function ProductVideo({ page, videos }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page || !videos) return null;

  const { productID } = page.product;

  const video = videos.find(item => item.productId === productID);

  if (!video) return null;

  return (
    <div class="md:px-4 mt-12 md:mt-0 mb-10 md:mb-20 flex flex-col-reverse md:flex-row items-center md:justify-between gap-5 md:gap-0">
      <div class="w-full md:max-w-[55%] relative group">
        <video id="product-video" autoplay loop muted playsinline>
          <source src={video.video} type="video/mp4" />
        </video>
        <div class="absolute w-full h-full top-0 left-0 flex items-end md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <div class="flex w-full md:h-[206px] text-white opacity-60 bg-video-controls justify-between items-end pb-6 px-6 pt-12">
            <label for="play" class="">
              <input
                type="checkbox"
                id="play"
                name="play"
                class="peer hidden h-0 w-0"
                checked
              />
              <span class="absolute bottom-6 left-6 peer-checked:opacity-100 opacity-0 transition-opacity duration-300">
                <Icon id="icon-pause" size={40} />
              </span>
              <span class="absolute bottom-6 left-6 peer-checked:opacity-0 opacity-100 transition-opacity duration-300">
                <Icon id="icon-play" size={40} />
              </span>
            </label>
            <label for="mute" class="">
              <input
                type="checkbox"
                id="mute"
                name="mute"
                class="peer hidden h-0 w-0"
                checked
              />
              <span class="absolute bottom-6 right-6 peer-checked:opacity-100 opacity-0 transition-opacity duration-300">
                <Icon id="icon-mute" size={40} />
              </span>
              <span class="absolute bottom-6 right-6 peer-checked:opacity-0 opacity-100 transition-opacity duration-300">
                <Icon id="icon-unmute" size={40} />
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="md:w-[43.53%]">
        <div class="text-button px-1 pt-4 pb-6 md:ml-auto md:p-0 text-center md:text-left text-ui-900 md:mr-12 md:max-w-[360px] uppercase px-5 md:px-0">
          <span class="relative product-video-description">
            {video.description}
          </span>
        </div>
      </div>
      <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(handleVideo) }}
        />
    </div>
  );
}
