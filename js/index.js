const { createNewProject, addProject, deleteProject } = Project;
const { 
    deleteTask, markTask, finishTask,
    unfinishTask, editTask, addTask, createNewTask
} = Task;

const addProjectButton = document.querySelector('.add-project');
const createProjectInput = document.querySelector('.create-project-input');

let addTaskButton = null;
let projectDeleteButton = null;

let inputAddTask = null;
let taskList = null;
let finishedTasksList = null;

addProjectButton.addEventListener('click', () => {
    if (!createProjectInput.value) {
        return;
    } 

    addProject(createProjectInput.value);
    
    addTaskButton = document.querySelector('.add-task');
    inputAddTask = document.querySelector('.new-task');
    taskList = document.querySelector('.unfinished-tasks');
    finishedTasksList = document.querySelector('.finished-tasks');
    projectDeleteButton = document.querySelector('.project-delete');

    addTaskButton.addEventListener('click', addTask);
    projectDeleteButton.addEventListener('click', deleteProject);
});
