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
}

document.addEventListener("DOMContentLoaded", initializeFormSwitching);
