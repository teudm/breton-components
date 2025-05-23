import { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

/** @titleBy name */
export interface Designer {
  name?: string;
  image?: ImageWidget;
}

export interface Props {
  designers: Designer[];
}

const WIDTH = 287;
const HEIGHT = 287;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

const DesignerCard = ({
  designer,
  preload,
}: {
  designer: Designer;
  preload: boolean;
}) => {
  const { name, image } = designer;
  const relativeUrl = `/designer/${name?.toLowerCase().replaceAll(" ", "-")}?page=1`;
  return (
    <>
      <div class={clx("card card-compact group text-sm gap-4")}>
        <figure
          class={clx(
            "relative bg-base-200",
            "rounded border border-transparent"
          )}
          style={{ aspectRatio: ASPECT_RATIO }}
        >
          <div
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full"
            )}
          >
            <Image
              src={image || ""}
              alt={name}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio: ASPECT_RATIO }}
              class={clx(
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full mix-blend-multiply"
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </figure>

        <span class={clx("text-h5Mobile uppercase", "md:text-h5")}>
          {name}
        </span>
        <a
          href={relativeUrl}
          class="flex bg-white/20 rounded-[1px] backdrop-blur-[10px] w-fit rounded-sm outline outline-1 outline-offset-[-1px] outline-black py-[10px] px-6 gap-4 items-center justify-center hover:bg-white/30 transition duration-300"
        >
          <span class="text-button">VER PRODUTOS</span>
          <Icon id="arrow-right" />
        </a>
        <div class="flex-grow" />
      </div>
    </>
  );
};

export default function DesignersList({ designers }: Props) {
  return (
    <div class="container">
      <div
        class={clx(
          "grid items-center",
          "grid-cols-2 gap-2",
          "sm:grid-cols-3 sm:gap-10",
          "w-full"
        )}
      >
        {designers.map((designer, index) => (
          <DesignerCard designer={designer} preload={index <= 5} />
        ))}
      </div>
    </div>
  );
}
