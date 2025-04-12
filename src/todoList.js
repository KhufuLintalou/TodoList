import { saveProjects } from "./storage.js";
import { Projects } from "./DOM.js";

class Todo {
    constructor(title, descript, dueDate, priority, category, status) {
        this.title = title;
        this.descript = descript;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.category = category;
    }

    changeStatus() {
        if (this.status === "yet") {
            this.status = "complete";
        } else {
            this.status = "yet";
        }

        saveProjects(Projects);
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todoItem = [];
        this.isSelected = false;
    }

    createTodo(title, descript, dueDate, priority, category, status) {
        const newTodoItem = new Todo(title, descript, dueDate, priority, category, status);
        this.todoItem.push(newTodoItem);

        saveProjects(Projects);
    }

    selectProject() {
        this.isSelected = true;
    }

    deSelectProject() {
        this.isSelected = false;
    }

    removeTodo(index) {
        this.todoItem.splice(index, 1);

        saveProjects(Projects);
    }
}

export { Project };