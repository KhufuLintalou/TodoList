import { getCurrentDate } from "./Date.js";
import { updateDisplay, Projects, getSelectedProjectIndex } from "./DOM.js";
import { displayTodos } from "./displayTodos.js";

const newTodoDialog = document.getElementById("new-todo");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const dateInput = document.getElementById("dueDate");
const prioritySelect = document.getElementById("priority");
const addTodoButton = document.getElementById("add-todo");
const cancelButton = document.getElementById("cancel-todo");
const categoryInput = document.getElementById("category");

export function addTodo() {
    const formattedCurrentDate = getCurrentDate();

    dateInput.min = formattedCurrentDate;

    updateDisplay("error");
    newTodoDialog.show();

    function clearInputs() {
        const inputs = document.querySelectorAll("#new-todo input");

        inputs.forEach((input) => {
            if (input.id !== "category") {
                input.value = "";
            }
        })
    }

    addTodoButton.addEventListener("click", () => {
        if (titleInput.value === "") {
            updateDisplay("error");

            const errorMessage = document.createElement("div");
            errorMessage.textContent = "*You need to fill in the Title."
            errorMessage.id = "error";

            newTodoDialog.appendChild(errorMessage);
        } else {
            if (categoryInput.value === "") {
                categoryInput.value = "General";
            }

            Projects[getSelectedProjectIndex()].createTodo(titleInput.value, descInput.value, dateInput.value,
                                                           prioritySelect.value, categoryInput.value, "yet");

            displayTodos();
            
            clearInputs();

            newTodoDialog.close();
        }
    })

    cancelButton.addEventListener("click", () => {
        newTodoDialog.close();
    })
}