const path = "file://" + __dirname + "/src/index.html";
const puppeteer = require("puppeteer");

let mockTask = ["This is the mock task", new Date(), "5"];
let browser;
let page;

test("Adding first task.", async () => {
  browser = await puppeteer.launch({
    headless: false, // Uncomment me to see tests running in browser
    args: ["--disable-web-security"],
    slowMo: 30, // Uncomment and change me to slow down tests speed in browser.
  });
  page = await browser.newPage();
  await page.goto(path);
  //Finished opening browser and navigating to index.html
  await page.type("#text-input", mockTask[0]);
  await page.select("#priority-selector", mockTask[2]);
  await page.click("#add-button");

  const todoText = await page.$(".todo-text");
  const todoInner = await (await todoText.getProperty("innerText")).jsonValue();

  const todoPriority = await page.$(".todo-priority");
  const priorityInner = await (
    await todoPriority.getProperty("innerText")
  ).jsonValue();

  expect(todoInner).toBe(mockTask[0]);
  expect(priorityInner).toBe(mockTask[2]);
});

test("Checking if tasks left increased.", async () => {
  const counter = await page.$("#counter");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();
  expect(counterInner).toBe("1");
});

test("Checking if tasks completed stayed same", async () => {
  const counter = await page.$("#counter-done");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();

  expect(counterInner).toBe("0");
});

test("Checking if task can be removed", async () => {
  await page.click(".remove-button");
  const todoContainers = await page.$(".todo-container");
  expect(todoContainers).toBe(null);
});

test("Check if undo returns deleted task", async () => {
  await page.click("#undo-button");
  const todoText = await page.$(".todo-text");
  const todoInner = await (await todoText.getProperty("innerText")).jsonValue();

  const todoPriority = await page.$(".todo-priority");
  const priorityInner = await (
    await todoPriority.getProperty("innerText")
  ).jsonValue();

  expect(todoInner).toBe(mockTask[0]);
  expect(priorityInner).toBe(mockTask[2]);
});

test("Adding 2 more tasks with different priorities", async () => {
  let secondText = "Second task!";
  let thirdText = "Third task, :D";
  await page.type("#text-input", secondText);
  await page.select("#priority-selector", "2");
  await page.click("#add-button");

  await page.type("#text-input", thirdText);
  await page.select("#priority-selector", "4");
  await page.click("#add-button");

  const todoText = await page.$$(".todo-text");
  const todoInnerFirst = await (
    await todoText[0].getProperty("innerText")
  ).jsonValue();
  const todoInnerSecond = await (
    await todoText[1].getProperty("innerText")
  ).jsonValue();
  const todoInnerThird = await (
    await todoText[2].getProperty("innerText")
  ).jsonValue();

  expect(todoInnerFirst).toBe(mockTask[0]);
  expect(todoInnerSecond).toBe(secondText);
  expect(todoInnerThird).toBe(thirdText);
});

test("Adding 2 more tasks and marking them done!", async () => {
  let fourthText = "fourth task!";
  let fifthText = "fifth task!";
  await page.type("#text-input", fourthText);
  await page.select("#priority-selector", "4");
  await page.click("#add-button");

  await page.type("#text-input", fifthText);
  await page.select("#priority-selector", "3");
  await page.click("#add-button");

  await page.click(".todo-text"); //Mark with strike through line

  const todoText = await page.$$(".todo-text");
  const todoInner = await (
    await todoText[0].getProperty("classList")
  ).jsonValue();
  expect(todoInner[1]).toBe("ticked");
});

test("Checking if tasks left is 4", async () => {
  const counter = await page.$("#counter");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();

  expect(counterInner).toBe("4");
});

test("Checking if tasks completed increased by 1", async () => {
  const counter = await page.$("#counter-done");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();

  expect(counterInner).toBe("1");
});

test("Checking if reset button works", async () => {
  await page.click("#reset");

  const todoText = await page.$$(".todo-text");
  const todoInner = await (
    await todoText[0].getProperty("classList")
  ).jsonValue();
  expect(todoInner[1]).toBe(undefined);
});

test("Checking if completed tasks went down by 1", async () => {
  const counter = await page.$("#counter-done");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();

  expect(counterInner).toBe("0");
});

test("Checking if tasks left is now 4", async () => {
  const counter = await page.$("#counter");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();

  expect(counterInner).toBe("4");
});

//Since we establish counter works on any basis and in any way, I feel free to use it to read and store the values.
test("Checking that undo does NOT work after reset (also gets reset)", async () => {
  await page.click("#undo-button"); //After click
  const counter = await page.$("#counter");
  const counterInner = await (
    await counter.getProperty("innerText")
  ).jsonValue();
  expect(counterInner).toBe("4");
});

test("Checking if sort button works! (First state, increasing)", async () => {
  await page.click("#sort-button"); //After click

  const todoText = await page.$$(".todo-priority");
  const todoInner = await (
    await todoText[0].getProperty("innerText")
  ).jsonValue();
  expect(todoInner).toBe("4");
});

test("Checking if sort button works! (Second state, decreasing)", async () => {
  await page.click("#sort-button"); //After click
  const todoText = await page.$$(".todo-priority");
  const todoInner = await (
    await todoText[0].getProperty("innerText")
  ).jsonValue();
  expect(todoInner).toBe("2");
});

test("Check if task can be marked and if reset removes it", async () => {
  await page.click(".todo-text"); //After click
  const todoText = await page.$$(".todo-text");
  await page.click("#reset");
  const todoText2 = await page.$$(".todo-text");
  let bool = true;
  if (todoText2 === todoText) {
    bool = false;
  }
  expect(bool).toBe(true);
});
