import { loadProjects } from "./projects.js";
import { renderTasks } from "./ui.js";
import { addTask } from "./tasks.js";

const taskForm = document.getElementById("taskForm");

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  renderTasks();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const status = document.getElementById("taskStatus").value;

  if (!title) {
    alert("El título es obligatorio");
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description,
    status,
    createdAt: new Date().toISOString()
  };

  addTask(newTask);
  renderTasks();
  closeModal();
  taskForm.reset();
});


function closeModal() {
  const modalElement = document.getElementById("taskModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
}