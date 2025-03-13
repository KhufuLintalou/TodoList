"use strict";

class Todo {
    constructor(title, descript, dueDate, priority, status) {
        this.title = title;
        this.descript = descript;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    changeStatus() {
        if (this.status === "yet") {
            this.status = "complete";
        } else {
            this.status = "yet";
        }
    }

    changePriority(num) {
        this.priority = num;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todoItem = [];
    }

    createTodo(title, descript, dueDate, priority, status) {
        const newTodoItem = new Todo(title, descript, dueDate, priority, status);
        this.todoItem.push(newTodoItem);
    }
}

export { Todo, Project };