import { createProject, Projects } from "./DOM.js";
import { displayProjects } from "./displayProjects.js";
import { saveProjects } from "./storage.js";

export function addProject() {
    const newProjectDialog = document.getElementById("new-project");
    const projectNameInput = document.getElementById("project-name");
    const addProjectButton = document.getElementById("add-project");
    const closeDialog = document.getElementById("cancle-project");

    newProjectDialog.show();
 
    addProjectButton.addEventListener("click", () => {
        if (projectNameInput.value !== "") {
            createProject(projectNameInput.value);
            newProjectDialog.close();

            projectNameInput.value = "";

            displayProjects();
        }

        saveProjects(Projects)
    })

    closeDialog.addEventListener("click", () => {
        newProjectDialog.close();
    })
}