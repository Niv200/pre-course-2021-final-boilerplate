/**
 * @jest-environment node
 */
const puppeteer = require("puppeteer");
const full4s = require("@suvelocity/tester");
const nock = require("nock");
const useNock = require("nock-puppeteer");

const path = "file://" + __dirname + "/src/index.html";
let page;
let browser;

const mockToDos = [
  {
    text: "task testing",
    priority: "4",
    date: new Date(),
  },
  {
    text: "task testing again",
    priority: "3",
    date: new Date(),
  },
];
const metadata = { id: "nvkdf48sd85jfnbvhfd72nd0", private: true };
const mocks = {
  initBin: {
    record: {
      "my-todo": [],
    },
    metadata,
  },
  toDoAddResponse: {
    record: {
      "my-todo": mockToDos.slice(0, 1),
    },
    metadata,
  },
  toDoAddSecondResponse: {
    record: {
      "my-todo": mockToDos,
    },
    metadata,
  },
  fetchTest: {
    record: {
      "my-todo": [
        {
          text: `only fetch will pass me haha magic number: ${Math.floor(
            Math.random() * 1000000
          )}`,
          priority: "1",
          date: new Date(),
        },
      ],
      metadata,
    },
  },
};

jest.setTimeout(10000);
const projectName = "pre.Todo App";

describe(projectName, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Uncomment me to see tests running in browser
      args: ["--disable-web-security"],
      slowMo: 20, // Uncomment and change me to slow down tests speed in browser.
    });
    page = await browser.newPage();
    useNock(page, ["https://api.jsonbin.io/v3"]);

    await full4s.beforeAll();
  });

  afterEach(async () => {
    await full4s.afterEach(page);
  });

  afterAll(async () => {
    await full4s.afterAll(projectName);
    await browser.close();
  });

  test("Can add todo task with text and priority", async () => {
    const mockToDo = mockToDos[0];
    const firstTaskText = mockToDo.text;
    const firstTaskPriority = mockToDo.priority;

    await nock("https://api.jsonbin.io/v3").get(/.*/).reply(200, mocks.initBin);

    await nock("https://api.jsonbin.io/v3")
      .put(/.*/, () => true)
      .reply(200, mocks.toDoAddResponse);

    await page.goto(path, { waitUntil: "networkidle0" });

    await page.type("#text-input", firstTaskText);
    await page.select("#priority-selector", firstTaskPriority);
    await page.click("#add-button");

    await page.waitForSelector(".todo-text");

    const elements = await page.$$(".todo-text");
    const firstItem = await (
      await elements[0].getProperty("innerText")
    ).jsonValue();

    await page.waitForSelector(".todo-priority");

    const priorityElements = await page.$$(".todo-priority");
    const firstItemPriority = await (
      await priorityElements[0].getProperty("innerText")
    ).jsonValue();

    expect(elements.length).toBe(1);
    expect(firstItem).toBe(firstTaskText);
    expect(firstItemPriority).toBe(firstTaskPriority);
  });
});
