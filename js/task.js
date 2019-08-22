(function() {

    let editMode = false;
    let markedTask = false;

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
                <a href="javascript:void(0);" class="icon-btn important">
                    <i class="fas fa-exclamation"></i>
                </a>
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
    
        bindTaskEvents(task, finishTask)
        
        inputAddTask.value = '';
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
    
        taskList.removeChild(task);
    }
    
    function markTask() {
        markedTask = !markedTask;
    
        const btnBlock = this.parentNode;
        const task = btnBlock.parentNode;
        const checkboxBlock = task.querySelector('.checkbox-block');
    
        if (markedTask) {
            task.style.borderColor = 'green';
            checkboxBlock.style.borderRightColor = 'green';
        } else {
            task.style.borderColor = 'rgba(0,0,0,.125)';
            checkboxBlock.style.borderRightColor = 'rgba(0,0,0,.125)';
        }
    }
    
    function finishTask() {
        const infoBlock = this.parentNode;
        const list = infoBlock.parentNode;
    
        finishedTasksList.appendChild(list);
        bindTaskEvents(list, unfinishTask);
    }
    
    function unfinishTask() {
        const infoBlock = this.parentNode;
        const list = infoBlock.parentNode;
    
        taskList.appendChild(list);
        bindTaskEvents(list, finishTask);
    }


    function bindTaskEvents(task, checkboxEvent) {
        const checkbox = task.querySelector('.ready');
        const editButton = task.querySelector('.edit');
        const deleteButton = task.querySelector('.delete');
        const markButton = task.querySelector('.important'); 

        checkbox.onclick = checkboxEvent;
        editButton.onclick = editTask;
        markButton.onclick = markTask;
        deleteButton.onclick = deleteTask;
    }
    
    window.Task = {
        deleteTask,
        markTask,
        finishTask,
        unfinishTask,
        editTask,
        addTask
    }
})()