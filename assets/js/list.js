document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tasks retrieved from local storage on list page:", tasks);
  });
  