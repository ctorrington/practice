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


    // Create new task displayed in the list.
    function createNewTaskListItem(task) {
        // This function adds the new task as a list item, the complete,
        // & delete buttons. These elements are all nested into a div,
        // with the div being the child of the task list.

        // creates the task complete button.
        let new_task_complete_button = document.createElement('button');
        new_task_complete_button.setAttribute('id', `${task}_complete`);
        new_task_complete_button.setAttribute('class', "task_complete_button");
        // Event listener for task completion.
        new_task_complete_button.addEventListener('click', function(){
            taskCompleted(task);
        });


        // Create the list item element.
        let new_task_list_item = document.createElement('li');
        new_task_list_item.setAttribute('id', `${task}_task`);
        new_task_list_item.setAttribute('class', "task_list_element");

        // Create the actual list item value.     See more, https://www.w3schools.com/jsref/met_node_appendchild.asp
        let new_task_list_item_text_node = document.createTextNode(task);

        // Append the text node to the list item element,
        // i.e. give the list item a value.
        new_task_list_item.appendChild(new_task_list_item_text_node);


        // Create the task remove button.
        let new_delete_task_button = document.createElement('button');
        new_delete_task_button.setAttribute('id', `${task}_delete`);
        new_delete_task_button.setAttribute('class', "task_delete_button");


        // Another div to align the list elments correctly on the left.
        let left_align_container = document.createElement('div');
        left_align_container.setAttribute('class', 'left_align_container');


        // Create the div container for the list item elements (task & 2 buttons).
        let new_task_container = document.createElement('div');
        new_task_container.setAttribute('class', 'task_container');

        // Nest all the elements for the task.
        left_align_container.appendChild(new_task_complete_button);
        left_align_container.appendChild(new_task_list_item);

        new_task_container.appendChild(left_align_container);
        new_task_container.appendChild(new_delete_task_button);

        // This appends new tasks to the top of the unordered list.
        task_list.insertBefore(new_task_container, task_list.firstChild)
    };


    // Add the entered task to the list of tasks.
    function addNewTask(task) {
        taskList.push({'task': task, 
                        'status': 'active'});
        console.log(taskList);
    };

    // Task is marked as completed.
    function taskCompleted(task) {
        for (element of taskList) {

            // Find the task in the task list.
            if (task === element.task){

                // Mark the task as completed.
                if (element.status === "active") {
                    element.status = "completed";
                    document.getElementById(`${element.task}_task`).style.textDecoration = "line-through";
                } else {
                    element.status = "active";
                    document.getElementById(`${element.task}_task`).style.textDecoration = "none";
                }
            }
        }
    };


    // Add the new task to the displayed tasks.


    // Mark a task as completed.


    // Remove a task from the list.








});
