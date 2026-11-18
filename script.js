const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  let remaining=0;
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed)
       li.classList.add("completed");
    else
      remaining++;
    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})" />
        <span class="task-text">${task.text}</span>
        <span class="badge ${task.priority}">${task.priority}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
    `;

    taskList.appendChild(li);
  });
  if (remaining === 1) {
    taskCount.textContent = "1 task remaining";
  } else {
    taskCount.textContent = `${remaining} tasks remaining`;
  }
  
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text: text,
    priority: prioritySelect.value,
    completed: false,
  });

  taskInput.value = "";
  saveAndRender();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

clearBtn.addEventListener("click", () => {
  let activeTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completed) {
      activeTasks.push(tasks[i]);
    }
  }

  tasks = activeTasks;
  saveAndRender();
});

renderTasks(); //when page reloads