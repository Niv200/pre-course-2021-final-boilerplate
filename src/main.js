let tasks = [];
let tickedTasks = [];
let tasksLeft = 0;
let tasksCompleted = 0;
let counterHeader = document.getElementById("tasks-left");
let completedHeader = document.getElementById("completed-tasks");
let resetButton = document.getElementById("reset");
let button = document.getElementById("add-button");
let sort = document.getElementById("sort-button");
let sortState = 0;

sort.addEventListener("click", (e) => {
  let sortDiv = document.getElementById("sort-div");
  //sort State starts at 1
  //sorting by, time&date, priority.
  //4 states.
  sortState = sortState + 1;
  if (sortState > 2) {
    sortState = 1;
  }
  switch (sortState) {
    case 0:
      sortDiv.innerText = "None";
      break;
    case 1:
      sortDiv.innerText = "Increasing priority";
      sortItemsBasedOnPriority(false);
      break;
    case 2:
      sortDiv.innerText = "Decreasing priority";
      sortItemsBasedOnPriority(true);
      break;
  }
});

resetButton.addEventListener("click", (e) => {
  resetTotalDone();
  //   for(task of tickedTasks){
  //       let div = document.createElement("div");
  //       div.removeChild(input);
  //       div.removeChild(label);
  //       div.removeChild(removeButton);
  //   }
  let tickedTasks = document.querySelectorAll(".ticked");
  console.log(tickedTasks);
  for (i = 0; i < tickedTasks.length; i++) {
    tickedTasks[i].closest("div").remove();
  }
});

button.addEventListener("click", (e) => {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");
  let label = document.createElement("label");
  let priorityInput = document.getElementById("priority-selector").value;
  addToTasks(taskDiv, label, task, new Date(), priorityInput);
});

//My functions.
function sortItemsBasedOnPriority(increase) {
  let container = document.getElementById("tasks-container");
  if (increase) {
    organizedPriority(container, true);
  } else {
    organizedPriority(container, false);
  }
}

function organizedPriority(div, increase) {
  let childs = div.getElementsByClassName("todo-container");
  //I rather create 5 arrays. its easier to edit and work with.
  let priority1 = [];
  let priority2 = [];
  let priority3 = [];
  let priority4 = [];
  let priority5 = [];
  for (let i = 0; i < childs.length; i++) {
    let priority = JSON.parse(
      childs[i].getElementsByClassName("todo-priority")[0].innerText
    );
    switch (priority) {
      case 1:
        priority1.push(childs[i]);
        childs[i].remove;
        break;
      case 2:
        priority2.push(childs[i]);
        childs[i].remove;
        break;
      case 3:
        priority3.push(childs[i]);
        childs[i].remove;
        break;
      case 4:
        priority4.push(childs[i]);
        childs[i].remove;
        break;
      case 5:
        priority5.push(childs[i]);
        childs[i].remove;
        break;
    }
  }
  //Looping through all priorities
  let priorities = [priority1, priority2, priority3, priority4, priority5];
  let organized = [];
  for (let i = 0; i < priorities.length; i++) {
    if (priorities[i].length > 0) {
      for (let z = 0; z < priorities[i].length; z++) {
        if (increase) {
          organized.push(priorities[i][z]);
        } else {
          organized.unshift(priorities[i][z]);
        }
      }
    }
  }
  for (let i = 0; i < organized.length; i++) {
    div.appendChild(organized[i]);
  }
}

function getPriority(label) {
  return JSON.parse(label.innerText);
}
///////////////////////
function removeTask(div, priorityDiv, label, removeButton) {
  if (!containsTicked(label)) {
    // changeTotalLeft(false);
  }
  div.removeChild(label);
  div.removeChild(removeButton);
  div.removeChild(priorityDiv);
}

//Function to return a task object. @Not in use@
function getTaskAsObject(text, priority, date) {
  return {
    text: text,
    priority: priority,
    date: date.now,
  };
}

//Function to reset all inputs after the user hits "add".
function resetInputs() {
  document.getElementsByTagName("input")[0].value = "";
  document.getElementsByTagName("select")[0].value = "";
}

//Function to get the time into a readable format without seconds and miliseconds.
function calculateTime(time) {
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  let string = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return string;
}

//Function to return text, date, and priority as a single string.
function getTaskText(text, date, priority) {
  return " " + priority + " " + text + " " + calculateTime(date) + " ";
}

//A function to return a color respectively to priority value (1 to 5).
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

//function to change the total tasks left counter, if flag then add 1, if !flag subtract 1.
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

//function to change the numbers of both counters once a task has been ticked.
function changeNumbers(label) {
  if (containsTicked(label)) {
    changeTotalLeft(true);
    label.classList.remove("ticked");
    changeTotalDone(false);
  } else {
    changeTotalLeft(false);
    label.classList.add("ticked");
    changeTotalDone(true);
  }
}

function containsTicked(label) {
  for (className of label.classList) {
    if (className === "ticked") {
      return true;
    }
  }
  return false;
}
//function to change the total tasks done counter, if flag then add 1, if !flag subtract 1.
function changeTotalDone(flag) {
  let text = completedHeader.innerText;
  if (flag) {
    text = text.replace(tasksCompleted, tasksCompleted + 1);
    tasksCompleted = tasksCompleted + 1;
  } else {
    text = text.replace(tasksCompleted, tasksCompleted - 1);
    tasksCompleted = tasksCompleted - 1;
  }
  completedHeader.innerText = text;
}

//A function to reset the total done counter
function resetTotalDone() {
  let text = completedHeader.innerText;
  text = text.replace(tasksCompleted, 0);
  tasksCompleted = 0;
  completedHeader.innerText = text;
}

function addToTasks(taskDiv, label, text, date, priority) {
  let bool = false;
  let task = text;
  if (task.length <= 1) {
    alert("You need to add a task!");
  } else {
    //Find importance number
    if (priority >= 1 && priority <= 5) {
      resetInputs();
      /////Div piority
      let priorityDiv = document.createElement("div");
      priorityDiv.innerText = JSON.parse(priority);
      priorityDiv.className = "todo-priority";
      task = getTaskText(text, date, priority);
      label.innerText = task;
      label.className = findPriority(priority);
      let div = document.createElement("div");
      //remove button for task
      let removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.innerText = "remove";
      //Deactivation button for tasks
      div.appendChild(label);
      div.appendChild(removeButton);
      taskDiv.appendChild(div);
      div.className = "todo-container";
      div.append(priorityDiv);
      ///Reseting sort button and text after adding new value.
      let sortState = 0;
      let sortDiv = document.getElementById("sort-div");
      sortDiv.innerText = "None";
      ////
      label.addEventListener("click", (e) => {
        changeNumbers(label);
      });
      bool = true;
      changeTotalLeft(true);
      removeButton.addEventListener("click", (e) => {
        if (!containsTicked(label)) {
          changeTotalDone(true);
          changeTotalLeft(false);
        }
        removeTask(div, priorityDiv, label, removeButton);
      });
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
  }
  return bool;
}
