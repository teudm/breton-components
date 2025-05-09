import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TopBar from "../../components/header/TopBar.tsx";
import NavBar, { NavBarProps } from "../../components/header/NavBar.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
  NAVBAR_POPUP_ID,
} from "../../constants.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";
// import Bag from "../../components/header/Bag.tsx";
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Link {
  label: string;
  href: string;
}

export interface SectionProps {
  /**
   * @title Languages
   * @description Links para redirecionar o site para outro idioma
   */
  languages?: {
    label: string,
    link: string,
  }[];
  /**
   * @title Topbar Links
   * @description Links clicáveis que aparecerão no topbar e ao final do menu mobile
   */
  links?: Link[];
  /**
   * @title Header Links
   * @description Links clicáveis que aparecerão no header ao lado do menu
   */
  headerLinks?: Link[];
  /**
   * @title Navigation items
   * @description Itens de navegação do menu mobile e desktop
   */
  navBar: NavBarProps;
  /**
   * @title Searchbar
   * @description Configurações da barra de busca
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @title Logo alternativo
   * @description Logo que surge após o scroll
   */
  altLogo: Logo;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}
type Props = Omit<SectionProps, "alert">;

const handleHeader = () => {
  const header = document.querySelector("header");
  const headerContent = document.querySelector("#header-content");
  const headerContentMainDivDesk = document.querySelector(
    ".headerContentMainDivDesktop"
  );
  const headerContentMainDivMob = document.querySelector(
    ".headerContentMainDivMobile"
  );
  const mainBanner = document.querySelector("#main-banner");
  const mainLogo = document.querySelector("#header-logo");
  const altLogo = document.querySelector("#header-altLogo");
  const topBar = document.querySelector("#top-bar");
  const headerHeightComponent = document.getElementById("header-height");
  const headerContentHeight = headerContent?.scrollHeight || 100;
  const topBarHeight = topBar?.scrollHeight || 24;

  if (!header) return;

  document.body.style.setProperty(
    "--header-height",
    `${headerContentHeight + topBarHeight}px`
  );

  const setHeaderState = (isScrolledPastBanner: boolean) => {
    if (isScrolledPastBanner) {
      header.className =
        "group z-40 w-full fixed bg-base h-[120px] pointer-events-none sm:h-[184px] text-black scrolled";
      mainLogo?.classList.add("hidden");
      altLogo?.classList.remove("hidden");
      topBar?.classList.add("hidden");
      document.body.style.setProperty(
        "--header-height",
        `${headerContentHeight}px`
      );
      headerContentMainDivDesk?.classList.add("bg-background");
      headerContentMainDivMob?.classList.add("bg-background");
      headerContentMainDivDesk?.setAttribute("style", "padding-block: 16px;");
      document.body.style.setProperty("--header-height", "56px");
    } else {
      header.className =
        "group z-40 w-full absolute bg-header-gradient hover:bg-none h-[120px] pointer-events-none sm:h-[184px] text-white hover:text-black";
      mainLogo?.classList.remove("hidden");
      altLogo?.classList.add("hidden");
      topBar?.classList.remove("hidden");
      document.body.style.setProperty(
        "--header-height",
        `${headerContentHeight + topBarHeight}px`
      );
      headerContentMainDivDesk?.classList.remove("bg-background");
      headerContentMainDivMob?.classList.remove("bg-background");
      headerContentMainDivDesk?.removeAttribute("style");
      document.body.style.setProperty(
        "--header-height",
        `${headerContentHeight + topBarHeight}px`
      );
    }
  };

  const handleScroll = () => {
    const scroll = window.scrollY;
    // const bannerHeight = mainBanner?.scrollHeight || 0;
    setHeaderState(scroll >= 24);
  };

  const setDefaultHeaderState = () => {
    header.className = "group z-40 w-full fixed bg-background h-fit text-black";
    mainLogo?.classList.add("hidden");
    altLogo?.classList.remove("hidden");
    headerHeightComponent!.style.height = `var(--header-height)`;
    headerHeightComponent!.className = "mb-0 md:mb-4";
  };

  const focusSearchbar = () => {
    const searchbar = document.getElementById("searchbar-popup");
    if (searchbar) {
      searchbar.onchange = () => {
        const searchInput = document.getElementById(
          "search-menu-input"
        ) as HTMLInputElement;
        searchInput.focus();
      };
    }
  };

  const isUserLoged = () => {
    window.STOREFRONT.USER.subscribe((sdk) => {
      const container = document.getElementById("account") as HTMLAnchorElement;
      const nodes = container.querySelectorAll<HTMLAnchorElement>("span");
      const login = nodes.item(0);
      const account = nodes.item(1);
      const user = sdk.getUser();
      if (user?.email) {
        container.href = "/my-account";
        login?.classList.add("hidden");
        account?.classList.remove("hidden");
      } else {
        container.href = "/my-account/login";
        login?.classList.remove("hidden");
        account?.classList.add("hidden");
      }
    });
  }

  focusSearchbar();
  isUserLoged();

  if (mainBanner) {
    setHeaderState(false);
    globalThis.window.addEventListener("scroll", handleScroll);
  } else {
    setDefaultHeaderState();
    globalThis.window.addEventListener("scroll", () => {
      topBar?.classList.toggle("hidden", window.scrollY > 0);
    });
  }
};

const Desktop = ({
  navBar,
  headerLinks,
  logo,
  altLogo,
  searchbar,
  loading,
}: Props) => (
  <div class="headerContentMainDivDesktop flex flex-col gap-4 py-[38px] group-hover:bg-background duration-700 transition-all ease-in-out">
    <div class="grid grid-cols-3 place-items-center container">
      <div class="flex gap-14 mr-auto">
        <label
          for={NAVBAR_POPUP_ID}
          class="flex items-center gap-4 cursor-pointer"
          aria-label="menu icon button"
        >
          <Modal id={NAVBAR_POPUP_ID}>
            <div
              class="absolute top-0 w-full bg-background h-10 min-h-[480px] border-t border-t-[#E7DED8] cursor-auto"
              style={{ marginTop: "var(--header-height)" }}
            >
              <NavBar.Desktop menu={navBar.menu} />
            </div>
          </Modal>
          <Icon
            id="menu"
            className="peer-checked:opacity-0 peer-checked:absolute transition-opacity duration-300"
          />
          <Icon
            id="icon-close"
            className="opacity-0 absolute peer-checked:static peer-checked:opacity-100 transition-opacity duration-300"
          />
          <span class="text-button uppercase">Menu</span>
        </label>
        {headerLinks &&
          headerLinks.map((link) => (
            <a key={link.label} href={link.href} class="text-button uppercase header-link">
              {link.label}
            </a>
          ))}
      </div>
      <div class="">
        <a href="/" aria-label="Store logo">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 23}
            id="header-logo"
            class="group-hover:hidden"
          />
          <Image
            src={altLogo.src}
            alt={altLogo.alt}
            width={altLogo.width || 100}
            height={altLogo.height || 23}
            id="header-altLogo"
            className="hidden group-hover:flex"
          />
        </a>
      </div>
      <div class="flex gap-14 items-center justify-center ml-auto" id="header-buttons">
        <label
          for={SEARCHBAR_POPUP_ID}
          class="flex items-center gap-4 cursor-pointer ml-auto"
          aria-label="search icon button"
        >
          <Modal id={SEARCHBAR_POPUP_ID}>
            <div
              class="absolute top-0 w-full bg-background min-h-[560px] border-t border-t-[#E7DED8] cursor-auto"
              style={{ marginTop: "var(--header-height)" }}
            >
              {loading === "lazy" ? (
                <div class="flex justify-center items-center">
                  <span class="loading loading-spinner" />
                </div>
              ) : (
                <Searchbar {...searchbar} />
              )}
            </div>
          </Modal>
          <Icon
            id="search"
            className="peer-checked:opacity-0 peer-checked:absolute transition-opacity duration-300"
          />
          <Icon
            id="icon-close"
            className="opacity-0 absolute peer-checked:static peer-checked:opacity-100 transition-opacity duration-300"
          />
          <span class="text-button uppercase header-button-label">Pesquise</span>
        </label>
        <a id="account" href="/login" class="flex items-center gap-4">
          <Icon id="icon-user" size={24} />
          <span class="text-button uppercase header-button-label hidden">Login</span>
          <span class="text-button uppercase header-button-label hidden">Conta</span>
        </a>
        {/* <Bag /> */}
      </div>
    </div>
  </div>
);
const Mobile = ({
  logo,
  links,
  altLogo,
  searchbar,
  navBar,
  loading,
}: Props) => (
  <>
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy" ? (
            <div
              id={SIDEMENU_CONTAINER_ID}
              class="h-full flex items-center justify-center"
              style={{ minWidth: "100vw" }}
            >
              <span class="loading loading-spinner" />
            </div>
          ) : (
            <NavBar.Mobile menu={navBar.menu} links={links} />
          )}
        </Drawer.Aside>
      }
    />

    <div class="headerContentMainDivMobile flex items-center justify-between group-hover:bg-background w-screen px-4 py-[5px] gap-4">
      <div class="flex gap-4">

        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-square btn-sm btn-ghost"
          aria-label="open menu"
        >
          <Icon id="menu" />
        </label>
        <label
          for={SEARCHBAR_POPUP_ID}
          class="flex items-center gap-4 cursor-pointer"
          aria-label="search icon button"
        >
          <Modal id={SEARCHBAR_POPUP_ID}>
            <div
              class="absolute top-0 w-full bg-background min-h-[576px] cursor-auto"
              style={{ marginTop: "var(--header-height)" }}
            >
              {loading === "lazy" ? (
                <div class="flex justify-center items-center">
                  <span class="loading loading-spinner" />
                </div>
              ) : (
                <Searchbar {...searchbar} />
              )}
            </div>
          </Modal>
          <Icon
            id="search"
            className="peer-checked:opacity-0 peer-checked:absolute transition-opacity duration-300"
          />
          <Icon
            id="icon-close"
            className="opacity-0 absolute peer-checked:static peer-checked:opacity-100 transition-opacity duration-300"
          />
        </label>
      </div>
      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          // style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 23}
            id="header-logo"
            class="group-hover:hidden"
          />
          <Image
            src={altLogo.src}
            alt={altLogo.alt}
            width={altLogo.width || 100}
            height={altLogo.height || 23}
            id="header-altLogo"
            className="hidden group-hover:flex"
          />
        </a>
      )}
      <div class="flex gap-4">
        <a id="account" href="/login" class="flex items-center gap-4">
          <Icon id="icon-user" size={24} />
        </a>
        {/* <Bag /> */}
      </div>
    </div>
  </>
);

function Header({
  languages = [],
  links = [],
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabackground.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 120,
    height: 20,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <>
      <header>
        {links.length > 0 && <TopBar links={links} languages={languages} />}
        <div id="header-content" class="w-full pointer-events-auto opacity-[.9]">
          {device === "desktop" ? (
            <Desktop logo={logo} {...props} />
          ) : (
            <Mobile links={links} logo={logo} {...props} />
          )}
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(handleHeader) }}
        />
      </header>
      <div id="header-height"></div>
    </>
  );
}
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...(props as any)} loading="lazy" />
);
export default Header;
