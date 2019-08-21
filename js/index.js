const projectsBlock = document.querySelector('.projects');
const addProjectButton = document.querySelector('.add-project');

let addTaskButton = null;
let projectDeleteButton = null;

let inputAddTask = null;
let taskList = null;
let finishedTasksList = null;

let editMode = false;

// ------------------ Create Project ------------------

function createNewProject (projectName) {
    const project = document.createElement('div');
    project.className = 'todo';
    project.innerHTML = `
        <div class="todo-title-block">
            <h4 class="todo-title">${projectName}</h4>
            <div class="title-buttons-block">
                <a href="javascript:void(0);" class="icon-btn project-edit">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="javascript:void(0);" class="icon-btn project-delete">
                    <i class="fas fa-trash"></i>
                </a>
            </div>
        </div>

        <div class="todo-content">
            <div class="todo-header">
                <h3>Add task</h3>
                <div class="todo-header-info mb-2">
                    <div class="form-group new-task-block">
                        <input type="text" class="form-control new-task" placeholder="write new task">
                    </div>
                    <button class="btn btn-primary add-task">Add Task</button>
                </div>
            </div>

            <div class="todo-body">
                <div class="block block-border">
                    <h3 class="tasks-title">List of tasks</h3>
                    <ul class="list-group mb-2 unfinished-tasks"></ul>
                </div>
                
                <div class="block">
                    <h3 class="tasks-title">Finished tasks</h3>
                    <ul class="list-group mb-2 finished-tasks"></ul>
                </div>
            </div>
        </div>
    `;

    return project;
}

function addProject(title = 'My Project') {
    const project = createNewProject(title);

    projectsBlock.appendChild(project);
}

addProjectButton.addEventListener('click', () => {
    const createProjectInput = document.querySelector('.create-project-input');

    addProject(createProjectInput.value);

    createProjectInput.value = '';
    
    addTaskButton = document.querySelector('.add-task');
    inputAddTask = document.querySelector('.new-task');
    taskList = document.querySelector('.unfinished-tasks');
    finishedTasksList = document.querySelector('.finished-tasks');
    projectDeleteButton = document.querySelector('.project-delete');

    addTaskButton.addEventListener('click', addTask);
    projectDeleteButton.addEventListener('click', deleteProject);
});

// ------------------ Create Events Functions For Project ------------------

function deleteProject() {
    const btnBlock = this.parentNode;
    const titleBlock = btnBlock.parentNode;
    const project = titleBlock.parentNode;

    projectsBlock.removeChild(project);
}

// ------------------ Create Task ------------------

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
    if (!inputAddTask.value) {
        return;
    }

    const task = createNewTask(inputAddTask.value);
    taskList.appendChild(task);

    bindTasksEvent(task, finishTask)
    
    inputAddTask.value = '';
}

// ------------------ Create Events Functions For Tasks ------------------

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

    taskList.removeChild(task);
}

function finishTask() {
    const infoBlock = this.parentNode;
    const list = infoBlock.parentNode;

    finishedTasksList.appendChild(list);
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