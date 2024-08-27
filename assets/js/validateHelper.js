export function showErrorMessage(input, message) {
  const errorMessageElement = input.nextElementSibling;

  if (
    errorMessageElement &&
    errorMessageElement.classList.contains("errorMessage")
  ) {
    errorMessageElement.parentElement.classList.add("error");
    errorMessageElement.textContent = message;
  }
}

export function hideErrorMessage(input) {
  const errorMessageElement = input.nextElementSibling;
  if (
    errorMessageElement &&
    errorMessageElement.classList.contains("errorMessage")
  ) {
    errorMessageElement.parentElement.classList.remove("error");
    errorMessageElement.textContent = "";
  }
}

export function validateForm(input) {
  if (!input.value.trim()) {
    showErrorMessage(input, `${input.name} is required.`);
    return false;
  }
  hideErrorMessage(input);
  return true;
}
