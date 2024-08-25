// function to show specific form
function showForm(formToShow, forms) {
  forms.forEach((item) => item.classList.remove("active"));
  formToShow.classList.add("active");
}

// function to show specific switchButton
function showSwitchButton(buttonToShow, buttons) {
  buttons.forEach((item) => item.parentElement.classList.remove("active"));
  buttonToShow.parentElement.classList.add("active");
}

// validate form
function validateForm(form) {
  const inputs = form.querySelectorAll("input:not([type='checkbox'])");
  let isValid = true;

  inputs.forEach((input) => {
    const errorMessageElement = input.nextElementSibling;
    if (!input.value.trim()) {
      input.parentElement.classList.add("error"); // Add an error class for styling
      isValid = false;

      // show error message
      if (
        errorMessageElement &&
        errorMessageElement.classList.contains("errorMessage")
      ) {
        errorMessageElement.textContent = `${input.name} is required.`;
      }
    } else {
      input.parentElement.classList.remove("error");
      // Hide error message
      if (
        errorMessageElement &&
        errorMessageElement.classList.contains("errorMessage")
      ) {
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
      }
    }
  });

  return isValid;
}
// handle form submission
function handleFormSubmission(e, form) {
  e.preventDefault();

  if (validateForm(form)) {
    const formData = new FormData(form);
    formData.forEach((key, value) => {
      console.log(`${key}: ${value}`);
    });
    form.reset()
  } else {
    // console.log("validate failed");
  }
}

// function to initialize form switching
function initializeFormSwitching() {
  const loginForm = document.querySelector("#loginForm");
  const signupForm = document.querySelector("#singUpForm");
  const switchToSignupButton = document.querySelector("#switchToSignupButton");
  const switchToLoginButton = document.querySelector("#switchToLoginButton");

  const forms = [loginForm, signupForm];
  const buttons = [switchToSignupButton, switchToLoginButton];

  //   set initial form
  showForm(loginForm, forms);

  //   set initial button
  showSwitchButton(switchToSignupButton, buttons);

  //   attach event listeners
  switchToSignupButton.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(signupForm, forms);
    showSwitchButton(switchToLoginButton, buttons);
  });

  //   attach event listeners
  switchToLoginButton.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(loginForm, forms);
    showSwitchButton(switchToSignupButton, buttons);
  });

  loginForm.addEventListener("submit", (e) =>
    handleFormSubmission(e, loginForm)
  );
  signupForm.addEventListener("submit", (e) =>
    handleFormSubmission(e, signupForm)
  );
}

document.addEventListener("DOMContentLoaded", initializeFormSwitching);
