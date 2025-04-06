import { Projects } from "./DOM.js";

export function viewTodoDetails(event) {
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