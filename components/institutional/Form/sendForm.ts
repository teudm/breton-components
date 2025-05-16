export function sendForm(
  entityName: string,
  formId?: string,
  formContainerId?: string,
  formSuccessMessageId?: string,
  formErrorMessageId?: string
) {
  const form = document.getElementById(formId || "institutionalForm") as HTMLFormElement;
  if (!form) return;

  const standardForm = document.getElementById(formContainerId || "institutionalFormBase");

  const showError = () => {
    const errorMessage = document.getElementById(formErrorMessageId || "institutionalFormError");
    errorMessage?.classList.remove("hidden");
    errorMessage?.classList.add("flex");
    standardForm?.classList.add("hidden");

    setTimeout(() => {
      errorMessage?.classList.add("hidden");
      errorMessage?.classList.remove("flex");
      standardForm?.classList.remove("hidden");
    }, 5000);
  };

  const showSuccess = () => {
    const successMessage = document.getElementById(formSuccessMessageId || "institutionalFormSuccess");
    successMessage?.classList.remove("hidden");
    successMessage?.classList.add("flex");
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopPropagation();

    if (!window.STOREFRONT.USEFUL.validateForm(form)) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());
    const body = JSON.stringify(formEntries);
    const status = await window.STOREFRONT.USEFUL.sendData(body, entityName);

    standardForm?.classList.add("hidden");

    if (status === 201) {
      showSuccess();
    } else {
      showError();
    }
  });
}
