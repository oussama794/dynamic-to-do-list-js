document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and add to DOM (no save to avoid duplication)
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add a task to the DOM and optionally save to localStorage
    function addTask(taskText, save = true) {
        // If called without param, get from input field
        if (taskText === undefined) taskText = taskInput.value.trim();

        if (taskText === '') {
            if (save) alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            updateLocalStorageAfterRemoval(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            taskInput.value = '';
        }
    }

    // Update localStorage by removing the given task text
    function updateLocalStorageAfterRemoval(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});
