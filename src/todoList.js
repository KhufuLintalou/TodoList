class Todo {
    constructor(title, descript, dueDate, priority) {
        this.title = title;
        this.descript = descript;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "yet";
    }

    changeStatus() {
        if (this.status === "yet") {
            this.status = "complete";
        } else {
            this.status = "yet";
        }
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todoItem = [];
        this.isSelected = false;
    }

    createTodo(title, descript, dueDate, priority, status) {
        const newTodoItem = new Todo(title, descript, dueDate, priority, status);
        this.todoItem.push(newTodoItem);
    }

    selectProject() {
        this.isSelected = true;
    }

    deSelectProject() {
        this.isSelected = false;
    }

    removeTodo(index) {
        this.todoItem.splice(index, 1);
    }
}

export { Project };