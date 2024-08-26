const taskForm = document.getElementById("create-task-form");
const backBtn = document.getElementById("backStep");
export let tasks = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

//task form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //form data
  const formData = new FormData(taskForm);
  const formDataObj = {};

  formData.forEach((value, key) => {
    formDataObj[key] = value;
    formDataObj.completed = false;
  });

  tasks.push(formDataObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();

  window.location.href = "list.html";
});

//  handle back btn
function handleBackBtn(e) {
  e.preventDefault();
  taskForm.reset();
  window.location.href = "index.html";
}

backBtn.addEventListener("click", (e) => handleBackBtn(e));
