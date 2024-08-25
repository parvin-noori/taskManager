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

// checked tasks
function CheckboxClassToggler(checkbox) {
  const targetElement = checkbox.parentElement.querySelector(".task-title");
  if (targetElement) {
    if (checkbox.checked) {
      targetElement.classList.add("text-decoration-line-through");
    } else {
      targetElement.classList.remove("text-decoration-line-through");
    }
  }
}

const checkboxes = document.querySelectorAll("input.form-check-input");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => CheckboxClassToggler(checkbox));

  CheckboxClassToggler(checkbox);
});
document.addEventListener("DOMContentLoaded", initializeFormSwitching);

function showAddTaskSection(sectionToShow, sections) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  sectionToShow.classList.add("active");
}
let tasks = [];
function initializeTaskStep() {
  const steps = document.querySelectorAll(".add-task-step");
  let currentStep = 0;

  showAddTaskSection(steps[currentStep], steps);

  const addTaskButton = document.getElementById("addNewTask");
  const taskForm = document.getElementById("create-task-form");
  const backBtn = document.getElementById("backStep");

  function prevStep(e) {
    e.preventDefault();
    currentStep--;
    showAddTaskSection(steps[currentStep], steps); // Show the next step
    taskForm.reset();
  }

  backBtn.addEventListener("click", (e) => prevStep(e));
  // //change step to add task
  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    currentStep++;
    showAddTaskSection(steps[currentStep], steps); // Show the next step
  });
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskFormData = new FormData(taskForm);
    const formDataObject = {};
    taskFormData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    tasks.push(formDataObject);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskForm.reset();
    console.log(tasks);
    currentStep++;
    showAddTaskSection(steps[currentStep], steps); // Show the next step

    const taskContainer = document.querySelector(".tab-pane.show.active");
    tasks
      .map((task) => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "d-flex flex-column";

        const labelWrapper = document.createElement("label");
        labelWrapper.className =
          "form-check-label w-100 d-flex align-items-center";

        const Titlespan = document.createElement("span");
        Titlespan.className = "task-title d-block";
        Titlespan.textContent = task.taskName;

        const dueDateSpan = document.createElement("span");
        dueDateSpan.className = "text-muted";
        dueDateSpan.textContent = "Due :" + task.dueDate;

        const prioritySpan = document.createElement("span");
        prioritySpan.className = "priarotyLabel ms-auto rounded-pill px-3 py-1";
        switch (task.priaroty) {
          case "low":
            prioritySpan.classList.add("low");
            break;
          case "high":
            prioritySpan.classList.add("high");
            break;
          case "medium":
            prioritySpan.classList.add("md");
            break;
        }

        prioritySpan.textContent = task.priaroty;

        const formCheckInput = document.createElement("input");
        formCheckInput.type = "checkbox";
        formCheckInput.className = "form-check-input me-3";
        formCheckInput.checked = task.completed;
        if (task.completed) {
          Titlespan.classList.add("text-decoration-line-through");
        }
        formCheckInput.addEventListener("change", () => {
          task.completed = formCheckInput.checked;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          console.log(task.completed);
          const taskTitle =
            formCheckInput.parentElement.querySelector(".task-title");
          if (formCheckInput.checked) {
            taskTitle.classList.add("text-decoration-line-through");
          } else {
            taskTitle.classList.remove("text-decoration-line-through");
          }
        });

        parentDiv.appendChild(Titlespan);
        parentDiv.appendChild(dueDateSpan);

        labelWrapper.appendChild(formCheckInput);
        labelWrapper.appendChild(parentDiv);
        labelWrapper.appendChild(prioritySpan);

        return labelWrapper;
      })
      .forEach((label) => {
        taskContainer.appendChild(label);
      });
  });
}

document.addEventListener("DOMContentLoaded", initializeTaskStep());
