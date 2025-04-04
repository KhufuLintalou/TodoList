import { Project } from "./todoList.js";
import { getCurrentDate } from "./Date.js";

const Projects = [];

function createProject(name) {
    const newProject = new Project(name);
    Projects.push(newProject);
}

createProject("My Project");
Projects[0].createTodo("test", "this is for testing", "implement later", 3, "TEST");
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
                const removeButton = document.createElement("button");

                todoTitle.textContent = todo.title;
                todoDueDate.textContent = todo.dueDate.replace("T", " | ");
                removeButton.textContent = "x";

                todoItem.className = "todo-item";
                todoContentWrapper.className = "todo-content";
                todoCheckBox.className = "checkbox";
                removeButton.className = "remove";

                todoCheckBox.type = "checkbox";

                todoItem.dataset.indexNumber = project.todoItem.indexOf(todo);

                if (todo.status === "complete") {
                    todoCheckBox.defaultChecked = true;
                } else {
                    todoCheckBox.defaultChecked = false;
                }

                todoItem.appendChild(todoCheckBox);
                todoItem.appendChild(todoContentWrapper);
                todoItem.appendChild(removeButton);
                todoContentWrapper.appendChild(todoTitle);
                todoContentWrapper.appendChild(todoDueDate);

                const categories = [];

                if (!categories.includes(todo.category)) {
                    categories.push(todo.category);
                }

                categories.forEach((category) => {
                    const categoryOnPage = document.createElement("div");
                    const categoryTitle = document.createElement("h2");

                    categoryTitle.textContent = category;

                    categoryOnPage.className = "category";
                    categoryTitle.className = "category-title";
                        
                    categoryOnPage.id = category;
                    
                    categoryOnPage.appendChild(categoryTitle);

                    const categoryWithIdOnPage = document.getElementById(category); 
                    
                    if (!categoryWithIdOnPage) {
                        todoSection.appendChild(categoryOnPage);
                    } else {
                        categoryOnPage.remove();
                    }
                })

                const categoriesOnPage = document.querySelectorAll(".category");

                categoriesOnPage.forEach((category) => {
                    if (todo.category === category.id) {
                        category.appendChild(todoItem);
                    }
                })               
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
        const categoryDetails = document.getElementById("category-detail");
        const todoItemIndex = target.dataset.indexNumber;

        Projects.forEach((project) => {
            if (project.isSelected === true) {
                const todoItem = project.todoItem[todoItemIndex];

                titleDetails.value = todoItem.title;
                descDetails.value = todoItem.descript;
                dueDateDetails.value = todoItem.dueDate;
                priorityDetails.value = todoItem.priority;
                categoryDetails.value = todoItem.category;
            }
        })

        detailsDialog.showModal();

        function closeDialog() {
            detailsDialog.close();
            applyButton.removeEventListener("click", clickHandler);
        }

        function clickHandler() {
            Projects.forEach((project) => {
                if (project.isSelected === true) {
                    const todoItem = project.todoItem[todoItemIndex];

                    todoItem.title = titleDetails.value;
                    todoItem.descript = descDetails.value;
                    todoItem.dueDate = dueDateDetails.value;
                    todoItem.priority = priorityDetails.value;
                    todoItem.category = categoryDetails.value;
                }
            })

            displayTodos();

            closeDialog()
        }

        applyButton.addEventListener("click", clickHandler);

        cancelButton.addEventListener("click", closeDialog);
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

function removeTodoOnPage(event) {
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

todoSection.addEventListener("click", viewTodoDetails);
todoSection.addEventListener("click", changeTodoStatus);
todoSection.addEventListener("click", removeTodoOnPage);

    
function testLog() {
    console.log(Projects);
}

export { displayProjects, testLog, displayTodos };

