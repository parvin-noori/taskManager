const taskForm = document.getElementById("create-task-form");
const backBtn = document.getElementById("backStep");
export let tasks = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

//task form submission
if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //form data
    const formData = new FormData(taskForm);
    const formDataObj = {};

    let index = 0;
    formData.forEach((value, key) => {
      formDataObj[key] = value;
      formDataObj.completed = false;
      formDataObj.id = `task-${index}`;
      index++; // افزایش اندیس برای تسک بعدی
    });

    function validateTaskForm(form) {
      const errorMessageElement =
        form.querySelector("#taskName").nextElementSibling;

      let isValid = true;

      // show error message
      if (
        errorMessageElement &&
        errorMessageElement.classList.contains("errorMessage")
      ) {
        errorMessageElement.parentElement.classList.add("error"); // Add an error class for styling
        errorMessageElement.textContent = `The task with this title already exists. Please enter a unique task name.`;
      } else {
        errorMessageElement.parentElement.classList.remove("error");
        // Hide error message
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
      }
      return isValid;
    }

    // check for duplicate task
    const isDuplicate = tasks.some(
      (task) => task.taskName == formDataObj.taskName
    );

    if (isDuplicate) {
      console.log("duplicate");
      validateTaskForm(taskForm);
    } else {
      tasks.push(formDataObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskForm.reset();
      window.location.href = "list.html";
    }
  });
  //  handle back btn
  function handleBackBtn(e) {
    e.preventDefault();
    taskForm.reset();
    window.location.href = "index.html";
  }

  backBtn.addEventListener("click", (e) => handleBackBtn(e));
}
