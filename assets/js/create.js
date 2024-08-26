const taskForm = document.getElementById("create-task-form");
const backBtn = document.getElementById("backStep");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//tak form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const formDataObj = {};

  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  tasks.push(formDataObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks stored in local storage:", JSON.parse(localStorage.getItem("tasks")));
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
