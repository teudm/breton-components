import { VideoWidget } from "apps/admin/widgets.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";


export interface InstitutionalEnvironmentProps {
  gif: VideoWidget;
  widthDesktop: number;
  heightDesktop: number;
  widthMobile: number;
  heightMobile: number;
  texts: string[];
}

export default function InstitutionalEnvironment({
  gif,
  texts,
  widthDesktop,
  heightDesktop,
  widthMobile,
  heightMobile,
}: InstitutionalEnvironmentProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const width = isMobile ? widthMobile : widthDesktop;
  const height = isMobile ? heightMobile : heightDesktop;

  return (
    <div class="flex max-md:flex-col items-center gap-6 justify-center max-md:px-8">
      <InstitutionalEnvironmentGIF gif={gif} width={width} height={height} />
      <div class="flex flex-col max-md:gap-[56px] md:gap-6 max-w-[384px]">
        {texts.map((text) => (
          <p class="text-[#672135] text-base font-semibold font-['F37 Neuro'] uppercase leading-normal tracking-[3.84px]">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function InstitutionalEnvironmentGIF({
  gif,
  width,
  height,
}: {
  gif: VideoWidget;
  width: number;
  height: number;
}) {
  const id = useId();

  function playGif(videoId: string) {

    const divVideo = document.getElementById(videoId);
    if (!divVideo) return;

    const observer = new IntersectionObserver(
      (_entries) => {
        const video = divVideo.querySelector("video");
        if (!video || !video.paused) return;

        video.play();
        observer.unobserve(divVideo);
      }
    );
  
    observer.observe(divVideo);
  }

  return (
    <div
      style={{ width, height }}
      id={`environmentGIF-${id}`}
    >
      <video loop muted playsInline style={{ width, height }}>
        <source src={gif} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div class="absolute w-full h-full top-0 left-0 flex items-end md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"/>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(playGif, `environmentGIF-${id}`) }}
      />
    </div>
  );
}
