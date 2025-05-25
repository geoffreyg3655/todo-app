const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
});

// Add task on button click
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  addTaskToDOM(taskText, false);
  saveTasks();
  taskInput.value = "";
});

function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) {
    li.classList.add("completed");
  }

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.style.marginLeft = "10px";
  removeBtn.style.background = "none";
  removeBtn.style.border = "none";
  removeBtn.style.cursor = "pointer";

  removeBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Save all tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear all tasks
const clearAllBtn = document.getElementById("clear-all");

clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});
