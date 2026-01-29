import { getProjects, saveProjects } from "./storage.js";
import { getActiveProject } from "./projects.js";

export function addTask(task) {
  const projects = getProjects();
  const project = projects.find(p => p.id === getActiveProject().id);

  project.tasks.push(task);
  saveProjects(projects);
}

export function deleteTask(taskId) {
  const projects = getProjects();
  const project = projects.find(p => p.id === getActiveProject().id);

  project.tasks = project.tasks.filter(t => t.id !== taskId);
  saveProjects(projects);
}

export function updateTask(updatedTask) {
  const projects = getProjects();
  const project = projects.find(p => p.id === getActiveProject().id);

  const index = project.tasks.findIndex(t => t.id === updatedTask.id);
  project.tasks[index] = updatedTask;

  saveProjects(projects);
}

export function getTasks() {
  const projects = getProjects();
  const project = projects.find(p => p.id === getActiveProject().id);
  return project?.tasks || [];
}
