import { Project } from "./todoList.js";

const Projects = [];

function createProject(name) {
    const newProject = new Project(name);
    Projects.push(newProject);
}

createProject("My Project");
Projects[0].createTodo("test", "this is for testing", "implement later", 3, "");

const sidebar = document.querySelector(".sidebar");
const todoSection = document.querySelector(".todo-section");
const newTodo = document.querySelector(".new-todo");
const newProjectButton = document.querySelector("#new");

function updateDisplay(display) {
    switch (display) {
        case "project":
            while (newProjectButton.nextSibling) {
                newProjectButton.nextSibling.remove();
            }
            break;
        case "todo":
            while (newTodo.nextSibling) {
                newTodo.nextSibling.remove();
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

function displayTodos(event) {
    const target = event.target;

    if (target.className === "project") {
        updateDisplay("todo");

        const clickedProjectIndex = target.dataset.indexNumber;

        Projects[clickedProjectIndex].todoItem.forEach((item) => {
            const todoItem = document.createElement("div");
            const todoTitle = document.createElement("h3");
            const todoDueDate = document.createElement("div");

            todoTitle.textContent = item.title;
            todoDueDate.textContent = item.dueDate;

            todoItem.className = "todo-item";

            todoSection.appendChild(todoItem);
            todoItem.appendChild(todoTitle);
            todoItem.appendChild(todoDueDate);
        })
    }
}

sidebar.addEventListener("click", displayTodos);

function addProject() {
    const newProjectDialog = document.querySelector(".new-project");
    const projectNameInput = document.querySelector("#project-name");
    const addProjectButton = document.querySelector(".add-project");
    const closeDialog = document.querySelector(".close");

    newProjectDialog.show();
 
    addProjectButton.addEventListener("click", () => {
        if (projectNameInput.value !== "") {
            createProject(projectNameInput.value);
            newProjectDialog.close();
        }

        projectNameInput.value = "";

        displayProjects();
    })

    closeDialog.addEventListener("click", () => {
        newProjectDialog.close();
    })
}

newProjectButton.addEventListener("click", addProject);
    
function testLog() {
    console.log("");
}

export { displayProjects, testLog };

