import { getCurrentDate } from "./Date.js";
import { updateDisplay } from "./DOM.js";
import { Projects } from "./DOM.js";
import { displayTodos } from "./displayTodos.js";

export function addTodo() {
    const newTodoDialog = document.getElementById("new-todo");
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("desc");
    const dateInput = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("priority");
    const addTodoButton = document.getElementById("add-todo");
    const cancelButton = document.getElementById("cancel-todo");
    const categoryInput = document.getElementById("category");
    const formattedCurrentDate = getCurrentDate();

    dateInput.min = formattedCurrentDate;

    updateDisplay("error");
    newTodoDialog.show();

    function inputCheck() {
        if (titleInput.value === "" || descInput.value === ""
            || dateInput.value === formattedCurrentDate) {
            return true;
        } else {
            return false;
        }
    }

    function clearInputs() {
        const inputs = document.querySelectorAll("#new-todo input");

        inputs.forEach((input) => {
            input.value = "";
        })
    }

    addTodoButton.addEventListener("click", () => {
        if (inputCheck()) {
            updateDisplay("error");

            const errorMessage = document.createElement("div");
            errorMessage.textContent = "You need to fill in all the fields."
            errorMessage.id = "error";

            newTodoDialog.appendChild(errorMessage);
        } else {
            if (categoryInput.value === "") {
                categoryInput.value = "General";
            }

            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    project.createTodo(titleInput.value, descInput.value, dateInput.value,
                                       prioritySelect.value, categoryInput.value);
                }
            })

            displayTodos();
            clearInputs();
            
            newTodoDialog.close();
        }
    })

    cancelButton.addEventListener("click", () => {
        newTodoDialog.close();
    })
}