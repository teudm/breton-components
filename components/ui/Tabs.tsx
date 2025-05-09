import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useScript } from "@deco/deco/hooks";

export interface TabProps {
  title: string;
  defaultChecked?: boolean;
  children: JSX.Element;
}

const handleTabs = () => {
  const tabs = document.querySelectorAll("input.tab");
  tabs.forEach(tab => {
    tab.addEventListener("change", ({ target }) => {
      const element = target as HTMLInputElement;
      const { value, checked } = element;
      document.querySelectorAll("label.tab-active").forEach(label => {
        label.classList.remove("tab-active");
      });
      if (checked) {
        document.querySelector(`label[data-input="${value}"]`)?.classList.add("tab-active");
      }
    });
  });
}

function Tabs({ children }: { children: (false | "" | JSX.Element | undefined)[] }) {
  return (
    <div role="tablist" class="tabs tabs-bordered mx-auto w-full">
      {children}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleTabs) }}
      />
    </div>
  );
}

function Tab({ title, children, defaultChecked }: TabProps) {
  return (
    <>
      <input
        type="radio"
        name="tabs"
        role="tab"
        value={title}
        className={clx("tab hidden")}
        aria-label={title}
        defaultChecked={defaultChecked}
        id={title}
      />
      <div role="tabpanel" className="tab-content mt-6 md:mt-10 px-6 md:px-0">
        {children}
      </div>
    </>
  );
}

function TabTitles({ titles }: { titles: (string | false | undefined)[] }) {
  return (
    <div class="flex overflow-auto hide-scrollbar px-4 md:px-0 md:justify-center">
      {titles.map((title, index) => (
        <label
          for={title as string}
          class={clx(
            "transition-all duration-300",
            "uppercase text-button",
            "border-ui-400 border-b",
            "text-ui-400 whitespace-nowrap",
            "px-6 py-3 h-auto cursor-pointer",
            index === 0 && "tab-active"
          )}
          data-input={title}
          checked={true}
        >
          {title}
        </label>
      ))}
    </div>
  );
}

Tabs.Titles = TabTitles;
Tabs.Tab = Tab;
export default Tabs;
