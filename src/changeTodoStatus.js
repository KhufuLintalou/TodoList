import { Projects, getSelectedProjectIndex } from "./DOM.js";

export function changeTodoStatus(event) {
    const target = event.target;

    if (target.className === "checkbox") {
        const checkboxTodoItem = target.parentElement;
        
        function changeTodoItemStatus() {
            Projects[getSelectedProjectIndex()].todoItem[checkboxTodoItem.dataset.indexNumber].changeStatus();
        }

        if (target.checked) {
            changeTodoItemStatus();
        } else {
            changeTodoItemStatus();
        }
    }
}