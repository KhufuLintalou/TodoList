import { Projects, updateDisplay, todoSection, getSelectedProjectIndex } from "./DOM.js";

export function displayTodos() {
    updateDisplay("todo");

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