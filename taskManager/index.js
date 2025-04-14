// task

class Task {
    constructor(description, status = "new", priority = "medium") {
      this.id = Date.now();
      this.description = description;
      this.status = status;
      this.priority = priority;
    }
  
    updateStatus(newStatus) {
      this.status = newStatus;
    }
  
    updatePriority(newPriority) {
      this.priority = newPriority;
    }
}
  
// manager
class TaskManager {
    constructor() {
      this.tasks = [];
      this.loadTasks();
    }
  
    addTask(description, priority = "medium") {
      const task = new Task(description, "new", priority);
      this.tasks.push(task);
      this.saveTasks();
      return task;
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    }
  
    updateTaskStatus(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        const statuses = ["new", "in progress", "done"];
        const currentIndex = statuses.indexOf(task.status);
        task.status = statuses[(currentIndex + 1) % statuses.length];
        this.saveTasks();
      }
    }
  
    sortByPriority() {
      const order = { high: 1, medium: 2, low: 3 };
      this.tasks.sort((a, b) => order[a.priority] - order[b.priority]);
      this.saveTasks();
      return this.tasks;
    }
  
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  
    loadTasks() {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        this.tasks = parsed.map(t => {
          const task = new Task(t.description, t.status, t.priority);
          task.id = t.id;
          return task;
        });
      }
    }
  
    getAllTasks() {
      return this.tasks;
    }
}



// DOM
const manager = new TaskManager();
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskContainer = document.getElementById("taskContainer");
const sortButton = document.getElementById("sort");

function renderTasks() {
  taskContainer.innerHTML = "";

  manager.getAllTasks().forEach(task => {
    const card = document.createElement("div");
    card.className = `task-card ${task.status}`;
    card.innerHTML = `
      <p><strong>${task.description}</strong></p>
      <p>Status: ${task.status}</p>
      <p>Priority: ${task.priority}</p>
      <button data-id="${task.id}" class="status">Change Status</button>
      <button data-id="${task.id}" class="delete">Delete</button>
    `;
    taskContainer.appendChild(card);
  });
  
  document.querySelectorAll('.status').forEach(btn => {
    btn.addEventListener('click', function() {
      changeStatus(this.getAttribute('data-id'));
    });
  });
  
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteTask(this.getAttribute('data-id'));
    });
  });
}

function changeStatus(id) {
  manager.updateTaskStatus(parseInt(id, 10) || id); 
  renderTasks();
}

function deleteTask(id) {
  manager.deleteTask(parseInt(id, 10) || id);
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (description !== "") {
    manager.addTask(description, priority);
    taskInput.value = "";
    renderTasks();
  }
});

sortButton.addEventListener("click", () => {
  manager.sortByPriority();
  renderTasks(); 
});

renderTasks();