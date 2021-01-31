const path = "file://" + __dirname + "/src/index.html";
const puppeteer = require("puppeteer");

test("Adding first task.", async () => {
  const browser = await puppeteer.launch({
    headless: false, // Uncomment me to see tests running in browser
    args: ["--disable-web-security"],
    slowMo: 50, // Uncomment and change me to slow down tests speed in browser.
  });
  const page = await browser.newPage();
  page.goto(path);
});
