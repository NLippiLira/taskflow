import { getProjects, saveProjects } from "./storage.js";

let projects = [];
let activeProjectId = null;

export function loadProjects() {
  projects = getProjects();

  if (projects.length === 0) {
    const defaultProject = {
      id: crypto.randomUUID(),
      name: "Proyecto Portafolio",
      createdAt: new Date().toISOString(),
      tasks: []
    };

    projects.push(defaultProject);
    saveProjects(projects);
  }

  activeProjectId = projects[0].id;
}

export function getActiveProject() {
  return projects.find(p => p.id === activeProjectId);
}

export function updateProjects() {
  saveProjects(projects);
}
