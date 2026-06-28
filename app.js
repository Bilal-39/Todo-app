const tasks = [];  
let nextId = 1;

const taskInput = document.getElementById('taskInput');
const taskList  = document.getElementById('taskList');
const emptyMsg  = document.getElementById('emptyMsg');

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  const task = { id: nextId++, text, done: false };
  tasks.push(task);
  taskInput.value = '';
  taskInput.focus();

  renderTask(task);
  syncEmpty();
}

function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.done ? ' done' : '');
  li.dataset.id = task.id;

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'task-check';
  check.checked = task.done;
  check.addEventListener('change', () => toggleTask(task.id, li, label));

  const label = document.createElement('span');
  label.className = 'task-label';
  label.textContent = task.text;
  label.addEventListener('click', () => {
    check.checked = !check.checked;
    toggleTask(task.id, li, label);
  });

  const del = document.createElement('button');
  del.className = 'del-btn';
  del.title = 'Remove task';
  del.innerHTML = '&#x2715;';   // ✕
  del.addEventListener('click', () => deleteTask(task.id, li));

  li.appendChild(check);
  li.appendChild(label);
  li.appendChild(del);
  taskList.appendChild(li);
}

function toggleTask(id, li, label) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  li.classList.toggle('done', task.done);
}

function deleteTask(id, li) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks.splice(idx, 1);

  li.style.transition = 'opacity 0.2s, transform 0.2s';
  li.style.opacity    = '0';
  li.style.transform  = 'translateX(8px)';
  setTimeout(() => { li.remove(); syncEmpty(); }, 200);
}

function syncEmpty() {
  emptyMsg.classList.toggle('visible', tasks.length === 0);
}

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

syncEmpty();
