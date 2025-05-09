import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";

const WIDTH = 360;
const HEIGHT = 280;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/** @titleBy titleImage */
interface ImageLink {
    titleImage?: string;
    textImage?: string;
    image?: ImageWidget;
    textLink?: string;
}
export interface Banner {
    logo?: ImageWidget;
    imageLogo?: ImageWidget;
    link?: string;
    images?: ImageLink[];
}

function Ecobreton(props: Banner) {
    const id = useId();
    const device = useDevice();

    const quantityItemsSlider = device === "mobile" ? 1 : 3;

    const { logo, imageLogo, link, images } = props;

    return (
        <section class="ecobreton-slider max-md:container flex items-center mt-[150px] flex-col">
            <div class="w-full md:container flex justify-between items-center mb-[30px]">
                <h2 class="flex sm:flex-row flex-col justify-center items-center">
                    <img src={logo} class="sm:order-1 order-2" />
                    <img src={imageLogo} class="mt-[0px] sm:mt-[-100px] sm:ml-[20px] sm:mb-[0px] mb-[10px] sm:order-2 order-1 sm:w-[130px] w-[100px]" />
                </h2>

                {link && <a href={link} class="sm:flex hidden justify-center items-center border-[1px] rounded-sm border-black uppercase text-[11px] w-[197px] h-[46px] font-medium">ver ações breton</a>}
            </div>

            <div class="w-full" id={id}>
                <div class="relative">
                    <Slider class="md:px-16 carousel carousel-center gap-10 w-full">
                        {images?.map((img, index) => (
                            <Slider.Item
                                index={index}
                                class="carousel-item gap-[16px] flex flex-col w-full md:w-[calc(100%/3-40px)]"
                            >
                                <a href={img.textLink} class="overflow-hidden">
                                    <Image
                                        class="w-full object-cover md:hover:scale-110 duration-3000 ease-in-out"
                                        sizes="(max-width: 640px) 100vw, 40vw"
                                        style={{ aspectRatio: ASPECT_RATIO }}
                                        src={img.image!}
                                        alt={img.titleImage}
                                        width={WIDTH}
                                        height={HEIGHT}
                                        // Preload LCP image for better web vitals
                                        preload={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </a>

                                {img.titleImage && <h3 class="mt-[16px] uppercase text-[16px] font-semibold tracking-[1px]">{img.titleImage}</h3>}
                                {img.textImage && <p class="text-sm text-[14px] font-light tracking-[1px] leading-[24px]">{img.textImage}</p>}

                            </Slider.Item>
                        ))}
                    </Slider>

                    <Slider.PrevButton
                        class="sm:flex hidden no-animation absolute left-4 top-1/2 -translate-y-1/2 btn-circle btn-outline disabled:invisible"
                        disabled
                    >
                        <Icon id="chevron-right" class="rotate-180" />
                    </Slider.PrevButton>

                    <Slider.NextButton
                        class="sm:flex hidden no-animation absolute right-4 top-1/2 -translate-y-1/2 btn-circle btn-outline disabled:invisible"
                        disabled={images.length < 2}
                    >
                        <Icon id="chevron-right" />
                    </Slider.NextButton>
                </div>

                {/* Dots */}
                <div class="sm:mt-[30px] mt-[32px] carousel-dots col-start-1 col-span-1 justify-center items-center flex mb-[100px]">
                    <ul
                        class={clx(
                            "col-span-full",
                            "row-start-4",
                            "z-10",
                            "carousel",
                            "justify-center",
                            "gap-3"
                        )}
                        style={{ maxHeight: "600px" }}
                    >
                        {images?.map((img, index) => (
                            <li class="carousel-item">
                                <Slider.Dot
                                    index={index}
                                    class={clx(
                                        "bg-white opacity-20 h-[1px] w-[18px] no-animation",
                                        "disabled:w-10 disabled:bg-white disabled:opacity-100 transition-[width]",
                                    )}
                                ></Slider.Dot>
                            </li>
                        ))}
                    </ul>
                </div>
                <Slider.JS rootId={id} infinite={false} itemsToShow={quantityItemsSlider} />
            </div>

            {link && <a href={link} class="sm:hidden mb-[50px] flex justify-center items-center border-[1px] rounded-sm border-black uppercase text-xs w-[197px] h-[46px] font-medium">ver ações breton</a>}
        </section>
    );
}

export default Ecobreton;
