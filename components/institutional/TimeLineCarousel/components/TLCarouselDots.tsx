import { useDevice, useScript } from "@deco/deco/hooks";
import Slider from "../../../../components/ui/Slider.tsx";
import { clx } from "../../../../sdk/clx.ts";
import { TLCarouselItemProps } from "../types.ts";
import { useId } from "../../../../sdk/useId.ts";
import Icon from "../../../../components/ui/Icon.tsx";

/**
 * Adiciona eventos de rolagem ao carrossel de indicadores (dots).
 * 
 * @param {string} id - Identificador único do carrossel.
 * @param {TLCarouselItemProps[]} images - Lista de itens do carrossel.
 * @param {boolean} isMobile - Indica se o layout é para dispositivos móveis.
 * 
 * Configura os elementos responsáveis pela navegação horizontal dos indicadores do carrossel,
 * ajustando tamanhos, espaçamentos e eventos de clique para as setas de navegação.
 * 
 * - Define o tamanho total da faixa de indicadores com base na quantidade de imagens.
 * - Configura o comportamento dos botões de rolagem esquerda e direita.
 * - Oculta ou exibe as setas de navegação conforme a posição da rolagem.
 */
const addingScrollEvents = (id: string, images: TLCarouselItemProps[], isMobile: boolean) => {

  const gap = isMobile ? 16 : 30;
  const widthDot = 67;
  const dotsPerPage = isMobile ? 3 : 10;
  
  const widthPerPage = isMobile ? (screen.width - 48) : 1046;  
  const widthTotal = images.length * (widthDot + gap) - gap;
  const scrollXPerClick = dotsPerPage * (widthDot + gap);
  const limitScroll = widthTotal - widthPerPage;

  const containerElement = document.getElementById(`tlCarouselDotContainer-${id}`);
  const containerDots = document.getElementById(`tlCarouselDots-${id}`);

  if(!containerElement || !containerDots) return;
  
  containerElement.style.setProperty("max-width", `${widthPerPage}px`);
  containerDots.style.setProperty("width", `${widthTotal}px`);
  containerDots.style.setProperty("gap", `${gap}px`);

  const leftArrowElement = document.getElementById(`scrollToLeft-${id}`);
  const rightArrowElement = document.getElementById(`scrollToRight-${id}`);

  if (leftArrowElement) {
    leftArrowElement.onclick = () => {
      containerDots.scrollBy({
        left: -scrollXPerClick,
        behavior: isMobile ? "auto" : "smooth",
      });
    };
  }
  
  if (rightArrowElement) {
    rightArrowElement.onclick = () => {
      containerDots.scrollBy({
        left: scrollXPerClick,
        behavior: isMobile ? "auto" : "smooth",
      });
    };
  }

  containerDots.onscroll = () => {
    if (leftArrowElement && rightArrowElement && containerDots) {
      const scrollLeft = containerDots.scrollLeft;

      const hasRemainingScrollLeft = scrollLeft === 0;
      if (hasRemainingScrollLeft) {
        leftArrowElement.style.display = "none";
      } else {
        leftArrowElement.style.display = "block";
      }

      const hasRemainingScrollRight = limitScroll - scrollLeft > 0;
      if (!hasRemainingScrollRight) {
        rightArrowElement.style.display = "none";
      } else {
        rightArrowElement.style.display = "block";
      }
    }
  };
};

export function TLCarouselDots({ images }: { images: TLCarouselItemProps[] }) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const id = useId();

  return (
    <div class="flex items-center justify-center gap-4 relative">
      <div
        id={`tlCarouselDotContainer-${id}`}
        class="tlcarouseldot carousel carousel-center w-full z-10 justify-center m-auto whitespace-nowrap relative"
        style={{ paddingInline: "6px" }}
      >
        <button
          id={`scrollToLeft-${id}`}
          class="absolute left-0 pr-[56px] w-[80px] z-10"
          style={{
            background:
              "linear-gradient(90deg, #FCF9F7 0%, rgba(252, 249, 247, 0.00) 100%)",
            display: "none",
          }}
        >
          <div
            class="text-[#672135] w-[32px]"
            style={{ background: "var(--fallback-b1,oklch(var(--b1)/1));" }}
          >
            <Icon id="chevron-left" size={32} />
          </div>
        </button>
        <button
          id={`scrollToRight-${id}`}
          class="absolute right-0 pl-[56px] w-[80px] z-10"
          style={{
            background:
              "linear-gradient(270deg, #FCF9F7 0%, rgba(252, 249, 247, 0.00) 100%)",
          }}
        >
          <div
            class="text-[#672135] w-[32px]"
            style={{ background: "var(--fallback-b1,oklch(var(--b1)/1));" }}
          >
            <Icon id="chevron-right" size={32} />
          </div>
        </button>
        <div
          id={`tlCarouselDots-${id}`}
          class="flex overflow-x-hidden"
        >
          {images.map((img, index) => (
            <div class="carousel-item items-center w-[67px]">
              <Slider.Dot
                index={index}
                class={clx(
                  "opacity-40 no-animation",
                  "disabled:opacity-100",
                  "border-b border-solid border-transparent",
                  "disabled:border-[#672135]",
                  "text-black w-full",
                  "disabled:text-[#672135] text-[14px] font-medium leading-[24px]",
                  "px-4 pb-[10px] pt-[2px]"
                )}
              >
                {img.ano}
              </Slider.Dot>
            </div>
          ))}
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(
              addingScrollEvents,
              id,
              images,
              isMobile,
            ),
          }}
        />
      </div>
    </div>
  );
}
