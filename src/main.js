let tasks = [];
let deletedTasks = [];
let tickedTasks = [];
let tasksLeft = 0;
let tasksCompleted = 0;
let counterHeader = document.getElementById("tasks-left");
let completedHeader = document.getElementById("completed-tasks");
let resetButton = document.getElementById("reset");
let undoButton = document.getElementById("undo-button");
let button = document.getElementById("add-button");
let themeButton = document.getElementById("dark-mode");
let sort = document.getElementById("sort-button");
let sortState = 0;

themeButton.addEventListener("click", (e) => {
  let theme = document.getElementById("theme");
  if (theme.href.includes("style")) {
    theme.href = "dark.css";
  } else {
    document.getElementById("theme").href = "style.css";
  }
});

undoButton.addEventListener("click", (e) => {
  undoLatest();
});

function resetUndoText(flag) {
  let text = document.getElementById("undo-text");
  if (flag) {
    text.innerText = "Undoing changes!";
  } else {
    text.innerText = "Nothing to undo!";
  }
}

resetButton.addEventListener("click", (e) => {
  resetTotalDone();
  deletedTasks = [];
  let tickedTasks = document.getElementsByClassName("todo-container");
  for (i = 0; i < tickedTasks.length; i++) {
    if (isTicked(tickedTasks[i])) {
      tickedTasks[i].remove();
    }
  }
});

function isTicked(div) {
  let label = div.getElementsByTagName("DIV");
  console.log(label[1].className);
  let className = label[1].className;
  if (className.includes("ticked")) {
    return true;
  }
  return false;
}

function undoLatest() {
  if (!(deletedTasks.length <= 0)) {
    let container = document.getElementById("tasks-container");
    for (let i = 0; i < deletedTasks.length; i++) {
      let task = deletedTasks[i];
      container.appendChild(task);
      if (!isTicked(task)) {
        changeTotalLeft(true);
        changeTotalDone(false);
      } else {
      }
    }
    resetUndoText(false);
  } else {
    resetUndoText(false);
  }
}

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
  let tickedTasks = document.getElementsByClassName("todo-container");
  for (i = 0; i < tickedTasks.length; i++) {
    if (isTicked(tickedTasks[i])) {
      tickedTasks[i].remove();
    }
  }
});

button.addEventListener("click", (e) => {
  let text = document.getElementsByTagName("input")[0].value;
  // let taskDiv = document.getElementById("tasks-container");
  // let label = document.createElement("label");
  let priorityInput = document.getElementById("priority-selector").value;
  // addToTasks(taskDiv, label, task, new Date(), priorityInput);
  addTask(text, new Date(), priorityInput);
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
function removeTask(div, textDiv) {
  if (!containsTicked(textDiv)) {
    // changeTotalLeft(false);
  }
  dumpTasks(div);
  let text = document.getElementById("undo-text");
  text.innerText = "Click to undo delete!";
  div.remove();
}

//Dump tasks to undo button array.
function dumpTasks(div) {
  deletedTasks.push(div);
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
  let counter = document.getElementById("counter");
  let count = 0;
  if (flag) {
    count = tasksLeft + 1;
    tasksLeft = tasksLeft + 1;
  } else {
    count = tasksLeft - 1;
    tasksLeft = tasksLeft - 1;
  }
  counter.innerText = count;
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

//Adds a functioning edit button that edits textDiv inside todoDiv
function getEditTaskButton(todoDiv, textDiv) {
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit-button";
  todoDiv.appendChild(editButton);
  editButton.addEventListener("click", (e) => {
    let newText = window.prompt("Type your changes.");
    if (newText.length >= 1) {
      if (newText.length > 45) {
        alert("Your new task text is too long!");
      } else {
        textDiv.innerText = newText;
      }
    } else {
      alert("New task is too short!");
    }
  });
}

function containsTicked(label) {
  for (className of label.classList) {
    if (className === "ticked") {
      return true;
    }
  }
  return false;
}

function isTicked(div) {
  let label = div.getElementsByTagName("DIV");
  console.log(label[1].className);
  let className = label[1].className;
  if (className.includes("ticked")) {
    return true;
  }
  return false;
}
//function to change the total tasks done counter, if flag then add 1, if !flag subtract 1.
function changeTotalDone(flag) {
  let counterDone = document.getElementById("counter-done");
  let count = 0;
  if (flag) {
    count = tasksCompleted + 1;
    tasksCompleted = tasksCompleted + 1;
  } else {
    count = tasksCompleted - 1;
    tasksCompleted = tasksCompleted - 1;
  }
  counterDone.innerText = count;
}

///////////////////////////////
//A function to reset the total done counter
function resetTotalDone() {
  tasksCompleted = 0;
  document.getElementById("counter-done").innerText = 0;
}

function returnAsJson(text, date, priority) {
  // let obj = {
  //   "text": text,
  //   "date": date,
  //   "priority": priority
  // }
}
function addTask(text, date, priority) {
  taskDiv = document.getElementById("tasks-container");
  let bool = false;
  if (text.length <= 0) {
    alert("You need to add a task!");
  } else {
    if (text.length > 45) {
      alert("Your task is too long!");
      return false;
    }
    //Find importance number
    if (priority >= 1 && priority <= 5) {
      resetInputs();
      //Div priority
      let priorityDiv = document.createElement("div");
      priorityDiv.innerText = JSON.parse(priority);
      priorityDiv.className = "todo-priority";
      priorityDiv.classList.add(findPriority(priority));
      //Div todo-text
      let textDiv = document.createElement("div");
      textDiv.innerText = text;
      textDiv.className = "todo-text";
      //Creating divs for every data element.
      let dateDiv = document.createElement("div");
      dateDiv.className = "todo-created-at";
      dateDiv.innerText = calculateTime(date);
      //remove button for task
      let removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.innerText = "remove";
      //creating and applying childs to a div which applies to todo container
      let div = document.createElement("div");

      div.appendChild(priorityDiv);
      div.appendChild(textDiv);
      div.appendChild(dateDiv);
      getEditTaskButton(div, textDiv);
      div.appendChild(removeButton);
      div.className = "todo-container";

      taskDiv.appendChild(div);
      ///Resetting sort button and text after adding new value.
      let sortDiv = document.getElementById("sort-div");
      sortDiv.innerText = "None";

      textDiv.addEventListener("click", (e) => {
        changeNumbers(textDiv);
      });
      bool = true;
      changeTotalLeft(true);
      removeButton.addEventListener("click", (e) => {
        if (!containsTicked(textDiv)) {
          changeTotalDone(true);
          changeTotalLeft(false);
        }
        removeTask(div, textDiv);
      });
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
  }
  return bool;
}
