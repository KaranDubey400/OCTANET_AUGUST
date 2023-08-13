const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const priorityRadios = document.getElementsByName('priority');

addTaskBtn.addEventListener('click', () => {
  const selectedPriority = getSelectedPriority();
  const taskText = taskInput.value.trim();
  
  if (taskText !== '' && selectedPriority) {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.setAttribute('data-priority', selectedPriority);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    
    taskInput.value = '';
    sortTasks();
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
  }
});

function getSelectedPriority() {
  for (const radio of priorityRadios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

function sortTasks() {
  const tasks = Array.from(taskList.getElementsByTagName('li'));
  
  tasks.sort((a, b) => {
    const priorityA = a.getAttribute('data-priority');
    const priorityB = b.getAttribute('data-priority');
    
    if (priorityA === priorityB) {
      return 0;
    }
    
    if (priorityA === 'top') {
      return -1;
    }
    
    if (priorityB === 'top') {
      return 1;
    }
    
    if (priorityA === 'medium') {
      return -1;
    }
    
    return 1;
  });
  
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
}
