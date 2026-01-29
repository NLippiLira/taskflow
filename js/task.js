import { getActiveProject, updateProjects } from "./projects.js";

export function addTask(task) {
  const project = getActiveProject();
  project.tasks.push(task);
  updateProjects();
}

export function deleteTask(taskId) {
  const project = getActiveProject();
  project.tasks = project.tasks.filter(t => t.id !== taskId);
  updateProjects();
}

export function updateTask(updatedTask) {
  const project = getActiveProject();
  const index = project.tasks.findIndex(t => t.id === updatedTask.id);
  project.tasks[index] = updatedTask;
  updateProjects();
}

export function getTasks() {
  return getActiveProject().tasks;
}
