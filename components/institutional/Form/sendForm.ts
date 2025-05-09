export function sendForm(entityName: string) {
  const form = document.getElementById("institutionalForm");
  if (!form) return;

  const standardForm = document.getElementById("institutionalFormBase");

  const showError = () => {
    const errorMessage = document.getElementById("institutionalFormError");
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
    const successMessage = document.getElementById("institutionalFormSuccess");
    successMessage?.classList.remove("hidden");
    successMessage?.classList.add("flex");
  };

  const validateValues = (form: HTMLElement) => {
    const regexPhone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (const child of Array.from(form.children)) {
      const type = (child as HTMLElement).getAttribute("data-type");
      const input = (child as HTMLElement).querySelector("input");
      const value = input?.value;
      if (
        (type === "tel" && !value?.match(regexPhone)) ||
        (type === "email" && !value?.match(regexEmail))
      ) {
        input?.setAttribute("data-invalid", "true");
        input?.classList.add("invalid");
        form.scrollIntoView();
        return false;
      } else {
        input?.setAttribute("data-invalid", "false");
        input?.classList.remove("invalid");
      }
    }

    return true;
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    if (!validateValues(form)) return;

    let status;

    try {
      const response = await fetch(`/api/document?entityName=${entityName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEntries),
      });

      status = response.status;
    } catch (error) {
      console.error("Error creating document", error);
    }

    standardForm?.classList.add("hidden");

    if (status === 201) {
      showSuccess();
    } else {
      showError();
    }
  });
}