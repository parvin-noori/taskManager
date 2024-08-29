import { showErrorMessage, hideErrorMessage } from "./validateHelper.js";

const taskForm = document.getElementById("create-task-form");
export const backBtn = document.getElementById("backStep");
export let tasks = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

// Validate task form for duplicates
function validateTaskForm(form) {
  let isValid = true;
  const taskNameInput = form.querySelector("#taskName");
  const sanitizedTaskName = taskNameInput.value;

  // Check for duplicate task
  const isDuplicate = tasks.some((task) => task.taskName === sanitizedTaskName);

  if (isDuplicate) {
    showErrorMessage(
      taskNameInput,
      "The task with this title already exists. Please enter a unique task name."
    );
    isValid = false;
  } else {
    hideErrorMessage(taskNameInput);
  }

  return isValid;
}

//task form submission
if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //form data
    const formData = new FormData(taskForm);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
      formDataObj.completed = false;
      const sanitizedTaskName = formDataObj.taskName
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase(); // حذف فضاها و تبدیل به حروف کوچک
      formDataObj.id = sanitizedTaskName;
    });

    if (validateTaskForm(taskForm)) {
      tasks.push(formDataObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskForm.reset();
      window.location.href = "list.html";
    } else {
    }
  });
  backBtn.addEventListener(
    "click",
    (e) => handleBackBtn(e, "index"),
    taskForm.reset()
  );
}
//  handle back btn
export function handleBackBtn(e, href) {
  e.preventDefault();
  window.location.href = `${href}.html`;
}
