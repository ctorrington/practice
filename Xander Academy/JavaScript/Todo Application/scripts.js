// Tasks are IDed by the time they are created.
// JavaScript uses the same data type for all numbers, 
// the size taken for the integer '1' is  
// equivalent to 'Date().getTime()' in memory.
// It is easier to just get the time than have some counting variable & 
// since they both take the same amount of memory,
// tasks are IDed by their creation time.

// Tasks are nested into indiviual containers when they are created.
// The containers contain the buttons for marking the task complete &
// deleting the task; as well as the actual task description.
// These containers are appened as child elements to the list element
// created within the HTML file.
// Every element within the container, including the container itself,
// is IDed as follows: <creation time>_<element>, where <creation time>
// is the time that the task is created & <element> is the type of element,
// (container, element, delete, complete).
// This ID system allows for instant lookups rather than list traversals.

// Along with the tasks that are displayed within the list element,
// described above, the tasks are tracked within a hashtable.
// The hashtable is a JavaScript object containing named Javascript objects
// that contain the relevant tasks properties.
// The objects are named as follows: <creation time>_task.
// The named objects are named with the same creation time as their
// relevant tasks.
// This allows instant access to task properties.

// IDs are seperated with an underscore ('_') & can easily be split to
// refer to other IDed elements.
// This allows for easy lookups as every ID follows the same convention. E.g.
// <time created>_complete, <time created>_element, <time created>_delete.




// TODO light mode
// TODO dark mode
// TODO fix white space
// TODO button labels in task creation (semantics)
// TODO mobile css list-options space
// TODO items left counter
// TODO more aria labels
// TODO semantics check




document.addEventListener("DOMContentLoaded", () => {

    // Document Elements.
    let new_task_input = document.getElementById('new_task_input');
    let new_task_form = document.getElementById('new_task_form');
    let task_list = document.getElementById('task_list');
    let active_filter_button = document.getElementById('active_filter_button');
    let all_filter_button = document.getElementById('all_filter_button');
    let completed_filter_button = document.getElementById('completed_filter_button');
    let clear_completed_button = document.getElementById('clear_completed_button');
    let dark_mode_sun_icon = document.getElementById('dark_mode_sun_icon_button');
    let light_mode_moon_icon = document.getElementById('light_mode_moon_icon_button');



    // Global Variables.
    let taskListHashTable = {};
    let dragContainer
    

    // Event listeners.

    // Change to light mode.
    dark_mode_sun_icon.addEventListener('click', (e) => {
        changeTheme(['light', 'dark'])
    });

    // Change to dark mode.
    light_mode_moon_icon.addEventListener('click', (e) => {
         changeTheme(['light', 'dark'])
    });



    // Prevent the default behaviour of the form.
    new_task_form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    // Hanle the enter key being pressed from the input field.
    new_task_input.addEventListener('keydown', (e) => {

        // Continue if a task is entered with the enter key.
        if (e.key === "Enter" && new_task_input.value != "") {

            // ID used for tasks.
            let taskCreationTime = new Date().getTime();

            addNewTask(new_task_input.value, taskCreationTime);
            createNewTaskListItem(new_task_input.value, taskCreationTime);
            new_task_input.value = "";
        };

        
    });


    // Draggable functionality

    // task_list.addEventListener('dragstart', (e) => {
    //     dragContainer = e.target;
    //     console.log(dragContainer);
    //     e.dataTransfer.setData('text/plain', dragContainer.innerHTML);
    // });

    // task_list.addEventListener('dragOver', (e) => {
    //     e.preventDefault();
    // });

    // task_list.addEventListener('drop', (e) => {
    //     let dropContainer = e.target;
    //     let dragIndex = Array.from(task_list.children).indexOf(dragContainer);
    //     let dropIndex = Array.from(task_list.children).indexOf(dropContainer);

    //     // Swap the drap and drop elements.
    //     if (dragIndex !== dropIndex) {
    //         task_list.insertBefore(dragContainer, dropContainer);
    //     };

    //     dragContainer = null;

    // });



    all_filter_button.addEventListener('click', (e) => {
        for (element in taskListHashTable) {
            document.getElementById(`${getID(element)}_container`).style.display = "";
        };

        changeFilterButtonColor(e);
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

        changeFilterButtonColor(e);
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

        changeFilterButtonColor(e);
    });


    clear_completed_button.addEventListener('click', (e) => {
        for (element in taskListHashTable) {
            // Find the elements with completed status.
            if (taskListHashTable[element].status === 'completed') {

                // Delete the element form the Task List.
                delete taskListHashTable[element];

                // Remove the html elements from the DOM.
                document.getElementById(`${element.split('_')[0]}_container`).remove();
            };
        };
    });


    // FUNCTIONS

    // Set the correct color values for the filter buttons.
    function changeFilterButtonColor(e) {
        for (button of e.target.parentNode.children) {
            button.style.color = "grey";
        }

        e.target.style.color = "blue";
    }

    function getElementsByClass(elementClassList) {
        let elementList = []

        for (elementClass of elementClassList){ 
            console.log(elementClass)
            elementList.push(...document.getElementsByClassName(elementClass));
        }
        return elementList
    }


    // Change the classes of elements that switch between dark & light mode.
    function changeTheme(elementClassList) {

        let elementList = getElementsByClass(elementClassList)


        console.log(elementList)
        for (element of elementList) {
            element.classList.toggle('dark');
            element.classList.toggle('light');
        }
    }



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
        new_task_complete_button.style.border = "1px solid white";
        // Event listener for task completion.
        new_task_complete_button.addEventListener('click', function(e) {
            taskCompleted(e.target.getAttribute('id'));
            new_task_complete_button.classList.toggle('task_completed');
        });

        // Create the list item element.
        let new_task_list_item = document.createElement('li');
        new_task_list_item.setAttribute('id', `${taskCreationTime}_element`);
        new_task_list_item.setAttribute('class', "task_list_element");
        let new_task_description = document.createElement('span');
        new_task_description.setAttribute('class', 'task_description')
        new_task_description.textContent = taskName;

        // Create the task remove button.
        let new_delete_task_button = document.createElement('button');
        new_delete_task_button.setAttribute('id', `${taskCreationTime}_delete`);
        new_delete_task_button.setAttribute('class', "task_delete_button");
        // Send theparent of the task to be deleted (the container div),
        // as target of the event target 
        new_delete_task_button.addEventListener('click', function(e) {
            taskDeleted(e.target.getAttribute('id'));
        })

        // Alignment div for the completion button & task description
        let left_align_container = document.createElement('div');
        left_align_container.setAttribute('class', 'left_align_container');


        // Create the div container for the list item elements (task & 2 buttons).
        let new_task_container = document.createElement('div');
        new_task_container.setAttribute('id', `${taskCreationTime}_container`)
        new_task_container.setAttribute('class', 'task_container');
        new_task_container.setAttribute('draggable', 'true');

        // Nest all the elements for the task.
        left_align_container.appendChild(new_task_complete_button);
        left_align_container.appendChild(new_task_description);

        new_task_container.appendChild(left_align_container);
        new_task_container.appendChild(new_delete_task_button);

        new_task_list_item.appendChild(new_task_container);

        // This appends new tasks to the top of the unordered list.
        task_list.insertBefore(new_task_list_item, task_list.firstChild);
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
        document.getElementById(`${DeletionTargetId.split('_')[0]}_element`).remove();

        delete taskListHashTable[`${DeletionTargetId.split('_')[0]}_task`];
    }


    // Add the new task to the displayed tasks.


    // Mark a task as completed.


    // Remove a task from the list.








});
