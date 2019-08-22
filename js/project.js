(function() {
    const projectsBlock = document.querySelector('.projects');

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
    
        createProjectInput.value = '';
    }

    function deleteProject() {
        const btnBlock = this.parentNode;
        const titleBlock = btnBlock.parentNode;
        const project = titleBlock.parentNode;
    
        projectsBlock.removeChild(project);
    }

    window.Project = {
        createNewProject,
        addProject,
        deleteProject
    }
})();