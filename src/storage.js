import { Project } from "./todoList.js";

export function saveProjects(projectArr) {
    localStorage.setItem("Projects", JSON.stringify(projectArr));
}

export function addSavedProjects(projectArr) {
    if (localStorage.getItem("Projects")) {
        const savedProjects = Array.from(JSON.parse(localStorage.getItem("Projects")));
        
        savedProjects.forEach((project) => {
            const newProject = new Project(project.name);
            
            if (project.isSelected === true) {
                newProject.selectProject();
            }

            projectArr.push(newProject);

            saveProjects(projectArr);

            project.todoItem.forEach((todo) => {
                newProject.createTodo(todo.title, todo.descript, todo.dueDate,
                                      todo.priority, todo.category, todo.status);
            })
        })
    }
}
