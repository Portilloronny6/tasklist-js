const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const tasksList = document.querySelector(".collection");
const clearTasks = document.querySelector(".clear-tasks");

loadEventListener();
function loadEventListener() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  tasksList.addEventListener("click", deleteTask);
  clearTasks.addEventListener("click", clearAllTasks);
  filter.addEventListener("keyup", filterTask);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.setAttribute("href", "#");

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    tasksList.appendChild(li);
  });
}

function addTask(eventObject) {
  if (taskInput.value === "") {
    alert("Agrega una tarea");
  } else {
    const li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.setAttribute("href", "#");

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    tasksList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  eventObject.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(eventObject) {
  if (eventObject.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      eventObject.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(
        eventObject.target.parentElement.parentElement
      );
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
  // document.querySelectorAll(".collection-item").forEach(function (element) {
  //   element.remove();
  // });

  while (tasksList.firstChild) {
    tasksList.firstChild.remove();
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTask(eventObject) {
  text = eventObject.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
