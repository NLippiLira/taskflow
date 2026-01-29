import {
  getProjects,
  saveProjects,
  saveActiveProject,
  getActiveProjectId
} from "./storage.js";

export function loadProjects() {
  let projects = getProjects();

  if (projects.length === 0) {
    const defaultProject = {
      id: crypto.randomUUID(),
      name: "Proyecto Portafolio",
      createdAt: new Date().toISOString(),
      tasks: []
    };

    projects = [defaultProject];
    saveProjects(projects);
    saveActiveProject(defaultProject.id);
  }

  if (!getActiveProjectId()) {
    saveActiveProject(projects[0].id);
  }
}

export function getActiveProject() {
  const projects = getProjects();
  const activeId = getActiveProjectId();

  return projects.find(p => p.id === activeId);
}
