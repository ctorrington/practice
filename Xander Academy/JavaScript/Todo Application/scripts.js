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
        // This function adds the new task as a list item, the complete,
        // & delete buttons. These elements are all nested into a div.

        // creates the task complete button.
        let new_task_complete_button = document.createElement('button');
        new_task_complete_button.setAttribute('id', `${task}_complete`);
        new_task_complete_button.setAttribute('class', "task_complete_button");


        // Create the list.

        // Create the list item element.
        let new_task_list_item = document.createElement('li');
        new_task_list_item.setAttribute('id', `${task}_task`);
        new_task_list_item.setAttribute('class', "task_list_element");

        // Create the actual list item value.     See more, https://www.w3schools.com/jsref/met_node_appendchild.asp
        let new_task_list_item_text_node = document.createTextNode(task);

        // Append the text node to the list item element,
        // i.e. give the list item a value.
        new_task_list_item.appendChild(new_task_list_item_text_node);

        // Add the new list item, now with a value, to the unordered list.
        // task_list.appendChild(new_task_list_item);


        // Create the task remove button.
        let new_delete_task_button = document.createElement('button');
        new_delete_task_button.setAttribute('id', `${task}_delete`);
        new_delete_task_button.setAttribute('class', "task_delete_button");

        // Create the div container for the list item elements (task & 2 buttons).
        let new_task_container = document.createElement('div');
        new_task_container.setAttribute('class', 'task_container');
        new_task_container.appendChild(new_task_complete_button);
        new_task_container.appendChild(new_task_list_item);
        new_task_container.appendChild(new_delete_task_button);




        task_list.appendChild(new_task_container);

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
