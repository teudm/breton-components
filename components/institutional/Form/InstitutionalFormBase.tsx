import { clx } from "../../../sdk/clx.ts";
import { InstitutionalFormInputGroup } from "./InstitutionalFormInputGroup.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";
import { maskPhone } from "../../../sdk/inputMask.ts";
import { InstitutionalFormBaseProps } from "./types.ts";

export function InstitutionalFormBase({
  title,
  description,
  inputs,
  labelSendButton,
  type = 1,
}: InstitutionalFormBaseProps) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div
      id="institutionalFormBase"
      class="flex max-md:gap-10"
      style={{
        flexDirection: type === 2 ? "column" : "row",
        display: type === 1 ? "grid" : "",
        gridTemplateColumns: type === 1 ? (isMobile ? "1fr" : "50% 50%") : "",
      }}
    >
      <div
        class="flex flex-col gap-6 md:h-fit max-md:items-center md:mb-10"
        style={{
          alignItems: type === 2 || isMobile ? "center" : "",
          maxWidth: type === 1 ? "320px" : "",
        }}
      >
        <p class="text-black uppercase text-h4 max-md:text-center">{title}</p>
        <p
          class="text-black text-sm font-light leading-normal tracking-wide"
          style={{ textAlign: type === 2 || isMobile ? "center" : "" }}
        >
          {description}
        </p>
      </div>
      <div>
        <form id="institutionalForm" class="flex flex-col gap-6">
          <div
            class="max-md:flex flex-col md:grid max-md:gap-6 md:gap-[1.95%]"
            style={{
              gridTemplateColumns: type === 2 ? "41.55% 41.55% 13%" : "1fr",
              display: type === 1 ? "flex" : "",
              gap: type === 1 ? "24px" : "",
            }}
          >
            {inputs.map((input) => (
              <InstitutionalFormInputGroup
                label={input.label}
                placeholder={input.placeholder}
                type={input.type}
                nameOnMasterData={input.nameOnMasterData}
              />
            ))}
          </div>

          <button
            type="submit"
            class={clx(
              "bg-white/20 rounded-[1px] backdrop-blur-[20px] text-center",
              "text-black text-button font-medium",
              "uppercase tracking-[2.64px]",
              "rounded-sm border border-black py-[11px]"
            )}
            style={{
              width: type === 1 && !isMobile ? "fit-content" : "",
              padding: type === 1 ? "11px 24px" : "",
              marginLeft: type === 1 && !isMobile ? "auto" : "",
            }}
          >
            {labelSendButton}
          </button>
        </form>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(maskPhone) }}
      />
    </div>
  );
}
