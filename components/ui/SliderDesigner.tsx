import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useScript } from "@deco/deco/hooks";

function Dot({
  index,
  ...props
}: {
  index: number;
} & JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...props}
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class={clx("focus:outline-none group", props.class?.toString())}
    />
  );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & {
  index: number;
}) {
  return <li data-slider-item={index} class="carousel-item" {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
  itemsToShow?: number;
}

const onLoad = ({
  rootId,
  scroll,
  interval,
  infinite,
  itemsToShow = 1,
  syncWithId,
}: Props & { syncWithId?: string }) => {
  function init() {
    const root = document.getElementById(rootId);
    const syncRoot = syncWithId ? document.getElementById(syncWithId) : null;
    const slider = root?.querySelector<HTMLElement>("[data-slider]");
    const syncSlider = syncRoot?.querySelector<HTMLElement>("[data-slider]");
    const items = root?.querySelectorAll<HTMLElement>("[data-slider-item]");
    const syncItems =
      syncRoot?.querySelectorAll<HTMLElement>("[data-slider-item]");
    const prev = root?.querySelector<HTMLElement>('[data-slide="prev"]');
    const next = root?.querySelector<HTMLElement>('[data-slide="next"]');
    const dots = root?.querySelectorAll<HTMLElement>("[data-dot]");

    if (!root || !slider || !items || items.length === 0) {
      console.warn(
        "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
        { root, slider, items, rootId }
      );
      return;
    }

    const getActiveIndex = () => {
      for (let index = 0; index < items.length; index++) {
        if (items.item(index).classList.contains("active")) {
          return index;
        }
      }
      return 0;
    };

    const onClickNext = () => {
      const currentIndex = getActiveIndex();
      const isLast = currentIndex === items.length - 1;
      const nextIndex = isLast ? 0 : currentIndex + 1;

      goToItem(nextIndex, true);
    };

    const onClickPrev = () => {
      const currentIndex = getActiveIndex();
      const isFirst = currentIndex === 0;
      const prevIndex = isFirst ? items.length - 1 : currentIndex - 1;

      goToItem(prevIndex, false);
    };

    const goToItem = (currentIndex: number, directionNext: boolean) => {
      // Desabilita os botões para finalização da transição
      prev?.setAttribute("disabled", "true");
      next?.setAttribute("disabled", "true");

      const isFirst = currentIndex === 0;
      const isLast = currentIndex === items.length - 1;
      const oldIndex = getActiveIndex();
      const nextIndex = directionNext
        ? isLast
          ? 0
          : currentIndex + 1
        : isFirst
        ? items.length - 1
        : currentIndex - 1;

      const oldItem = items.item(oldIndex);
      const currentItem = items.item(currentIndex);
      const nextItem = items.item(nextIndex);

      if (oldItem && currentItem && nextItem) {
        // Remove a classe 'active' do item atual
        oldItem.classList.remove("active");

        // Adiciona a classe 'active' ao próximo item
        currentItem.classList.add("active");

        const oldImg = oldItem.querySelector("img");
        const currentImg = currentItem.querySelector("img");
        const nextImg = nextItem.querySelector("img");

        // Atualiza estilos com base no CSS
        if (oldImg && currentImg && nextImg) {
          currentImg.style.clipPath = "inset(0px 0px 0px 0px)";
          currentImg.style.transition =
            "clip-path 1s cubic-bezier(0.6, 0.14, 0.15, 0.94)";

          // Retorna a imagem após a finalização da transição
          currentImg.addEventListener(
            "transitionend",
            () => {
              if (oldImg && nextImg) {
                if (directionNext) {
                  oldImg.style.clipPath = "inset(0px 0px 0px 100%)";
                  nextImg.style.clipPath = "inset(0px 100% 0px 0px)";
                } else {
                  oldImg.style.clipPath = "inset(0px 100% 0px 0px)";
                  nextImg.style.clipPath = "inset(0px 0px 0px 100%)";
                }

                oldImg.style.transition = "none";
                nextImg.style.transition = "none";
              }

              prev?.removeAttribute("disabled");
              next?.removeAttribute("disabled");
            },
            { once: true }
          );
        }
      }

      // Sincroniza o outro carrossel, se aplicável
      if (syncItems) {
        const syncIsFirst = currentIndex === 0;
        const syncIsLast = currentIndex === syncItems.length - 1;
        const syncNextIndex = directionNext
          ? syncIsLast
            ? 0
            : currentIndex + 1
          : syncIsFirst
          ? syncItems.length - 1
          : currentIndex - 1;

        const syncOldItem = syncItems.item(oldIndex);
        const syncCurrentItem = syncItems.item(currentIndex);
        const syncNextItem = syncItems.item(syncNextIndex);

        if (syncOldItem && syncCurrentItem && syncNextItem) {
          // Remove a classe 'active' do item atual
          syncOldItem.classList.remove("active");

          // Adiciona a classe 'active' ao próximo item
          syncCurrentItem.classList.add("active");

          const syncOldImg = syncOldItem.querySelector("img");
          const syncCurrentImg = syncCurrentItem.querySelector("img");
          const syncNextImg = syncNextItem.querySelector("img");

          if (syncOldImg && syncCurrentImg && syncNextImg) {
            syncCurrentImg.style.clipPath = "inset(0px 0px 0px 0px)";
            syncCurrentImg.style.transition =
              "clip-path 1s cubic-bezier(0.6, 0.14, 0.15, 0.94)";

            // Retorna a imagem após a finalização da transição
            syncCurrentImg.addEventListener(
              "transitionend",
              () => {
                if (syncOldImg && syncNextImg) {
                  syncOldImg.style.clipPath = directionNext
                    ? "inset(0px 0px 0px 100%)"
                    : "inset(0px 100% 0px 0px)";
                  syncOldImg.style.transition = "none";

                  syncNextImg.style.clipPath = directionNext
                    ? "inset(0px 100% 0px 0px)"
                    : "inset(0px 0px 0px 100%)";
                  syncNextImg.style.transition = "none";
                }

                prev?.removeAttribute("disabled");
                next?.removeAttribute("disabled");
              },
              { once: true }
            );
          }
        }
      }
    };

    if (interval) {
      setInterval(onClickNext, interval);
    }

    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).addEventListener("click", () => goToItem(it));
    }

    prev?.addEventListener("click", onClickPrev);
    next?.addEventListener("click", onClickNext);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
};

function JS({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
  itemsToShow = 1,
  syncWithId,
}: Props & { syncWithId?: string }) {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: useScript(onLoad, {
          rootId,
          scroll,
          interval,
          infinite,
          itemsToShow,
          syncWithId,
        }),
      }}
    />
  );
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;
Slider.JS = JS;
export default Slider;
