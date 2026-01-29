import { getTasks, deleteTask } from "./tasks.js";

const taskList = document.getElementById("taskList");
const pendingBadge = document.querySelector(".bg-secondary");
const doneBadge = document.querySelector(".bg-success");

export function renderTasks(tasksToRender = getTasks()) {
  taskList.innerHTML = "";

  if (tasksToRender.length === 0) {
    taskList.innerHTML = `
      <li class="list-group-item text-center text-muted">
        No hay tareas
      </li>
    `;
    updateCounters();
    return;
  }

  tasksToRender.forEach(task => {
    const badgeColor =
      task.status === "done"
        ? "success"
        : task.status === "in-progress"
        ? "warning"
        : "secondary";

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <span class="badge bg-${badgeColor} ms-2">
          ${task.status}
        </span>
        <div class="text-muted small">
          ${task.description || ""}
        </div>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-primary" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-outline-danger" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    li.querySelector(".btn-outline-danger").onclick = () => {
      deleteTask(task.id);
      renderTasks();
    };

    li.querySelector(".btn-outline-primary").onclick = () => {
      window.startEditTask(task);
    };

    taskList.appendChild(li);
  });

  updateCounters();
}

/* ---------------------------
   CONTADORES
---------------------------- */
function updateCounters() {
  const tasks = getTasks();
  pendingBadge.textContent = `Pendientes: ${tasks.filter(t => t.status === "pending").length}`;
  doneBadge.textContent = `Completadas: ${tasks.filter(t => t.status === "done").length}`;
}

/* ---------------------------
   MODAL EDICIÓN
---------------------------- */
export function openEditModal(task) {
  const modalElement = document.getElementById("taskModal");
  const modal = new bootstrap.Modal(modalElement);

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description || "";
  document.getElementById("taskStatus").value = task.status;

  modal.show();
}
