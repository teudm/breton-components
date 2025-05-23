import type { RichText, ImageWidget } from "apps/admin/widgets.ts";
import { useScript, useDevice } from "@deco/deco/hooks";

export interface Props {
  contentInfo: {
    title?: string;
    description?: RichText;
  };
  contentHightlight: {
    info: {
      ico?: ImageWidget;

      /** @title Initial Value */
      initialValue: number;

      /** @title End Value */
      endValue: number;

      /** @title Step to increment the counter */
      step: number;

      /** @title Time in seconds to pass */
      time: number;

      /** @title Text before counter */
      textBeforeCounter?: string;

      /** @title Text after counter */
      textAfterCounter?: string;
    };
    background: {
      backgroundDesktop?: ImageWidget;
      backgroundMobile?: ImageWidget;
    };
    logoBottom?: ImageWidget;
  };
}
/**
 * Cria uma rolagem suave quando o elemento alvo entra na tela.
 * @param {number} start - Valor inicial da animação, indicando o valor
 * a partir do qual a contagem começa.
 * @param {number} end - Valor final da animação, indicando o valor
 * até o qual a contagem deve ir.
 * @param {number} step - O incremento entre os valores exibidos na contagem.
 * @param {number} duration - A duração da animação de rolagem em milissegundos.
 */
function animateValue(
  start: number,
  end: number,
  step: number,
  duration: number
) {
  const institutionalInfoHighlight = document.getElementById("institutional-info-highlight");
  const counterElement = document.querySelector("#counter #counter-output") as HTMLParagraphElement;

  if (!institutionalInfoHighlight || !counterElement) return;

  let hasStarted = false;

  const allSteps: number[] = [];
  for (let i = start; i <= end; i += step) {
    allSteps.push(i);
  }
  counterElement.innerText = `${allSteps.map((i) => i).join("\n")}`;

  /**
   * Inicia o efeito de rolagem suave no elemento de contagem.
   */
  function createScrollingText() {
    if (hasStarted) return;
    hasStarted = true;

    let currentScrollPosition = 0;

    /**
     * Cria um efeito de rolagem suave dentro do elemento.
     * @param {number} start - Posição inicial da rolagem.
     * @param {number} end - Posição final da rolagem.
     * @param {number} duration - Duração da animação em milissegundos.
     */
    const smoothScroll = (start: number, end: number, duration: number) => {
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        currentScrollPosition = start + (end - start) * progress;
        counterElement.scrollTop = currentScrollPosition;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    smoothScroll(0, counterElement.scrollHeight, duration);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        createScrollingText();
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(institutionalInfoHighlight);
}


export default function InstitutionalInfoHighlight({
  contentInfo,
  contentHightlight,
}: Props) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const { title, description } = contentInfo;
  const {
    info: {
      ico,
      initialValue,
      endValue,
      step,
      time,
      textBeforeCounter,
      textAfterCounter,
    },
    background: { backgroundDesktop, backgroundMobile },
    logoBottom,
  } = contentHightlight;

  return (
    <div
      class="w-full flex max-md:flex-col md:-mb-[65px]"
      id="institutional-info-highlight"
    >
      <div
        class="flex flex-col md:w-[50%] gap-[16px] justify-center md:ml-[64px] max-md:m-auto"
        style={{ maxWidth: isMobile ? "calc(100% - 48px)" : "100%" }}
      >
        {title && (
          <h2 class="font-semibold uppercase max-md:text-xs md:text-base text-black max-w-xs md:tracking-[2px] max-md:tracking-[2.88px] leading-none">
            {title}
          </h2>
        )}
        {description && (
          <div
            class="flex flex-col gap-[16px] md:max-w-xs tracking-[1px] max-md:mb-8"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      <div class="flex relative md:w-[50%] justify-center w-full">
        <div
          class="absolute max-md:px-4 md:px-12 max-md:py-8 md:py-16 h-fit max-md:gap-[16px] md:gap-[39px] bg-white/90 top-0 md:-translate-x-[50%] max-md:left-auto md:left-0 bottom-0 my-auto flex flex-col items-center justify-center text-center max-md:w-full"
          style={{ maxWidth: isMobile ? "280px" : "394px" }}
        >
          {ico && <img src={ico} class="max-w-[150px]" alt="Icon" />}
          <div class="flex flex-col items-center justify-center gap-1 max-w-[100%]">
            {textBeforeCounter && (
              <p class="max-md:text-[12px] md:text-[16px] max-md:leading-[16px] md:leading-[24px] text-[#12340F] uppercase tracking-[1px] font-semibold">
                {textBeforeCounter}
              </p>
            )}

            <div class="max-w-[100%]" id="counter">
              <p
                id="counter-output"
                class="text-[64px] leading-[80px] text-[#12340F] uppercase tracking-[2.5px] font-medium bg-transparent text-center max-w-[100%] overflow-hidden max-h-[90px] pb-[10px]"
              ></p>
            </div>

            {textAfterCounter && (
              <p class="max-md:max-w-[205px] max-md:text-[12px] md:text-[16px] max-md:leading-[16px] md:leading-[24px] text-[#12340F] uppercase tracking-[1px] font-semibold">
                {textAfterCounter}
              </p>
            )}
          </div>
        </div>

        {isMobile
          ? backgroundMobile && (
            <img
              src={backgroundMobile}
              alt="Mobile Background"
              class="ml-auto"
            />
          )
          : backgroundDesktop && (
            <img
              src={backgroundDesktop}
              class="w-full"
              alt="Desktop Background"
            />
          )}

        {logoBottom && <img src={logoBottom} alt="Logo Bottom" />}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            animateValue,
            initialValue,
            endValue,
            step,
            time * 1000
          ),
        }}
      />
    </div>
  );
}
