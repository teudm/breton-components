import { CollectionProps, ProductsProps } from "../../types.ts";

/**
 * Obtém e exibe produtos ou coleções ao torná-los visíveis na tela.
 *
 * @param {ProductsProps | CollectionProps} products - Dados dos produtos ou da coleção.
 * @param {string} id - Identificador do elemento HTML associado.
 */
export function getProducts(
  products: ProductsProps | CollectionProps,
  id: string
) {
  /**
   * Aciona um callback quando um elemento torna-se visível na tela.
   *
   * @param {string} id - Identificador do elemento observado.
   * @param {() => void} callback - Função a ser executada quando visível.
   */
  function triggerOnVisibility(id: string, callback: () => void) {
    const element = document.getElementById(id);
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      });

      observer.observe(element);
    }
  }

  /**
   * Faz uma requisição para buscar produtos ou coleções da API.
   *
   * @param {string} apiName - Nome do endpoint da API.
   * @param {string} searchKey - Chave de busca.
   * @param {string} searchVariable - Valor da chave de busca.
   * @returns {Promise<any>} Resposta da API em formato JSON.
   */
  async function getProductsRequest(
    apiName: string,
    searchKey: string,
    searchVariable: string
  ) {
    try {
      const response = await fetch(`/api/${apiName}?${searchKey}=${searchVariable}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error(`Error getting ${searchKey}`, error);
    }
  }

  triggerOnVisibility(id, async () => {
    if ("collectionId" in products) {
      const { collectionId } = products;
      const response = await getProductsRequest("collection", "collectionId", collectionId);
      mountProducts(response, id);
      return response;
    }

    if ("productIds" in products) {
      const { productIds } = products;
      const stringOfproductIds = productIds.join(",");
      const response = await getProductsRequest("productsInfos", "products", stringOfproductIds);
      mountProducts(response, id);
      return response;
    }
  });

  /**
   * Atualiza o estado do botão de lista de desejos quando o produto é carregado.
   *
   * @param {HTMLButtonElement} button - Botão de lista de desejos.
   * @param {string} productID - Identificador do produto.
   */
  function onLoad(button: HTMLButtonElement, productID: string) {
    window.STOREFRONT.WISHLIST.subscribe((sdk) => {
      const inWishlist = sdk.inWishlist(productID);
      button.disabled = false;
      button.classList.remove("htmx-request");
      button.querySelector("svg")?.setAttribute("fill", inWishlist ? "black" : "none");
    });
  }

  /**
   * Manipula o clique no botão de lista de desejos.
   *
   * @param {string} productID - Identificador do produto.
   */
  function handleClick(productID: string) {
    const button = event?.currentTarget as HTMLButtonElement;
    const user = window.STOREFRONT.USER.getUser();
    if (user?.email) {
      button.classList.add("htmx-request");
      window.STOREFRONT.WISHLIST.toggle(productID, "");
    } else {
      window.alert(`Please login to add the product to your wishlist`);
    }
  }

  /**
   * Renderiza os produtos no DOM.
   *
   * @param {Array<{productName: string, productId: string, items: [{images: [{imageUrl: string, imageLabel: string}]}], Designer?: string[]}>} products - Lista de produtos.
   * @param {string} id - Identificador do container dos produtos.
   */
  function mountProducts(
    products: [
      {
        productName: string;
        productId: string;
        items: [{ images: [{ imageUrl: string; imageLabel: string }] }];
        Designer?: string[];
      }
    ],
    id: string
  ) {
    const productCard = document.getElementById(`productCard-${id}`);
    if (!productCard) return;

    const productCardChildrens = Array.from(productCard.children);
    if (!productCardChildrens.length) return;

    productCardChildrens.forEach((child, index) => {
      const productTitle = child.querySelector(".product-title");
      const productAuthor = child.querySelector(".product-author");
      const productImage = child.querySelector(".product-img");
      if (!productTitle || !productAuthor || !productImage) return;

      const { productName, items, Designer, productId } = products[index];

      productTitle.textContent = productName;
      productImage.setAttribute("src", items?.[0].images?.[0].imageUrl);
      productImage.setAttribute("alt", items?.[0].images?.[0].imageLabel);

      if (Designer) {
        productAuthor.textContent = "By " + Designer.join(", ");
      }

      const wishListBtn: HTMLButtonElement | null = child.querySelector(".wishListButton");
      if (wishListBtn) {
        wishListBtn.setAttribute("data-product-id", productId);
        wishListBtn.addEventListener("click", () => handleClick(productId));
        wishListBtn.addEventListener("load", () => onLoad(wishListBtn, productId));
      }
    });
  }
}