const addButton = document.querySelector('.add-task');
const inputTask = document.querySelector('.new-task');
const taskList = document.querySelector('.unfinished-tasks');
const finishedTasks = document.querySelector('.finished-tasks');

let editMode = false;

function createNewTask(taskName) {
    const task = document.createElement('li');
    task.className = 'list-group-item';
    task.innerHTML = `
        <div class="checkbox-block">
            <input type="checkbox" class="ready" id="checkbox-ready">
        </div>  
        
        <div class="info-block">
            <label for="checkbox-ready" class="task-name">${taskName}</label>
            <input type="text" 
                    class="form-control edit-input" 
                    value="${taskName}"
            >
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
    editMode = !editMode;

    const button = this;
    const btnBlock = this.parentNode;
    const list = btnBlock.parentNode;
    const checkboxBlock = list.querySelector('.checkbox-block');
    const taskName = list.querySelector('.task-name');
    const input = list.querySelector('.edit-input');
    
    if (editMode) {
        list.classList.add('my-list-item');

        input.style.display = 'block';
        taskName.style.display = 'none';
        checkboxBlock.style.display = 'none';

        button.innerHTML = '<i class="fas fa-save"></i>'

    } else {
        taskName.innerText = input.value;

        list.classList.remove('my-list-item');

        input.style.display = 'none';
        taskName.style.display = 'block';
        checkboxBlock.style.display = 'block';

        button.innerHTML = '<i class="fas fa-edit"></i>'

    }
}

function deleteTask() {
    const btnBlock = this.parentNode;
    const task = btnBlock.parentNode;
    const list = task.parentNode;

    list.removeChild(task);
}

function finishTask() {
    const infoBlock = this.parentNode;
    const list = infoBlock.parentNode;

    finishedTasks.appendChild(list);
    bindTasksEvent(list, unfinishTask);
    
}

function unfinishTask() {
    const infoBlock = this.parentNode;
    const list = infoBlock.parentNode;

    taskList.appendChild(list);
    bindTasksEvent(list, finishTask);
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