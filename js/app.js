import { loadProjects } from "./projects.js";
import { addTask, updateTask, getTasks } from "./tasks.js";
import { renderTasks, openEditModal } from "./ui.js";

const taskForm = document.getElementById("taskForm");
const filterSelect = document.getElementById("filterStatus");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskStatus = document.getElementById("taskStatus");

let editingTaskId = null;

// 👉 Exponemos esta función para ui.js
window.startEditTask = (task) => {
  editingTaskId = task.id;
  openEditModal(task);
};

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  renderTasks();
});

/* ---------------------------
   CREAR / EDITAR TAREA
---------------------------- */
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskTitle.value.trim();
  if (!title) {
    alert("El título es obligatorio");
    return;
  }

  const taskData = {
    id: editingTaskId || crypto.randomUUID(),
    title,
    description: taskDescription.value.trim(),
    status: taskStatus.value,
    createdAt: new Date().toISOString()
  };

  if (editingTaskId) {
    updateTask(taskData);
  } else {
    addTask(taskData);
  }

  editingTaskId = null;
  taskForm.reset();
  closeModal();
  renderTasks();
});

/* ---------------------------
   FILTRO POR ESTADO
---------------------------- */
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  const tasks = getTasks();

  const filtered =
    value === "all"
      ? tasks
      : tasks.filter(task => task.status === value);

  renderTasks(filtered);
});

/* ---------------------------
   CERRAR MODAL (UX PRO)
---------------------------- */
function closeModal() {
  const modalElement = document.getElementById("taskModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
}
