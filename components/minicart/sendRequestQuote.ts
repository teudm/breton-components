export function sendRequestQuote() {
  const form = document.getElementById("product-quote-form") as HTMLFormElement;
  if (!form) return;

  const standardForm = document.getElementById("product-quote-container");

  const showError = () => {
    const errorMessage = document.getElementById("product-quote-form-error-message");
    errorMessage?.classList.remove("hidden");
    errorMessage?.classList.add("flex");
    standardForm?.classList.add("hidden");

    setTimeout(() => {
      errorMessage?.classList.add("hidden");
      errorMessage?.classList.remove("flex");
      standardForm?.classList.remove("hidden");
    }, 3000);
  };

  const showSuccess = () => {
    const successMessage = document.getElementById("product-quote-form-success-message");
    successMessage?.classList.remove("hidden");
    successMessage?.classList.add("flex");
  };

  
  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopPropagation();
    if (!window.STOREFRONT.USEFUL.validateForm(form)) return;
    
    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());
    formEntries["contact-preference"] = formData.getAll("contact-preference");
    const { items } = JSON.parse(
      decodeURIComponent(formEntries["products-quote"])
    );
    // deno-lint-ignore no-explicit-any
    const products = items.map((item: any) => {
      return {
        id: item.item_group_id,
        sku: item.item_id,
        name: `${item.alternateName || item.item_name}`,
        colecao: item.collection,
        qtd: item.quantity
      }
    });
    const jsonBody = {
      name: formEntries["name"],
      email: formEntries["email"],
      phone: formEntries["phone"],
      destination: formEntries["product-for"],
      products,
      "contact_modes": formEntries["contact-preference"],
      observations: formEntries["observations"]
    }
    const body = JSON.stringify(jsonBody);
    const status = await window.STOREFRONT.USEFUL.sendData(body, "OR");

    standardForm?.classList.add("hidden");

    if (status === 201) {
      showSuccess();
      setTimeout(() => {
        window.STOREFRONT.CART.cleanCart();
        const modalStillOpen = document.querySelector<HTMLInputElement>("#product-quote")?.checked;
        const cartStillOpen = document.querySelector<HTMLInputElement>("#minicart-drawer")?.checked;
        modalStillOpen && document.querySelector<HTMLElement>("label[for='product-quote']")?.click();
        cartStillOpen && document.querySelector<HTMLElement>("label[for='minicart-drawer']")?.click();
      }, 3000);
    } else {
      showError();
    }
  });
}