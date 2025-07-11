import { Projects, updateDisplay, todoSection, getSelectedProjectIndex } from "./DOM.js";

function displayTodoCategory() {
    Projects[getSelectedProjectIndex()].todoItem.forEach((todo) => {
        const categoryOnPage = document.createElement("div");
        const categoryTitle = document.createElement("h2");

        categoryTitle.textContent = todo.category;

        categoryOnPage.className = "category";
        categoryTitle.className = "category-title";

        categoryOnPage.id = todo.category;

        categoryOnPage.appendChild(categoryTitle);

        const categoryWithIdOnPage = document.getElementById(todo.category);

        if (!categoryWithIdOnPage) {
            todoSection.appendChild(categoryOnPage);
        } else {
            categoryOnPage.remove();
        }
    })
}

export function displayTodos() {
    updateDisplay("todo");

    displayTodoCategory();

    const categoriesOnPage = document.querySelectorAll(".category");

    Projects[getSelectedProjectIndex()].todoItem.forEach((todo) => {
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

        todoItem.dataset.indexNumber = Projects[getSelectedProjectIndex()].todoItem.indexOf(todo);

        if (todo.status === "complete") {
            todoCheckBox.defaultChecked = true;

            todoItem.classList.add("complete");
        } else {
            todoCheckBox.defaultChecked = false;
        }

        todoItem.classList.add(todo.priority);

        todoItem.appendChild(todoCheckBox);
        todoItem.appendChild(todoContentWrapper);
        todoItem.appendChild(removeButton);
        todoContentWrapper.appendChild(todoTitle);
        todoContentWrapper.appendChild(todoDueDate);

        categoriesOnPage.forEach((category) => {
            if (todo.category === category.id) {
                category.appendChild(todoItem);
            }
        })
    })
}