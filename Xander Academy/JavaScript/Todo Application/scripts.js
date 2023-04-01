document.addEventListener("DOMContentLoaded", () => {

    // Document elements.
    let new_task_input = document.getElementById('new_task_input');
    let new_task_form = document.getElementById('new_task_form');
    let task_list = document.getElementById('task_list');

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
            createNewTaskListItem(new_task_input.value);
            new_task_input.value = "";
        };

        
    });


    // Create new list item.
    function createNewTaskListItem(task) {

        // Create the list item element.
        let new_task_list_item = document.createElement('li');

        // Create the actual list item value.     See more, https://www.w3schools.com/jsref/met_node_appendchild.asp
        let new_task_list_item_text_node = document.createTextNode(task);

        // Append the text node to the list item element,
        // i.e. give the list item a value.
        new_task_list_item.appendChild(new_task_list_item_text_node);

        // Add the new list item, now with a value, to the unordered list.
        task_list.appendChild(new_task_list_item);
    };


    // Add the entered task to the list of tasks.
    function addNewTask(task) {
        taskList.push(task);
        console.log(taskList);
    };


    // Add the new task to the displayed tasks.


    // Mark a task as completed.


    // Remove a task from the list.








});
