const handleForm = (e: Event) => {
  e.preventDefault();
  console.log(e);
};

function FooterNewsletter() {
  return (
    <form class="flex flex-col gap-6 sm:pl-20" onSubmit={handleForm}>
      <span class="text-caption opacity-60 uppercase">
        RECEBA AS NOVIDADES DA BRETON
      </span>
      <div class="flex flex-col gap-2">
        <label class="text-contentMini" for="footer-newsletter-email">
          Seu email:
        </label>
        <input
          class="w-full bg-primary-darker border-0 border-b pl-[15px] text-content text-white border-b-white outline-none h-[46px]"
          type="email"
          id="footer-newsletter-email"
          required
          placeholder="seunome@email.com"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-contentMini" for="footer-newsletter-nome">
          Seu nome:
        </label>
        <div class="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <input
            class="w-full bg-primary-darker border-0 border-b pl-[15px] text-content text-white border-b-white outline-none h-[46px]"
            type="text"
            id="footer-newsletter-nome"
            required
            placeholder="Digite aqui"
          />
          <button
            class="btn btn-accent"
            type="submit"
            id="footer-newsletter-submit"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
}

export default FooterNewsletter;
