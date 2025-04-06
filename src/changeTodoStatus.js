import { Projects } from "./DOM.js";

export function changeTodoStatus(event) {
    const target = event.target;

    if (target.className === "checkbox") {
        const todoItemOnPage = target.parentElement;
        
        if (target.checked) {
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    project.todoItem[todoItemOnPage.dataset.indexNumber].changeStatus();
                }
            })
        } else {
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    project.todoItem[todoItemOnPage.dataset.indexNumber].changeStatus();
                }
            })
        }
    }
}