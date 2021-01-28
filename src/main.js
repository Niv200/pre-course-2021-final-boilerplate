totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
let tasks = [];

let button = document.getElementById("add-button");
button.addEventListener("click", (e) => {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");
  let label = document.createElement("label");
  let priorityInput = document.getElementById("priority-selector").value;
  addToTasks(taskDiv, label, task, new Date(), priorityInput);
});

function taskChecked(event) {
  let div = event.target.parentNode;
  let taskDiv = document.getElementById("tasks-container");
  let taskDoneDiv = document.getElementById("tasks-done-container");

  if (!event.target.checked) {
    taskDiv.appendChild(div);
    taskDoneDiv.removeChild(div);
    todoItemsCount++;
    doneItemsCount--;
  } else {
    taskDiv.removeChild(div);
    taskDoneDiv.appendChild(div);
    todoItemsCount--;
    doneItemsCount++;
  }
  if (todoItemsCount >= 1) {
    document.getElementById("empty-list-span").style.display = "none";
  } else if (todoItemsCount === 0) {
    document.getElementById("empty-list-span").style.display = "block";
  }
}

//My functions.
function removeTask(div, label, input, removeButton) {
  div.removeChild(input);
  div.removeChild(label);
  div.removeChild(removeButton);
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

///
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

function addToTasks(taskDiv, label, text, date, priority) {
  let task = text;
  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  input.onclick = taskChecked;
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
      //removeButton.onclick = taskChecked;
      div.appendChild(input);
      div.appendChild(label);
      div.appendChild(removeButton);
      taskDiv.appendChild(div);
      totalItemsCount++;
      todoItemsCount++;
      removeButton.addEventListener("click", (e) => {
        removeTask(div, label, input, removeButton);
      });
      if (todoItemsCount === 1) {
        document.getElementById("empty-list-span").style.display = "none";
      }
      //console.log(getTaskAsObject(task, priorityInput, new Date()));
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
  }
  return task;
}

///
