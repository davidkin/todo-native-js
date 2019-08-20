const addButton = document.querySelector('.add-task');
const inputTask = document.querySelector('.new-task');
const taskList = document.querySelector('.unfinished-tasks');
const finishedTasks = document.querySelector('.finished-tasks');

function createNewTask(taskName) {
    const task = document.createElement('li');
    task.className = 'list-group-item my-list-item';
    task.innerHTML = `
        <div class="info-block">
            <input type="checkbox" class="ready">
            <p class="task-name">${taskName}</p>
        </div>

        <div class="buttons-block">
            <a href="javascript:void(0);" class="icon-btn edit">
                <i class="fas fa-edit"></i>
            </a>
            <a href="javascript:void(0);" class="icon-btn delete">
                <i class="fas fa-trash"></i>
            </a>
        </div>
    `
    return task;
}

function addTask() {
    if (!inputTask.value) {
        return;
    }

    const task = createNewTask(inputTask.value);
    taskList.appendChild(task);

    bindTasksEvent(task, finishTask)
    
    inputTask.value = '';
}

function editTask() {
    console.log('---', 'editTask');
}

function deleteTask() {
    const btnBlock = this.parentNode;
    const task = btnBlock.parentNode;
    const list = task.parentNode;

    list.removeChild(task);

    console.log('---', 'deleteTask' );
}

function finishTask() {
    console.log('---', 'finishTask');
}

function unfinishTask() {
    console.log('---', 'unfinishTask');
}

function bindTasksEvent(task, checkboxEvent) {
    const checkbox = task.querySelector('.ready');
    const editButton = task.querySelector('.edit');
    const deleteButton = task.querySelector('.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}

addButton.addEventListener('click', addTask);