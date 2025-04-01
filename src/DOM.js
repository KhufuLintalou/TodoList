import { Project } from "./todoList.js";
import { getCurrentDate } from "./Date.js";

const Projects = [];

function createProject(name) {
    const newProject = new Project(name);
    Projects.push(newProject);
}

createProject("My Project");
Projects[0].createTodo("test", "this is for testing", "implement later", 3);
Projects[0].selectProject();

const sidebar = document.querySelector(".sidebar");
const todoSection = document.querySelector(".todo-section");
const newTodoButtonDiv = document.querySelector(".todo-section > div");
const newProjectButton = document.getElementById("new-project-button");
const newTodoButton = document.getElementById("new-todo-button");

function updateDisplay(display) {
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

function displayProjects() {
    updateDisplay("project");

    Projects.forEach((project) => {
        const projectDisplay = document.createElement("button");
        projectDisplay.textContent = project.name;
        projectDisplay.className = "project";
        projectDisplay.dataset.indexNumber = Projects.indexOf(project);

        sidebar.appendChild(projectDisplay);
    })
}

function displayTodos() {
    Projects.forEach((project) => {
        if (project.isSelected === true) {
            updateDisplay("todo");

            project.todoItem.forEach((todo) => {
                const todoItem = document.createElement("div");
                const todoTitle = document.createElement("h3");
                const todoDueDate = document.createElement("div");
                const todoContentWrapper = document.createElement("div");
                const todoCheckBox = document.createElement("input");

                todoTitle.textContent = todo.title;
                todoDueDate.textContent = todo.dueDate.replace("T", " | ");

                todoItem.className = "todo-item";
                todoContentWrapper.className = "todo-content";
                todoCheckBox.className = "checkbox";

                todoCheckBox.type = "checkbox";

                todoItem.dataset.indexNumber = project.todoItem.indexOf(todo);

                if (todo.status === "complete") {
                    todoCheckBox.defaultChecked = true;
                } else {
                    todoCheckBox.defaultChecked = false;
                }

                todoSection.appendChild(todoItem);
                todoItem.appendChild(todoCheckBox);
                todoItem.appendChild(todoContentWrapper);
                todoContentWrapper.appendChild(todoTitle);
                todoContentWrapper.appendChild(todoDueDate);
            })
        }
    })
}

function selectProjectOnClick(event) {
    const target = event.target;

    if (Projects[target.dataset.indexNumber].isSelected === false) {
        Projects.forEach((project) => {
            if (project.isSelected === true) {
                project.deSelectProject();
            }
        })

        Projects[target.dataset.indexNumber].selectProject();
    }
}

sidebar.addEventListener("click", (event) => {
    if (event.target.className === "project") {
        selectProjectOnClick(event);
        displayTodos();
    }
});

function addProject() {
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
    })

    closeDialog.addEventListener("click", () => {
        newProjectDialog.close();
    })
}

newProjectButton.addEventListener("click", addProject);

function addTodo() {
    const newTodoDialog = document.getElementById("new-todo");
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("desc");
    const dateInput = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("priority");
    const addTodoButton = document.getElementById("add-todo");
    const cancelButton = document.getElementById("cancel-todo");
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
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    project.createTodo(titleInput.value, descInput.value, dateInput.value,
                                       prioritySelect.value);
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

newTodoButton.addEventListener("click", addTodo);

function viewTodoDetails(event) {
    const target = event.target;

    if (target.className === "todo-item") {
        const detailsDialog = document.getElementById("todo-detail");
        const titleDetails = document.getElementById("title-detail");
        const descDetails = document.getElementById("desc-detail");
        const dueDateDetails = document.getElementById("dueDate-detail");
        const priorityDetails = document.getElementById("priority-detail");
        const applyButton = document.getElementById("apply");
        const cancelButton = document.getElementById("cancel-detail");

        detailsDialog.dataset.indexNumber = target.dataset.indexNumber;

        Projects.forEach((project) => {
            if (project.isSelected === true) {
                const todoItem = project.todoItem[detailsDialog.dataset.indexNumber];

                titleDetails.value = todoItem.title;
                descDetails.value = todoItem.descript;
                dueDateDetails.value = todoItem.dueDate;
                priorityDetails.value = todoItem.priority;
            }
        })

        detailsDialog.showModal();

        applyButton.addEventListener("click", () => {
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    const todoItem = project.todoItem[detailsDialog.dataset.indexNumber];

                    todoItem.title = titleDetails.value;
                    todoItem.descript = descDetails.value;
                    todoItem.dueDate = dueDateDetails.value;
                    todoItem.priority = priorityDetails.value;
                }
            })

            displayTodos();

            detailsDialog.close()
        })

        cancelButton.addEventListener("click", () => {
            detailsDialog.close();
        })
    }
}

function changeTodoStatus(event) {
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

todoSection.addEventListener("click", viewTodoDetails);
todoSection.addEventListener("click", changeTodoStatus);

    
function testLog() {
    console.log(Projects);
}

export { displayProjects, testLog, displayTodos };

