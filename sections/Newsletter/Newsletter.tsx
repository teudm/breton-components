import { AppContext } from "../../apps/site.ts";
import { useComponent } from "../Component.tsx";
import { type SectionProps } from "@deco/deco";

interface InputProps {
  label?: string;
  placeholder?: string;
}
interface NoticeProps {
  title?: string;
  description?: string;
}
export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;
  /** @description Texto que aparecerá no botão de envio */
  label?: string;
  /** @description Informações que aparecerão nos inputs de email e nome */
  inputs?: {
    email?: InputProps;
    name?: InputProps;
  };
  /** @hide true */
  status?: "success" | "failed";
}
export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();
  const email = `${form.get("footer-newsletter-email") ?? ""}`;
  const name = `${form.get("footer-newsletter-nome") ?? ""}`;
  // deno-lint-ignore no-explicit-any
  const response = await (ctx as any).invoke(
    "site/actions/newsletter/subscribe.ts",
    {
      email,
      name,
    }
  );
  if (response.ok) return { ...props, status: "success" };
  return { ...props, status: "failed" };
}
export function loader(props: Props) {
  return { ...props, status: undefined };
}
function Notice({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div class="flex-col gap-6 flex">
      <div class="flex flex-col gap-6">
        <p class="text-[22px] font-semibold font-['F37 Neuro'] uppercase leading-loose tracking-widest">
          {title}
        </p>
        <p class="text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
}
function Newsletter({
  empty = {
    title: "RECEBA AS NOVIDADES DA BRETON",
  },
  success = {
    title: "OBRIGADO!",
    description: "Agradecemos seu cadastro!",
  },
  failed = {
    title: "DESCULPE!",
    description:
      "Houve um erro no envio dos seus dados. Por favor, tente novamente mais tarde. Caso o erro persista, favor, entre em contato com a loja.",
  },
  label = "Enviar",
  inputs = {
    email: {
      label: "Seu email: ",
      placeholder: "seunome@email.com",
    },
    name: {
      label: "Seu nome: ",
      placeholder: "Digite aqui",
    },
  },
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <section class="">
        <Notice {...(status === "success" ? success : failed)} />
      </section>
    );
  }
  return (
    <section class="md:pl-20">
      <form
        hx-target="closest section"
        hx-swap="innerHTML"
        hx-post={useComponent(import.meta.url)}
        class="flex flex-col gap-6"
      >
        <span class="text-caption opacity-60 uppercase">{empty.title}</span>
        <div class="flex flex-col gap-2">
          <label class="text-contentMini" for="footer-newsletter-email">
            {inputs?.email?.label}
          </label>
          <input
            class="w-full bg-primary-darker border-0 border-b pl-[15px] text-content text-white border-b-white outline-none h-[46px]"
            type="email"
            id="footer-newsletter-email"
            name="footer-newsletter-email"
            required
            placeholder={inputs?.email?.placeholder}
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-contentMini" for="footer-newsletter-nome">
            {inputs?.name?.label}
          </label>
          <div class="flex flex-col sm:flex-row gap-6 sm:gap-4">
            <input
              class="w-full bg-primary-darker border-0 border-b pl-[15px] text-content text-white border-b-white outline-none h-[46px]"
              type="text"
              id="footer-newsletter-nome"
              name="footer-newsletter-nome"
              required
              placeholder={inputs?.name?.placeholder}
            />
            <button
              class="btn btn-accent"
              type="submit"
              id="footer-newsletter-submit"
            >
              <span class="[.htmx-request_&]:hidden inline">
                {label}
              </span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
export default Newsletter;
