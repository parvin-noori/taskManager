import { tasks } from "./create.js";

// dynamic task list
function taskList() {
  console.log(tasks);

  const taskContainer = document.querySelector(".tab-pane.show.active");

  tasks
    .map((task) => {
      const parentDiv = document.createElement("div");
      parentDiv.className = "d-flex flex-column";

      //   create label
      const labelWrapper = document.createElement("label");
      labelWrapper.className =
        "form-check-label w-100 d-flex align-items-center";

      // create title stpa
      const Titlespan = document.createElement("span");
      Titlespan.className = "task-title d-block";
      Titlespan.textContent = task.taskName;

      //   due date span
      const dueDateSpan = document.createElement("span");
      dueDateSpan.className = "text-muted";
      dueDateSpan.textContent = "Due :" + task.dueDate;

      //   prioroty span
      const prioritySpan = document.createElement("span");
      prioritySpan.className = "priarotyLabel ms-auto rounded-pill px-3 py-1";

      //add specific priority class base it's status
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

      //create checkbox input
      const formCheckInput = document.createElement("input");
      formCheckInput.type = "checkbox";
      formCheckInput.className = "form-check-input me-3";

      formCheckInput.checked = task.completed;
      if (task.completed) {
        Titlespan.classList.add("text-decoration-line-through");
      }

      //change completed task status
      formCheckInput.addEventListener("change", () => {
        task.completed = formCheckInput.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
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
}
document.addEventListener("DOMContentLoaded", taskList());
