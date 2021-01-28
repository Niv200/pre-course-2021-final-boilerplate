totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
let tasks = [];
let tasksLeft = 0;
let tasksCompleted = 0;
let counterHeader = document.getElementById("tasks-left");
let completedHeader = document.getElementById("completed-tasks");
let resetButton = document.getElementById("reset");
let button = document.getElementById("add-button");

resetButton.addEventListener("click", (e) => {
  resetTotalDone();
});

button.addEventListener("click", (e) => {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");
  let label = document.createElement("label");
  let priorityInput = document.getElementById("priority-selector").value;
  if (addToTasks(taskDiv, label, task, new Date(), priorityInput)) {
    changeTotalLeft(true);
  }
});

//My functions.
function removeTask(div, label, input, removeButton) {
  div.removeChild(input);
  div.removeChild(label);
  div.removeChild(removeButton);
  changeTotalLeft(false);
}

function getTaskAsObject(text, priority, date) {
  return {
    text: text,
    priority: priority,
    date: date.now,
  };
}

function resetInputs() {
  document.getElementsByTagName("input")[0].value = "";
  document.getElementsByTagName("select")[0].value = "";
}

function calculateTime(time) {
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let string = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return string;
}

function getTaskText(text, date, priority) {
  return " " + priority + " " + text + " " + calculateTime(date) + " ";
}

function findPriority(priority) {
  let priorityClassName = "";
  switch (JSON.parse(priority)) {
    case 1:
      priorityClassName = "very-low";
      break;
    case 2:
      priorityClassName = "low";
      break;
    case 3:
      priorityClassName = "normal";
      break;
    case 4:
      priorityClassName = "high";
      break;
    case 5:
      priorityClassName = "very-high";
      break;
  }
  return priorityClassName;
}

//flag = add 1
//!flag = remove 1
function changeTotalLeft(flag) {
  let text = counterHeader.innerText;
  if (flag) {
    text = text.replace(tasksLeft, tasksLeft + 1);
    tasksLeft = tasksLeft + 1;
  } else {
    text = text.replace(tasksLeft, tasksLeft - 1);
    tasksLeft = tasksLeft - 1;
  }
  counterHeader.innerText = text;
}

//flag = add 1
//!flag = remove 1
function changeTotalDone(flag) {
  let text = completedHeader.innerText;
  if (flag) {
    text = text.replace(tasksCompleted, tasksCompleted + 1);
    tasksCompleted = tasksCompleted + 1;
  } else {
    tasksCompleted = text.replace(tasksCompleted, tasksCompleted - 1);
    tasksCompleted = tasksCompleted - 1;
  }
  completedHeader.innerText = text;
}

function resetTotalDone() {
  let text = completedHeader.innerText;
  text = text.replace(tasksCompleted, 0);
  tasksCompleted = 0;
  completedHeader.innerText = text;
}

function addToTasks(taskDiv, label, text, date, priority) {
  let bool = false;
  let task = text;
  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  label.setAttribute("for", input.id);
  if (task.length <= 1) {
    alert("You need to add a task!");
  } else {
    //Find importance number
    if (priority >= 1 && priority <= 5) {
      resetInputs();
      task = getTaskText(text, date, priority);
      label.innerText = task;
      label.className = findPriority(priority);
      console.log(findPriority(priority));
      console.log(priority);
      let div = document.createElement("div");
      //remove button for task
      let removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.innerText = "remove";
      div.appendChild(input);
      div.appendChild(label);
      div.appendChild(removeButton);
      taskDiv.appendChild(div);
      totalItemsCount++;
      todoItemsCount++;
      bool = true;
      removeButton.addEventListener("click", (e) => {
        removeTask(div, label, input, removeButton);
        changeTotalDone(true);
      });
      if (todoItemsCount === 1) {
        document.getElementById("empty-list-span").style.display = "none";
      }
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
    return bool;
  }
  return task;
}

///
