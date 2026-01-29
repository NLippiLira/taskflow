import { loadProjects } from "./projects.js";
import { renderTasks } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  renderTasks();
});
