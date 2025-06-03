function NotFound() {
    return (
      <div class="container w-full flex justify-center items-center py-10 flex-col">
        <p class="text-center leading-[24px] font-light text-sm">
          Não encontramos resultados para a sua busca. <br />
          Refaça sua busca com novos termos ou navegue por ambientes:
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[8px] mt-[5rem] mb-[5rem]">
          <div>
            <a href="/s?q=jantar&page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-jantar.jpg" />
            </a>
          </div>
          <div>
            <a href="/s?q=home_theater&page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-salaestar.jpg" />
            </a>
          </div>
          <div>
            <a href="/s?q=quarto&page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-quarto.jpg" />
            </a>
          </div>
          <div>
            <a href="/s?q=office&page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-escritorio.jpg" />
            </a>
          </div>
          <div>
            <a href="/area-externa?page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-garden.jpg" />
            </a>
          </div>
          <div>
            <a href="/s?q=living&page=1">
              <img src="https://newbreton.vteximg.com.br/arquivos/thumb-bar.jpg" />
            </a>
          </div>
        </div>

        <div class="flex flex items-center justify-center">
          <a
            href="/"
            class="text-[11px] tracking-[1px] flex items-center text-center justify-center uppercase text-white bg-[#000000CC] w-[170px] h-[48px]"
          >
            ir para home
          </a>
        </div>
      </div>
    );
}

export default NotFound