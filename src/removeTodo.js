import { Projects } from "./DOM.js";
import { displayTodos } from "./displayTodos.js";

export function removeTodoOnPage(event) {
    const target = event.target;

    if (target.className === "remove") {
        const removeDialog = document.getElementById("remove");
        const yesButton = document.getElementById("yes");
        const noButton = document.getElementById("no");
        const todoItemIndex = target.parentElement.dataset.indexNumber;

        removeDialog.show();

        function closeDialog() {
            removeDialog.close();
            yesButton.removeEventListener("click", clickHandler);
        }
        
        function clickHandler() {
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    project.removeTodo(todoItemIndex);
                }
            })

            displayTodos();

            closeDialog();
        }

        yesButton.addEventListener("click", clickHandler);

        noButton.addEventListener("click", closeDialog);
    }
}