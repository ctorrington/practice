document.addEventListener("DOMContentLoaded", () => {

    // Document elements.
    let new_task_input = document.getElementById('new_task_input');
    let new_task_form = document.getElementById('new_task_form');

    // Variables.
    let taskList = [];


    // Event listeners.

    // Prevent default form behaviour.
    new_task_form.addEventListener("submit", (e) => {
        e.preventDefault();
    })

    // Handle enter pressed on task input.
    new_task_input.addEventListener("keydown", (e) => {

        // Continue if task is entered & enter key is pressed.
        if (e.key === "Enter" && new_task_input.value != "") {
            addNewTask(new_task_input.value);
            new_task_input.value = "";
        };

        
    });


    // Add the entered task to the list of tasks.
    function addNewTask(task) {
        taskList.push(task);
        console.log(taskList);
    };


    // Add the new task to the displayed tasks.


    // Mark a task as completed.


    // Remove a task from the list.








});
