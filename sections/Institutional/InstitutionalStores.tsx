import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";

/** @titleBy alt  */
interface Image {
  /** @title Texto alternativo */
  alt: string;
  /** @title Imagem */
  image: ImageWidget;
  /** @title Largura da imagem em pixels */
  width?: number;
  /** @title Altura da imagem em pixels */
  height?: number;
}

/** @titleBy name */
interface Loja {
  /** @title Nome da loja */
  name: string;
  /** @title Cidade */
  city: string;
  /** @title Endereço */
  address: string;
  /** @title Horário de funcionamento */
  opening: HTMLWidget;
  /** @title Telefone de contato */
  phone: string;
  /** @title Instagram da loja */
  instagram?: string;
  /** @title Imagens da loja */
  images: Image[];
}

export interface Props {
  lojas: Loja[];
}

function ImagesCarousel({ images }: { images: Image[] }) {
  const id = useId();
  return (
    <>
      <div id={id} class="relative w-full flex">
        <Slider class="carousel carousel-center w-full">
          {images.map(({ alt, image, width, height }, index) => (
            <Slider.Item class="carousel-item w-full" index={index}>
              <Image
                src={image}
                alt={alt}
                preload={false}
                loading="lazy"
                class="w-full object-cover aspect-[271/194]"
                width={width || 1920}
                height={height || 1280}
              />
            </Slider.Item>
          ))}
        </Slider>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
          <Slider.PrevButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled
          >
            <Icon id="chevron-left" size={32} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled={images.length < 2}
          >
            <Icon id="chevron-right" size={32} />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}

function LojaSection({ loja }: { loja: Loja }) {
  const device = useDevice();
  const isMobile = device === "mobile";
  const [fachada] = loja.images;
  const instagram = loja.instagram && loja.instagram.replace("@", "");

  const dataLoja = `${loja.name} ${loja.city} ${loja.address}`;

  return (
    <div
      class="store-item flex max-md:flex-col gap-6 md:gap-16"
      data-loja={dataLoja.toLowerCase()}
    >
      {isMobile ? (
        <Image
          src={fachada.image}
          alt={fachada.alt}
          preload={false}
          loading="lazy"
          width={fachada.width || 1920}
          height={fachada.height || 1280}
        />
      ) : (
        <ImagesCarousel images={loja.images} />
      )}
      <div
        class="flex flex-col justify-end gap-10 max-md:container md:w-[28.81%]"
        data-id="store-info"
      >
        <div class="flex flex-col gap-2">
          <h2 class="text-h5Mobile md:text-h5 uppercase">{loja.name}</h2>
          <p class="text-caption text-ui-800">{loja.city}</p>
        </div>
        <div class="flex flex-col gap-6">
          <div>
            <p class="text-caption text-ui-800">Endereço</p>
            <p class="text-mini text-ui-500">{loja.address}</p>
            <a
              href={`https://www.google.com.br/maps/place/${loja.address}`}
              target="_blank"
              class="underline text-ui-600 text-mini"
            >
              Ver no mapa
            </a>
          </div>
          <div>
            <p class="text-caption text-ui-800">Funcionamento</p>
            <div
              class="text-mini text-ui-500"
              dangerouslySetInnerHTML={{ __html: loja.opening }}
            />
          </div>
          <div>
            <p class="text-caption text-ui-800">Telefone</p>
            <a href={`tel:${loja.phone}`} class="text-mini text-ui-500">{loja.phone}</a>
          </div>
          {loja.instagram && (
            <div>
              <p class="text-caption text-ui-800">Instagram</p>
              <a
                href={`https://www.instagram.com/${instagram}`}
                target="_blank"
                class="underline text-ui-600 text-mini"
              >
                @{instagram}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const handleInput = () => {
  const filterInput = document.querySelector(
    "#search-store"
  ) as HTMLInputElement;
  filterInput?.addEventListener("input", () => {
    const filterValue = filterInput?.value.trim();
    if (filterValue.length === 0) {
      const stores = Array.from(document.querySelectorAll(".store-item"));
      stores.forEach(store => store.classList.remove("hidden"));
      const noStoresFound = document.querySelector(
        "#not-found"
      ) as HTMLDivElement;
      noStoresFound.classList.add("hidden");
    }
  });
};

const handleSearch = () => {
  const filterInput = document.querySelector(
    "#search-store"
  ) as HTMLInputElement;
  const noStoresFound = document.querySelector("#not-found") as HTMLDivElement;
  const filterValue = filterInput?.value.trim().toLowerCase();
  const stores = Array.from(document.querySelectorAll(".store-item"));
  let count = 0;
  stores.forEach(store => {
    if (store.getAttribute("data-loja")?.includes(filterValue)) {
      store.classList.remove("hidden");
      count++;
    } else {
      store.classList.add("hidden");
    }
  });
  if (count === 0) {
    noStoresFound.classList.remove("hidden");
  } else {
    noStoresFound.classList.add("hidden");
  }
};

function NossasLojas({ lojas }: Props) {
  return (
    <div class="md:container">
      <div class="max-md:container flex flex-col gap-8 py-10 mb-[51px] md:mb-10">
        <div class="flex flex-col gap-4 md:gap-10 items-center">
          <p class="text-h5Mobile md:text-h5 uppercase">
            Encontre a Breton mais próxima de você
          </p>
          <div class="flex max-md:flex-col gap-6 max-md:items-end w-full md:w-[604px]">
            <input
              type="text"
              class={clx(
                "w-full py-[11px] px-[15px] placeholder:opacity-40 text-black text-[15px] font-light",
                "leading-normal tracking-wide border-b border-black bg-transparent",
                "outline-none"
              )}
              placeholder="ex.: Shopping Iguatemi, São Paulo ou Jardim Paulista..."
              id="search-store"
              hx-on:input={useScript(handleInput)}
              autocomplete="off"
            />
            <button
              hx-on:click={useScript(handleSearch)}
              class="btn bg-black/80 hover:bg-black/75 outline-none text-button uppercase text-white max-md:w-full"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="stores-container flex flex-col gap-10 md:gap-12">
        {lojas.map(loja => (
          <LojaSection key={loja.name} loja={loja} />
        ))}
        <div id="not-found" class="hidden max-md:container">
          <span class="text-button">Nenhuma loja encontrada!</span>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => (
  <div class="md:container">
    <div class="max-md:container flex flex-col gap-8 py-10 mb-[51px] md:mb-10">
      <div class="flex flex-col gap-4 md:gap-10 items-center">
        <p class="text-h5Mobile md:text-h5 uppercase">
          Encontre a Breton mais próxima de você
        </p>
        <div class="flex max-md:flex-col gap-6 max-md:items-end w-full md:w-[604px]">
          <input
            type="text"
            class={clx(
              "w-full py-[11px] px-[15px] placeholder:opacity-40 text-black text-[15px] font-light",
              "leading-normal tracking-wide border-b border-black bg-transparent",
              "outline-none"
            )}
            placeholder="ex.: Shopping Iguatemi, São Paulo ou Jardim Paulista..."
            id="search-store"
            disabled
            autocomplete="off"
          />
          <button
            disabled
            class="btn bg-black/80 hover:bg-black/75 outline-none text-button uppercase text-white max-md:w-full"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <Section.Placeholder height="635px" />
  </div>
);

export default NossasLojas;
