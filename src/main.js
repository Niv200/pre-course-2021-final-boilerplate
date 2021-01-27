totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
let tasksDone = [];
let tasksLeft = [];
function addTask() {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  input.onclick = taskChecked;
  let label = document.createElement("label");
  label.setAttribute("for", input.id);
  label.innerText = task;
  if (task.length <= 1) {
    alert("You need to add a task!");
  } else {
    //Find importance number
    let priorityInput = document.getElementById("priority-selector").value;
    if (priorityInput >= 1 && priorityInput <= 5) {
      let div = document.createElement("div");
      document.getElementsByTagName("input")[0].value = "";
      document.getElementsByTagName("select")[0].value = "";
      div.appendChild(input);
      div.appendChild(label);

      taskDiv.appendChild(div);
      console.log(document.getElementById("priority-selector"));

      totalItemsCount++;
      todoItemsCount++;
      if (todoItemsCount === 1) {
        document.getElementById("empty-list-span").style.display = "none";
      }
      ////
      console.log(getTaskAsObject(task, priorityInput, new Date()));
      ////
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
  }
}

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
function getTaskAsObject(text, priority, date) {
  return {
    text: text,
    priority: priority,
    date: date.now,
  };
}
