import { Project } from "./todoList.js";
import { saveProjects } from "./storage.js";
import { displayProjects } from "./displayProjects.js";

export const Projects = [];

export function createProject(name) {
    const newProject = new Project(name);
    Projects.push(newProject);
}

export const sidebar = document.querySelector(".sidebar");
export const todoSection = document.querySelector(".todo-section");
export const newTodoButtonDiv = document.querySelector(".todo-section > div");
export const newProjectButton = document.getElementById("new-project-button");
export const newTodoButton = document.getElementById("new-todo-button");

export function updateDisplay(display) {
    switch (display) {
        case "project":
            while (newProjectButton.nextSibling) {
                newProjectButton.nextSibling.remove();
            }
            break;
        case "todo":
            while (newTodoButtonDiv.nextSibling) {
                newTodoButtonDiv.nextSibling.remove();
            }
            break;
        case "error":
            const errorMessage = document.getElementById("error");
            if (errorMessage) {
                errorMessage.remove();
            }
            break;
    } 
}

export function getSelectedProjectIndex() {
    let index;

    Projects.forEach((project) => {
        if (project.isSelected === true) {
            index = Projects.indexOf(project);
        }
    })

    return index;
}

export function selectProjectOnClick(event) {
    const target = event.target;

    if (Projects[target.dataset.indexNumber].isSelected === false) {
        Projects[getSelectedProjectIndex()].deSelectProject();

        Projects[target.dataset.indexNumber].selectProject();

        displayProjects();

        saveProjects(Projects);
    }
}
