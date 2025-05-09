/**
 * Alterna a rotação de uma seta dentro de um elemento específico ao clicar e remove a rotação ao perder o foco.
 *
 * @param {string} selectClass - O ID do elemento botão que contém a seta.
 */
export function rotateArrow(selectClass: string) {
  const button = document.getElementById(selectClass);
  const arrow = document.querySelector(`#${selectClass} .selectCustomAfter`);
  const divTarget = document.getElementById("filterPlacesSelect");
  if (!arrow || !button) return;

  /**
   * Manipula o evento de clique para alternar a rotação da seta.
   */
  button.addEventListener("click", () => {
    arrow.classList.toggle("rotate");
  });

  // /**
  //  * Manipula o evento de perda de foco para remover a rotação da seta.
  //  */
  document.addEventListener("click", (event) => {
    if (divTarget && !divTarget.contains(event.target as Node)) {
      arrow.classList.remove("rotate");
    }
  });
}
