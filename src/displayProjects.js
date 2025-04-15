import { Projects, updateDisplay, sidebar } from "./DOM.js";

export function displayProjects() {
    updateDisplay("project");

    Projects.forEach((project) => {
        const projectDisplay = document.createElement("button");
        projectDisplay.textContent = project.name;
        projectDisplay.className = "project";
        projectDisplay.dataset.indexNumber = Projects.indexOf(project);

        if (project.isSelected === true) {
            projectDisplay.classList.add("selected");
        }

        sidebar.appendChild(projectDisplay);
    })
}