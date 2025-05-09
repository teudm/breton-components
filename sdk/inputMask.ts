export function maskPhone() {
  const phoneInputs = document.querySelectorAll("input[type=tel]");
  phoneInputs.forEach(input => {
    input.addEventListener("input", event => {
      let inputValue = (event.target as HTMLInputElement).value.trim();
      inputValue = inputValue.replace(/\D/g, "");

      if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
      }

      inputValue =
        inputValue.length < 11
          ? inputValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
          : inputValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

      (event.target as HTMLInputElement).value = inputValue;
    });
  });
}