import { InstitutionalFormInputGroupProps } from "./types.ts";
import { clx } from "../../../sdk/clx.ts";

export function InstitutionalFormInputGroup({
  label,
  placeholder,
  type,
  nameOnMasterData,
}: InstitutionalFormInputGroupProps) {
  return (
    <div class="flex flex-col gap-2 relative group" data-type={type}>
      <label class="text-black text-contentMini" for={nameOnMasterData}>
        {label}
      </label>
      <input
        class={clx(
          "py-[11px] px-[15px] placeholder:opacity-40 text-black text-content",
          "border-b border-black bg-transparent peer",
          "outline-none data-[invalid=true]:border-error transition-all duration-300",
        )}
        type={type}
        id={nameOnMasterData}
        required
        data-invalid="false"
        placeholder={placeholder}
        name={nameOnMasterData}
      />
      <span
        class={clx(
          "absolute pointer-events-none right-0 bottom-0 opacity-0",
          "text-legend text-error",
          "peer-[.invalid]:opacity-100 peer-[.invalid]:top-full",
          "transition-all duration-300",
        )}
      >
        Dados incorretos
      </span>
    </div>
  );
}
