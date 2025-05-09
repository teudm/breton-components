import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}
const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};
function Drawer({
  children,
  aside,
  open,
  class: _class = "",
  id = useId(),
}: Props) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">{children}</div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents"
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
function Aside({
  title,
  drawer,
  children,
  back,
}: {
  title: string;
  drawer: string;
  children: ComponentChildren;
  back?: boolean;
}) {
  return (
    <div
      data-aside
      class="bg-[#FCF9F7] grid grid-rows-[auto_1fr] h-full w-[87vw]"
      style={{ maxWidth: "100vw" }}
    >
      <div class="flex justify-between items-center ml-6 mt-2 mr-2">
        {back && (
          <label
            for={drawer}
            aria-label="back"
            class="h-12 flex items-center justify-center"
          >
            <Icon id="seta-direita" class="rotate-180" width={16} height={24} />
          </label>
        )}
        <h2 class="text-button uppercase">{title}</h2>
        <label
          for={drawer}
          aria-label="X"
          class="w-12 h-12 flex items-center justify-center"
        >
          <Icon id="icon-close" size={24} />
        </label>
      </div>
      {children}
    </div>
  );
}
Drawer.Aside = Aside;
export default Drawer;