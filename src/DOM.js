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

function updateDisplay(display) {
    switch (display) {
        case "project":
            const newProjectButton = document.querySelector("#new");
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

function testLog() {
    console.log(Projects);
}

export { displayProjects, testLog };

