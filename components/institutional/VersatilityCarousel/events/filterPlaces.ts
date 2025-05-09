import { PlaceProps } from "../types.ts";

/**
 * Filtra e exibe uma lista de lugares com paginação e suporte a filtros.
 *
 * @param {PlaceProps[]} places - Lista de lugares disponíveis.
 * @param {number} limitPerPage - Número máximo de lugares exibidos por página.
 * @param {string} id - Identificador único para componentes relacionados.
 * @param {boolean} isMobile - Indica se a exibição é para dispositivos móveis.
 */
export function filterPlaces(
  places: PlaceProps[],
  limitPerPage: number,
  id: string,
  isMobile: boolean
) {
  const filterSelect = document.getElementById(
    "filterAllPlaces"
  ) as HTMLFormElement;
  if (!filterSelect) return;

  let visibleCount = 0;

  /**
   * Ativa ou desativa a visibilidade de um ícone de seleção nos filtros de lugares.
   * 
   * Percorre todas as divs dentro do elemento "#filterAllPlaces" e ajusta a visibilidade
   * do ícone de seleção com base no estado do input checkbox correspondente.
   * 
   * @returns {void}
   */
  function activeInputOnSelect() {
    const divs = document.querySelectorAll("#filterAllPlaces div")

    divs.forEach((div) => {
      const input = div.querySelector("input");
      const checked = div.querySelector("#eachPlaceChecked");
      if(!input || !checked) return;

      if(input.checked) {
        checked.classList.remove("hidden");
        input.classList.add("opacity-0");
      } else {
        checked.classList.add("hidden");
        input.classList.remove("opacity-0");
      }
    })
  }

  /**
   * Atualiza a visibilidade dos lugares filtrados com base no valor selecionado e na página atual.
   *
   * @param {string | null} selectedValue - O tipo de lugar selecionado no filtro.
   * @param {number} [page=1] - Número da página atual.
   */
  function applyFiltersAndPaginate(
    selectedValue: string | null,
    page: number = 1
  ) {
    const filteredPlaces = selectedValue
      ? places.filter(({ type }) => selectedValue.includes(type))
      : places;

    const allPlacesSelected = selectedValue ? selectedValue.split(",") : [];

    visibleCount = page * limitPerPage;

    const placeTypeClass = (selectedValue: string) => {
      return isMobile
        ? `.place-type-mobile-${selectedValue.toLowerCase()}`
        : `.place-type-${selectedValue.toLowerCase()}`;
    };

    const allPlaceElements = document.querySelectorAll(
      isMobile ? ".carousel-places-mobile" : ".carousel-places"
    );

    const filteredPlaceElements = selectedValue
      ? document.querySelectorAll(
          allPlacesSelected.map(placeTypeClass).join(", ")
        )
      : allPlaceElements;

    allPlaceElements.forEach((place) => place.classList.add("hidden"));

    Array.from(filteredPlaceElements)
      .slice(0, visibleCount)
      .forEach((place) => place.classList.remove("hidden"));

    updateShowMoreVisibility(filteredPlaces);
    activeInputOnSelect();
  }

  /**
   * Manipula a alteração do filtro, atualizando a URL e a exibição dos lugares.
   */
  function onFilterSelectionChange() {
    const formData = new FormData(filterSelect);
    const formValues = Object.fromEntries(formData.entries());

    const selectedValues = Object.keys(formValues).join(",");
    const url = new URL(window.location.href);

    selectedValues
      ? url.searchParams.set("place", selectedValues)
      : url.searchParams.delete("place");
    url.searchParams.set("page", "1");
    window.history.pushState({}, "", url.toString());

    applyFiltersAndPaginate(selectedValues, 1);
  }

  /**
   * Sincroniza o estado do filtro e da paginação com os parâmetros da URL.
   */
  function initializeFiltersFromURL() {
    const urlParams = new URL(window.location.href).searchParams;
    const selectedValuesList = urlParams.get("place")?.split(",");
    const selectedValues = selectedValuesList?.join(",") ?? null;

    const page = parseInt(urlParams.get("page") || "1", 10);

    if (selectedValuesList) {
      selectedValuesList.forEach((selectedValue) => {
        const inputs = document.querySelectorAll(
          `#eachPlace-${selectedValue} input`
        );
        inputs.forEach((input) => {
          (input as HTMLInputElement).checked = true;
        });
      });
    }

    applyFiltersAndPaginate(selectedValues, page);
  }

  /**
   * Atualiza a visibilidade do botão "Mostrar mais" com base na quantidade de lugares filtrados.
   *
   * @param {PlaceProps[]} filteredPlaces - Lista de lugares filtrados.
   */
  function updateShowMoreVisibility(filteredPlaces: PlaceProps[]) {
    const showMoreButton = document.getElementById(`showMoreButton-${id}`);
    if (!showMoreButton) return;

    showMoreButton.classList.toggle(
      "hidden",
      visibleCount >= filteredPlaces.length
    );
  }

  /**
   * Manipula o evento de "Mostrar mais", carregando mais lugares na exibição.
   */
  function handleShowMore() {
    const filteredPlaces = filterSelect.value
      ? places.filter(({ type }) => type === filterSelect.value)
      : places;

    visibleCount += limitPerPage;

    filteredPlaces.slice(0, visibleCount).forEach(({ type }) => {
      const elements = document.querySelectorAll(
        isMobile
          ? `.place-type-mobile-${type.toLowerCase()}.hidden`
          : `.place-type-${type.toLowerCase()}.hidden`
      );
      elements.forEach((element) => {
        (element as HTMLElement).classList.remove("hidden");
      });
    });

    const url = new URL(window.location.href);
    url.searchParams.set(
      "page",
      Math.ceil(visibleCount / limitPerPage).toString()
    );
    window.history.pushState({}, "", url.toString());

    updateShowMoreVisibility(filteredPlaces);
  }

  /**
   * Abre o filtro de lugares ao clicar no botão e o fecha ao clicar fora do elemento.
   */
  function toggleAllPlaces() {
    const divFilters = document.querySelector("#filterPlacesSelect");
    const buttonFilters = document.querySelector("#filterPlacesToggleButton");
    const filterItems = document?.querySelector("#filterAllPlaces");
    if (!divFilters || !buttonFilters || !filterItems) return;

    buttonFilters.addEventListener("click", () => {
      filterItems.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
      if (!divFilters.contains(event.target as Node)) {
        filterItems.classList.add("hidden");
      }
    });
  }

  filterSelect.addEventListener("change", onFilterSelectionChange);
  document.addEventListener("popstate", initializeFiltersFromURL);

  const showMoreButton = document.getElementById(`showMoreButton-${id}`);
  if (showMoreButton) {
    showMoreButton.addEventListener("click", handleShowMore);
  }

  activeInputOnSelect();
  initializeFiltersFromURL();
  toggleAllPlaces();
}
