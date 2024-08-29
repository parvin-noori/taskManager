export function showErrorMessage(input, message) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.parentElement.classList.add("error");
  errorMessageElement.textContent = message;
}

export function hideErrorMessage(input) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.parentElement.classList.remove("error");
  errorMessageElement.textContent = "";
}

// validate form
export function validateForm(form) {
  const inputs = form.querySelectorAll("input:not([type='checkbox'])");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      showErrorMessage(input, `${input.name} is required.`);
    } else {
      hideErrorMessage(input);
      isValid = true;
    }
  });

  return isValid;
}
