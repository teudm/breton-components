import CartItem, { Item } from "./Item.tsx";
import Modal from "../ui/Modal.tsx";
import { clx } from "../../sdk/clx.ts";
import { InstitutionalFormInputGroup } from "../institutional/Form/InstitutionalFormInputGroup.tsx";
import { useScript } from "@deco/deco/hooks";
import { InstitutionalFormMessage } from "../institutional/Form/InstitutionalFormMessage.tsx";
import { maskPhone } from "../../sdk/inputMask.ts";
import Icon from "../ui/Icon.tsx";
import { sendRequestQuote } from "./sendRequestQuote.ts";

export interface Props {
  items: Item[];
}

export default function RequestQuoteModal({ items }: Props) {
  return (
    <Modal id="product-quote" class="w-screen left-auto">
      <div
        id="product-quote-container"
        class={clx(
          "modal-box",
          "px-6 py-16 md:p-12",
          "rounded-none",
          "relative flex gap-12",
          "w-full md:w-[85.29%] max-w-7xl max-h-full md:max-h-[728px]"
        )}
      >
        <label
          for="product-quote"
          class="absolute w-12 h-12 flex items-center justify-center top-2 right-2 cursor-pointer"
        >
          <Icon id="icon-close" />
        </label>
        <div class="max-md:hidden">
          <ul
            role="list"
            class="flex-grow overflow-y-auto flex flex-col gap-4 w-full"
          >
            {items &&
              items.map((item, index) => (
                <li>
                  <CartItem item={item} index={index} />
                </li>
              ))}
          </ul>
        </div>
        <div
          id="product-quote-form-container"
          class="flex-grow flex flex-col gap-10"
        >
          <div class="flex flex-col gap-4 max-w-[544px]">
            <p class="text-h2Mobile md:text-h2">Solicite o seu orçamento</p>
            <p class="text-contentMini md:text-content">
              Assim que recebermos o seu pedido, um dos nossos consultores irá
              enviar o orçamento completo dos produtos.
            </p>
          </div>
          <form id="product-quote-form" class="max-md:pb-16">
            <input
              type="hidden"
              id="products-quote"
              name="products-quote"
              value={encodeURIComponent(JSON.stringify({ items }))}
            />
            <div class="flex flex-col gap-4 mb-10">
              <div class="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
                <InstitutionalFormInputGroup
                  label="Nome: *"
                  placeholder="Digite aqui"
                  type="text"
                  nameOnMasterData="name"
                />
                <InstitutionalFormInputGroup
                  label="Email: *"
                  placeholder="seunome@email.com"
                  type="email"
                  nameOnMasterData="email"
                />
                <InstitutionalFormInputGroup
                  label="Telefone/Celular: *"
                  placeholder="(__) ____-____"
                  type="tel"
                  nameOnMasterData="phone"
                />
                <div class="flex flex-col gap-2 justify-between">
                  <label for="product-for" class="text-black text-contentMini">
                    Essa peça é para a minha:
                  </label>
                  <select
                    required
                    name="product-for"
                    id="product-for"
                    class={clx(
                      "py-[11px] px-[15px] text-black text-content",
                      "border-b border-black bg-background peer",
                      "outline-none data-[invalid=true]:border-error transition-all duration-300",
                      "invalid:text-opacity-40 focus:text-opacity-100"
                    )}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      hidden
                      class="text-contentMini text-opacity-40 opacity-40"
                    >
                      Selecione
                    </option>
                    <option
                      value="home"
                      class="text-contentMini text-opacity-100 hover:bg-black hover:text-white"
                    >
                      Minha casa
                    </option>
                    <option
                      value="business"
                      class="text-contentMini text-opacity-100 hover:bg-black hover:text-white"
                    >
                      Minha empresa
                    </option>
                    <option
                      value="client"
                      class="text-contentMini text-opacity-100 hover:bg-black hover:text-white"
                    >
                      Meu cliente (sou arquiteto)
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-2 justify-between">
                <label for="observations" class="text-black text-contentMini">
                  Observações:
                </label>
                <textarea
                  id="observations"
                  name="observations"
                  placeholder="Deixe comentários sobre personalizações e outras solicitações para complementar o orçamento..."
                  style={{ resize: "none" }}
                  class={clx(
                    "py-[11px] px-[15px] placeholder:opacity-40 text-black text-content h-24 max-h-24",
                    "border-b border-black bg-background peer",
                    "outline-none data-[invalid=true]:border-error transition-all duration-300"
                  )}
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-black text-contentMini"
                  for="contact-preference"
                >
                  Como gostaria de ser atendido?
                </label>
                <div class="flex max-md:flex-col gap-4 md:gap-8">
                  <div class="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="contact-preference-email"
                      name="contact-preference"
                      value="email"
                      class="w-[22px] h-[22px] rounded-sm accent-primary"
                    />
                    <label
                      for="contact-preference-email"
                      class="text-black text-caption uppercase"
                    >
                      E-mail
                    </label>
                  </div>
                  <div class="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="contact-preference-phone"
                      name="contact-preference"
                      value="phone"
                      class="w-[22px] h-[22px] rounded-sm accent-primary"
                    />
                    <label
                      for="contact-preference-phone"
                      class="text-black text-caption uppercase"
                    >
                      Telefone
                    </label>
                  </div>
                  <div class="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="contact-preference-whatsapp"
                      name="contact-preference"
                      value="whatsapp"
                      class="w-[22px] h-[22px] rounded-sm accent-primary"
                    />
                    <label
                      for="contact-preference-whatsapp"
                      class="text-black text-caption uppercase"
                    >
                      Whatsapp
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="flex w-full cursor-pointer items-center justify-center rounded-[2px] bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3"
            >
              <span class="[.htmx-request_&]:hidden flex gap-4">
                <Icon id="icon-briefcase" size={24} />
                Solicitar orçamento
              </span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </button>
          </form>
        </div>
      </div>
      <div
        class="modal-box max-w-none max-h-none rounded-none bg-black/50 h-full w-full hidden items-center justify-center"
        id="product-quote-form-success-message"
      >
        <InstitutionalFormMessage
          content={{
            title: "OBRIGADO!",
            text: "Em breve entraremos em contato com você!",
          }}
          idString=""
          class="my-auto bg-background max-md:w-full p-6 !flex"
        />
      </div>
      <div
        class="modal-box max-w-none max-h-none rounded-none bg-black/50 h-full w-full hidden items-center justify-center"
        id="product-quote-form-error-message"
      >
        <InstitutionalFormMessage
          content={{
            title: "DESCULPE!",
            text: "Houve um erro no envio dos seus dados. Por favor, tente novamente mais tarde. Caso o erro persista, favor, entre em contato com a loja.",
          }}
          idString=""
          class="my-auto bg-background max-md:w-full p-6 !flex"
        />
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(sendRequestQuote) }}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(maskPhone) }}
      />
    </Modal>
  );
}
