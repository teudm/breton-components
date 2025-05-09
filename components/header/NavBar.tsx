import { ImageWidget } from "apps/admin/widgets.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
import Drawer from "../ui/Drawer.tsx";
import { SIDEMENU_DRAWER_ID } from "../../constants.ts";
import { Link } from "../../sections/Header/Header.tsx";

interface SimpleLink {
  /** @hide true */
  /** @readonly */
  type: "link";
  label?: string;
  link?: string;
}

interface ImageLink {
  label?: string;
  image?: ImageWidget;
  link?: string;
}

interface DisclosureLink {
  /** @hide true */
  /** @readonly */
  type: "disclosure";
  label?: string;
  children?: SimpleLink[];
}

/** @title {{{item.label}}} */
interface SubmenuLinkItem {
  item?: SimpleLink | DisclosureLink;
}

interface ImagesMenu {
  /** @hide true */
  /** @readonly */
  type: "menu-with-images";
  label?: string;
  images?: ImageLink[];
}

/** @titleBy title */
interface SimpleSubMenu {
  title?: string;
  url?: string;
  children?: SubmenuLinkItem[];
}

interface SimpleMenu {
  /** @hide true */
  /** @readonly */
  type: "menu";
  label?: string;
  submenu?: SimpleSubMenu[];
}

/**
 * @title {{{item.label}}}
 */
interface MenuItem {
  item?: SimpleMenu | ImagesMenu | SimpleLink;
}

export interface NavBarProps {
  menu?: MenuItem[];
}

const handleNavigation = () => {
  document.querySelectorAll('input[name="submenu"]').forEach(input => {
    input.addEventListener("change", () => {
      // Itera sobre todos os inputs do grupo
      document.querySelectorAll('input[name="submenu"]').forEach(radio => {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        if (label) {
          // Atualiza o atributo data-state com base no estado atual
          label.setAttribute(
            "data-state",
            (radio as HTMLInputElement).checked ? "checked" : "unchecked"
          );
        }
      });
    });
  });
};

function NavBar() {
  return <></>;
}
function Desktop({ menu }: NavBarProps) {
  if (!menu) return null;
  return (
    <div class="text-black flex h-full container">
      <div class="flex flex-col w-[160px] pr-6 pt-6 border-r border-r-[#E7DED8] text-button uppercase">
        {menu?.map(({ item }, index) => {
          if (!item) return null;
          return (
            <>
              {item.type === "link" ? (
                <a
                  class="flex h-14 items-center opacity-40 hover:opacity-100 hover:text-primary duration-300"
                  href={item.link}
                >
                  {item.label}
                </a>
              ) : (
                <label
                  class="flex justify-between h-14 items-center cursor-pointer hover:opacity-100 hover:text-primary duration-300 menu-input-label"
                  for={`${item.label}-input`}
                  id={`${item.label}-label`}
                  data-state={index === 0 ? "checked" : "unchecked"}
                >
                  {item.label}
                  <Icon id={"seta-direita"} />
                </label>
              )}
            </>
          );
        })}
      </div>
      <div class="overflow-auto mb-2 mt-10 custom-scrollbar w-full">
        {menu.map(({ item }, index) => {
          if (!item) return null;
          if (item.type === "link") return null;
          return (
            <div>
              <input
                type="radio"
                class="modal-toggle menu-input peer"
                id={`${item.label}-input`}
                checked={index === 0}
                name="submenu"
              />
              <div class="menu-modal overflow-auto ml-10 mr-4">
                {item.type === "menu" && <SimpleMenu submenu={item.submenu} />}
                {item.type === "menu-with-images" && (
                  <ImagesMenu submenu={item.images} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleNavigation) }}
      />
    </div>
  );
}

function SimpleMenu({ submenu }: { submenu?: SimpleSubMenu[] }) {
  if (!submenu) return null;
  return (
    <div class="w-full flex gap-6">
      {submenu.map(({ title, url, children }) => (
        <div class="flex flex-col gap-4">
          <div>
            <p class="text-button text-primary uppercase">{title}</p>
            <a href={url} class="text-legend text-primary">
              ver tudo
            </a>
          </div>
          <div class="flex gap-6">
            {Array.from({ length: 3 }, (_, colIndex) => {
              const columnItems = children?.slice(
                colIndex * 7,
                colIndex * 7 + 7
              );

              if (!columnItems || columnItems.length === 0) return null;

              return (
                <div key={colIndex} class="flex flex-col gap-2 w-[180px]">
                  {columnItems?.map(({ item }, index) => {
                    if (!item) return null;
                    return item.type === "link" ? (
                      <a key={index} class="text-contentMini" href={item.link}>
                        {item.label}
                      </a>
                    ) : (
                      <div key={index} class="collapse rounded-none">
                        <input type="checkbox" class="min-h-0" />
                        <div class="collapse-title text-contentMini">
                          {item.label}
                        </div>
                        <div class="collapse-content !p-0">
                          <div class="flex flex-col gap-2">
                            {item.children?.map((child, childIndex) => (
                              <a
                                key={childIndex}
                                class="text-contentMini opacity-40 hover:opacity-100 transition-opacity duration-300"
                                href={child.link}
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ImagesMenu({ submenu }: { submenu?: ImageLink[] }) {
  if (!submenu) return null;
  return (
    <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-1">
      {submenu.map(({ image, label, link }) => (
        <a
          class="flex relative w-full items-center group/submenu overflow-hidden last:col-span-2 md:last:col-span-1 aspect-[73/92] last:aspect-[296/184] md:aspect-auto md:last:aspect-auto"
          href={link}
        >
          <img
            class="w-full h-full object-cover md:group-hover/submenu:scale-110 duration-3000"
            src={image || ""}
            alt={label}
          />
          <span class="absolute flex items-center justify-center h-full w-full text-h5Mobile text-center md:text-h5 text-white uppercase">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

function Mobile({ menu, links }: NavBarProps & { links?: Link[] }) {
  if (!menu) return null;
  return (
    <div class="flex flex-col justify-between pl-6 pb-6 pr-2 mt-10">
      <div class="flex flex-col gap-2">
        {menu?.map(({ item }) => {
          if (!item) return null;
          if (item.type === "link")
            return (
              <a
                class="text-button uppercase pt-[7px] pb-[9px]"
                href={item.link}
              >
                {item.label}
              </a>
            );
          if (item.type === "menu" && item.submenu)
            return (
              <>
                {item.submenu.map(({ children, title }) => {
                  if (!title || !children) return null;
                  return (
                    <>
                      {title && children && (
                        <Drawer
                          id={title.toLowerCase().replaceAll(" ", "-")}
                          aside={
                            <Drawer.Aside
                              title={title}
                              drawer={title.toLowerCase().replaceAll(" ", "-")}
                              back
                            >
                              <div class="flex flex-col gap-2 pl-6 pb-6 pr-2 pt-10 overflow-auto custom-scrollbar">
                                {children.map(({ item }) => {
                                  if (!item) return null;
                                  if (item.type === "disclosure") {
                                    if (!item.label || !item.children)
                                      return null;
                                    return (
                                      <>
                                        <Drawer
                                          id={`${title
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}-${item.label
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                          aside={
                                            <Drawer.Aside
                                              title={item.label}
                                              drawer={`${title
                                                .toLowerCase()
                                                .replaceAll(
                                                  " ",
                                                  "-"
                                                )}-${item.label
                                                .toLowerCase()
                                                .replaceAll(" ", "-")}`}
                                              back
                                            >
                                              <div class="flex flex-col gap-2 pl-6 pb-6 pr-2 pt-10 overflow-auto custom-scrollbar">
                                                {item.children.map(
                                                  ({ link, label }) => {
                                                    return (
                                                      <a
                                                        class="text-button uppercase pt-[7px] pb-[9px]"
                                                        href={link}
                                                      >
                                                        {label}
                                                      </a>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </Drawer.Aside>
                                          }
                                        />
                                        <label
                                          for={`${title
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}-${item.label
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                          class="flex justify-between pt-[7px] pb-[9px]"
                                        >
                                          <span class="text-button uppercase">
                                            {item.label}
                                          </span>
                                          <Icon id="seta-direita" />
                                        </label>
                                      </>
                                    );
                                  }
                                  return (
                                    <a
                                      class="text-button uppercase pt-[7px] pb-[9px]"
                                      href={item.link}
                                    >
                                      {item.label}
                                    </a>
                                  );
                                })}
                              </div>
                            </Drawer.Aside>
                          }
                        />
                      )}
                      <label
                        for={title.toLowerCase().replaceAll(" ", "-")}
                        class="flex justify-between pt-[7px] pb-[9px]"
                      >
                        <span class="text-button uppercase">{title}</span>
                        <Icon id="seta-direita" />
                      </label>
                    </>
                  );
                })}
              </>
            );
          if (item.type === "menu-with-images") {
            if (!item.label || !item.images) return null;
            return (
              <>
                <Drawer
                  id={item.label.toLowerCase().replaceAll(" ", "-")}
                  aside={
                    <Drawer.Aside
                      title={item.label}
                      drawer={item.label.toLowerCase().replaceAll(" ", "-")}
                      back
                    >
                      <div class="p-2 overflow-auto custom-scrollbar">
                        <ImagesMenu submenu={item.images} />
                      </div>
                    </Drawer.Aside>
                  }
                />
                <label
                  for={item.label.toLowerCase().replaceAll(" ", "-")}
                  class="flex justify-between pt-[7px] pb-[9px]"
                >
                  <span class="text-button uppercase">{item.label}</span>
                  <Icon id="seta-direita" />
                </label>
              </>
            );
          }
        })}
      </div>
      <div class="flex flex-col gap-2">
        {links && links.map(link => (
          <a class="text-button uppercase pt-[7px] pb-[9px]" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

NavBar.Desktop = Desktop;
NavBar.Mobile = Mobile;

export default NavBar;
