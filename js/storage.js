export const PROJECTS_KEY = "taskflow-projects";
export const ACTIVE_PROJECT_KEY = "taskflow-active-project";

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getProjects() {
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveActiveProject(id) {
  localStorage.setItem(ACTIVE_PROJECT_KEY, id);
}

export function getActiveProjectId() {
  return localStorage.getItem(ACTIVE_PROJECT_KEY);
}
