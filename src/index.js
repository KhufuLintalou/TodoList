import * as DOM from "./DOM.js";
import { displayProjects } from "./displayProjects.js";
import { displayTodos } from "./displayTodos.js";
import { addProject } from "./addProject.js";
import { addTodo } from "./addTodo.js";
import { viewTodoDetails } from "./viewTodoDetails.js";
import { changeTodoStatus } from "./changeTodoStatus.js";
import { removeTodoOnPage } from "./removeTodo.js";

displayProjects();
displayTodos();

DOM.sidebar.addEventListener("click", (event) => {
    if (event.target.className === "project") {
        DOM.selectProjectOnClick(event);
        displayTodos();
    }
});

DOM.newProjectButton.addEventListener("click", addProject);

DOM.newTodoButton.addEventListener("click", addTodo);

DOM.todoSection.addEventListener("click", viewTodoDetails);
DOM.todoSection.addEventListener("click", changeTodoStatus);
DOM.todoSection.addEventListener("click", removeTodoOnPage);