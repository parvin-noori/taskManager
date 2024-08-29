import { validateForm } from "./validateHelper.js";

// function to show specific form
function showForm(formToShow, forms) {
  forms.forEach((item) => item.classList.remove("active"));
  formToShow.classList.add("active");
  formToShow.reset();
}

// function to show specific switchButton
function showSwitchButton(buttonToShow, buttons) {
  buttons.forEach((item) => item.parentElement.classList.remove("active"));
  buttonToShow.parentElement.classList.add("active");
}

// handle form submission
function handleFormSubmission(e, form) {
  e.preventDefault();
  if (validateForm(form)) {
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    form.reset();
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

  const forms = [];
  const buttons = [];

  // Add forms to array if they exist
  if (loginForm) forms.push(loginForm);
  if (signupForm) forms.push(signupForm);

  // Add buttons to array if they exist
  if (switchToSignupButton) buttons.push(switchToSignupButton);
  if (switchToLoginButton) buttons.push(switchToLoginButton);

  // Show initial form and button
  if (loginForm && switchToSignupButton) {
    showForm(loginForm, forms);
    showSwitchButton(switchToSignupButton, buttons);
  }

  //   attach event listeners
  if (switchToSignupButton && signupForm) {
    switchToSignupButton.addEventListener("click", (e) => {
      e.preventDefault();
      showForm(signupForm, forms);
      showSwitchButton(switchToLoginButton, buttons);
    });
  }

  if (switchToLoginButton && loginForm) {
    switchToLoginButton.addEventListener("click", (e) => {
      e.preventDefault();
      showForm(loginForm, forms);
      showSwitchButton(switchToSignupButton, buttons);
    });
  }
  if (loginForm) {
    loginForm.addEventListener("submit", (e) =>
      handleFormSubmission(e, loginForm)
    );
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) =>
      handleFormSubmission(e, signupForm)
    );
  }
}

document.addEventListener("DOMContentLoaded", initializeFormSwitching);
