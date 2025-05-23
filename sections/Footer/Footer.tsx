import { RichText, type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import Icon from "../../components/ui/Icon.tsx";
import FooterNewsletter from "../../islands/FooterNewsletter.tsx";
import FooterLanguageSelector, {
  type FooterLanguageProps,
} from "./FooterLanguageSelector.tsx";
import Newsletter from "../Newsletter/Newsletter.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link {
  title: string;
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  contactInfo?: RichText;
  social?: Social[];
  logo?: ImageWidget;
  languages?: FooterLanguageProps;
  trademark?: string;
}

function Footer({
  links = [],
  social = [],
  languages,
  contactInfo,
  logo,
  trademark,
}: Props) {
  return (
    <footer class="px-0 bg-primary text-white">
      <div class="flex flex-col">
        <div class="pt-20 pb-10 sm:pb-[82px] sm:pt-[120px]">
          <img loading="lazy" src={logo} class="px-4 sm:px-0 mx-auto" />
        </div>
        <div class="container flex flex-col pt-10 sm:pt-6 pb-12 sm:pb-10 gap-12">
          <div class="grid grid-flow-row sm:grid-flow-col gap-12 sm:gap-6">
            {links.map(({ title, children }, index) => (
              <div class="flex flex-col gap-5">
                <span class="text-caption opacity-60 uppercase">{title}</span>
                <div class="flex flex-col gap-5">
                  {children.map(({ title, href }) => (
                    <div>
                      <a class="text-contentMini underline" href={href}>
                        {title}
                      </a>
                    </div>
                  ))}
                  {(index === links.length - 1) && contactInfo && (
                    <div
                      class="text-content"
                      dangerouslySetInnerHTML={{ __html: contactInfo }}
                    />
                  )}
                </div>
              </div>
            ))}
            <Newsletter status={undefined} />
          </div>

          <div class="hidden sm:flex justify-between items-center">
            {languages && (
              <FooterLanguageSelector
                title={languages.title}
                languages={languages.languages}
              />
            )}
            <ul class="flex gap-4">
              {social.map(({ image, href, alt }) => (
                <li>
                  <a href={href}>
                    <Image
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="container grid grid-flow-row sm:grid-flow-col gap-5 pt-6 pb-12">
          <div class="flex flex-nowrap items-center gap-4">
            <span class="text-legend opacity-60 text-center sm:text-start">
              {trademark}
            </span>
          </div>

          <div class="flex flex-nowrap items-center justify-center sm:justify-end gap-4">
            <span class="text-legend opacity-60 text-white">
              Design & Develop by
            </span>
            <Icon id="corebiz-logo" width={96} height={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="996px" />;

export default Footer;