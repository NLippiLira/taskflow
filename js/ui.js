import { getTasks, deleteTask } from "./tasks.js";

const taskList = document.getElementById("taskList");

export function renderTasks() {
  taskList.innerHTML = "";

  const tasks = getTasks();

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <li class="list-group-item text-center text-muted">
        No hay tareas aún
      </li>
    `;
    return;
  }

  tasks.forEach(task => {
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
        <div class="text-muted small">${task.description || ""}</div>
      </div>
      <button class="btn btn-sm btn-danger">
        <i class="bi bi-trash"></i>
      </button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      deleteTask(task.id);
      renderTasks();
    });

    taskList.appendChild(li);
  });
}
