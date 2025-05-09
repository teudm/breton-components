import { VideoWidget as Video } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useScript, useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";

export interface VideoProps {
  /** @title Vídeo Desktop*/
  /** @description Formato indicado: mp4 */
  videoDesktop: CustomVideo;

  /** @title Vídeo Mobile*/
  /** @description Formato indicado: mp4 */
  videoMobile: CustomVideo;

  autoplay?: boolean;

  /** @hide True */
  initialBlock?: boolean;
}

interface CustomVideo {
  video: Video;
  width: number;
  height: number;
}

const handleVideo = (id: string) => {
  const video: HTMLVideoElement | null = document.getElementById(
    `custom-video-${id}`
  );
  const playButton = document.getElementById(`play-${id}`);
  const muteButton = document.getElementById(`mute-${id}`);
  const resetButton = document.getElementById(`reset-${id}`);

  if (!video || !playButton || !muteButton || !resetButton) return;
  playButton.addEventListener("change", ({ target }) => {
    (target as HTMLInputElement)?.checked ? video.play() : video.pause();
  });
  muteButton.addEventListener("change", ({ target }) => {
    video.muted = (target as HTMLInputElement)?.checked;
  });
  resetButton.addEventListener("click", () => {
    video.currentTime = 0;
  });
};

function calculateAspectRatio(video: CustomVideo) {
  const { width, height } = video;
  return (width / height).toFixed(2);
}

export default function Video({
  videoDesktop,
  videoMobile,
  autoplay,
  initialBlock,
}: VideoProps) {
  if (!videoDesktop || !videoMobile) return null;
  const id = useId();

  const device = useDevice();

  const isMobile = device === "mobile";

  const aspectRatio = isMobile
    ? calculateAspectRatio(videoMobile)
    : calculateAspectRatio(videoDesktop);

  return (
    <>
      <section
        class={`w-full relative group ${initialBlock ? "max-md:-mt-[80px] md:-mt-[100px]" : ""}`}
        style={{ aspectRatio: `${aspectRatio}` }}
        id={initialBlock ? "main-banner" : null}
      >
        <video
          id={`custom-video-${id}`}
          autoplay={autoplay}
          loop
          muted
          playsinline
          class="w-full h-full object-cover"
        >
          <source
            src={isMobile ? videoMobile.video : videoDesktop.video}
            type="video/mp4"
          />
        </video>
        <div class="absolute w-full h-full top-0 left-0 flex items-end">
          <div class="flex w-full md:h-[206px] text-white opacity-60 bg-video-controls justify-between items-end pb-6 px-6 pt-12">
            <label for={`play-${id}`} class="">
              <input
                type="checkbox"
                id={`play-${id}`}
                name={`play-${id}`}
                class="peer hidden h-0 w-0"
                checked={autoplay}
              />
              <span class="absolute bottom-6 left-6 peer-checked:opacity-100 opacity-0 transition-opacity duration-300">
                <Icon id="icon-pause" size={40} />
              </span>
              <span class="absolute bottom-6 left-6 peer-checked:opacity-0 opacity-100 transition-opacity duration-300">
                <Icon id="icon-play" size={40} />
              </span>
            </label>
            <label for={`reset-${id}`} class="">
              <input
                type="checkbox"
                id={`reset-${id}`}
                name={`reset-${id}`}
                class="peer hidden h-0 w-0"
              />
              <span class="absolute bottom-6 left-20 opacity-100 transition-opacity duration-300 scale-[0.7]">
                <Icon id="icon-reset" size={40} />
              </span>
            </label>
            <label for={`mute-${id}`} class="">
              <input
                type="checkbox"
                id={`mute-${id}`}
                name={`mute-${id}`}
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
      </section>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleVideo, id) }}
      />
    </>
  );
}
