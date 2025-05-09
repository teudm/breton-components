import {
  type HTMLWidget,
  type ImageWidget,
  type Color,
} from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";

export interface InstitutionalFooterNavigatorProps {
  text?: HTMLWidget;
  background?: Color;
  navigationList?: NavigationListProps[];
}

interface NavigationListProps {
  title: string;
  label: string;
  link: string;
  imageDesktop: ImageWidget;
  imageMobile: ImageWidget;
}

function InstitutionalFooterNavigator({
  text,
  background,
  navigationList,
}: InstitutionalFooterNavigatorProps) {

  return (
    <Section.Tabbed>
      {
        <div class="w-full relative max-md:pb-[156px] md:pb-[200px] flex justify-center items-center">
          <div
            class="w-full max-md:min-h-[182px] md:min-h-[360px] max-md:pt-[48px] md:pt-[96px]"
            style={{ background }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div class="absolute bottom-0 max-md:max-w-[100%] md:max-w-[90vw] 2xl:max-w-[1232px] m-auto flex gap-4 overflow-auto">
            {navigationList?.map((item, index) => {
              const isFirstChild = index === 0;
              const isLastChild = navigationList.length - 1;
              return (
                <a href={item.link} class={`flex-1 relative ${isLastChild === index ? "max-md:mr-6" : ""} ${isFirstChild ? "max-md:ml-6" : ""}`}>
                  <img
                    src={item.imageDesktop}
                    alt={item.title}
                    class="max-md:hidden"
                  />
                  <img
                    src={item.imageMobile}
                    alt={item.title}
                    class="md:hidden min-w-[280px]"
                  />
                  <div class="absolute z-10 w-full h-full bg-banner-gradient top-0" />
                  <div class="absolute bottom-12 z-20 flex flex-col gap-4 text-white text-center w-full">
                    <p class="text-[28px] leading-[32px] font-normal tracking-[2.24px]">
                      {item.title}
                    </p>
                    <button class="w-fit py-[10px] px-6 rounded-xs bg-[rgba(0, 0, 0, 0.20)] m-auto backdrop-blur-[10px] border border-solid border-white">
                      {item.label}
                    </button>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      }
    </Section.Tabbed>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default InstitutionalFooterNavigator;
