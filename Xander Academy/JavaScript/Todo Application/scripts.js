document.addEventListener("DOMContentLoaded", () => {

    // Document elements.
    let new_task_input = document.getElementById('new_task_input');
    let new_task_form = document.getElementById('new_task_form');
    let task_list = document.getElementById('task_list');

    let active_filter_button = document.getElementById('active_filter_button');
    let all_filter_button = document.getElementById('all_filter_button');
    let completed_filter_button = document.getElementById('completed_filter_button');



    // Variables.
    let taskListHashTable = {};
    


    // Event listeners.

    // Prevent default form behaviour.
    new_task_form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    // Handle enter pressed on task input.
    new_task_input.addEventListener('keydown', (e) => {

        // Continue if task is entered & enter key is pressed.
        if (e.key === "Enter" && new_task_input.value != "") {

            // ID used for tasks.
            let taskCreationTime = new Date().getTime();

            addNewTask(new_task_input.value, taskCreationTime);
            createNewTaskListItem(new_task_input.value, taskCreationTime);
            new_task_input.value = "";
        };

        
    });


    all_filter_button.addEventListener('click', (e) => {
        for (element in taskListHashTable) {
            document.getElementById(`${getID(element)}_container`).style.display = "";
        };
    });



    active_filter_button.addEventListener('click', (e) => {
        for (element in taskListHashTable) {

            // Find the elements with active status.
            if (taskListHashTable[element].status === 'active') {

                // Set the element to display.
                document.getElementById(`${getID(element)}_container`).style.display = "";
            } else {

                // Set the element to hide;
                document.getElementById(`${getID(element)}_container`).style.display = "none";
            }
        }
    });

    completed_filter_button.addEventListener('click', (e) => {
        for (element in taskListHashTable) {
            // Find the elements with completed status.
            if (taskListHashTable[element].status === 'completed') {

                // Set the element to display.
                document.getElementById(`${getID(element)}_container`).style.display = "";
            } else {

                // Set the element to hide;
                document.getElementById(`${getID(element)}_container`).style.display = "none";
            };
        };
    });






    // A function to return the ID free without the descriptor.
    function getID(id) {
        return id.split('_')[0];
    }


    // Create new task displayed in the list.
    function createNewTaskListItem(taskName, taskCreationTime) {
        // This function adds the new task as a list item, the complete,
        // & delete buttons. These elements are all nested into a div,
        // with the div being the child of the task list.

        // creates the task complete button.
        let new_task_complete_button = document.createElement('button');
        new_task_complete_button.setAttribute('id', `${taskCreationTime}_complete`);
        new_task_complete_button.setAttribute('class', "task_complete_button");
        // Event listener for task completion.
        new_task_complete_button.addEventListener('click', function(e) {
            taskCompleted(e.target.getAttribute('id'));
        });


        // Create the list item element.
        let new_task_list_item = document.createElement('li');
        new_task_list_item.setAttribute('id', `${taskCreationTime}_element`);
        new_task_list_item.setAttribute('class', "task_list_element");

        // Create the actual list item value.     See more, https://www.w3schools.com/jsref/met_node_appendchild.asp
        let new_task_list_item_text_node = document.createTextNode(taskName);

        // Append the text node to the list item element,
        // i.e. give the list item a value.
        new_task_list_item.appendChild(new_task_list_item_text_node);


        // Create the task remove button.
        let new_delete_task_button = document.createElement('button');
        new_delete_task_button.setAttribute('id', `${taskCreationTime}_delete`);
        new_delete_task_button.setAttribute('class', "task_delete_button");
        // Send theparent of the task to be deleted (the container div),
        // as target of the event target 
        new_delete_task_button.addEventListener('click', function(e) {
            taskDeleted(e.target.getAttribute('id'));
        })


        // Another div to align the list elments correctly on the left.
        let left_align_container = document.createElement('div');
        left_align_container.setAttribute('class', 'left_align_container');


        // Create the div container for the list item elements (task & 2 buttons).
        let new_task_container = document.createElement('div');
        new_task_container.setAttribute('id', `${taskCreationTime}_container`)
        new_task_container.setAttribute('class', 'task_container');

        // Nest all the elements for the task.
        left_align_container.appendChild(new_task_complete_button);
        left_align_container.appendChild(new_task_list_item);

        new_task_container.appendChild(left_align_container);
        new_task_container.appendChild(new_delete_task_button);

        // This appends new tasks to the top of the unordered list.
        task_list.insertBefore(new_task_container, task_list.firstChild);


        // document.getElementById(`${task}_container`).style.display = "none";
    };


    // Add the entered task to the list of tasks.
    function addNewTask(taskName, taskCreationTime) {

        taskListHashTable[`${taskCreationTime}_task`] = {
                                                        'taskName': taskName,
                                                        'status': 'active'}

        console.log(taskListHashTable);
    };

    // Task is marked as completed.
    function taskCompleted(CompletedTargetId) {

        let taskListElement = taskListHashTable[`${CompletedTargetId.split('_')[0]}_task`];

        if (taskListElement.status === "active") {
            document.getElementById(`${CompletedTargetId.split('_')[0]}_element`).style.textDecoration = "line-through";
            taskListElement.status = "completed"
        } else {
            document.getElementById(`${CompletedTargetId.split('_')[0]}_element`).style.textDecoration = "none";
            taskListElement.status = "active";
        }
    };

    function taskDeleted(DeletionTargetId) {


        // Remove the containing div from the DOM.
        document.getElementById(`${DeletionTargetId.split('_')[0]}_container`).remove();

        delete taskListHashTable[`${DeletionTargetId.split('_')[0]}_task`];
    }


    // Add the new task to the displayed tasks.


    // Mark a task as completed.


    // Remove a task from the list.








});
