const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

const baseOptions = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS
  ? baseOptions.headless()
  : baseOptions;

describe("google Search", () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://www.google.com");
  });

  afterAll(() => {
    browser.quit();
  });

  test("should be on google search page", async () => {
    const searchBox = await browser.findElement(By.name("q"));
    await browser.wait(until.elementIsVisible(searchBox), 5000);

    const title = await browser.getTitle();
    expect(title).toEqual("Google");
  });

  test("should search for Cheese!", async () => {
    const searchBox = await browser.findElement(By.name("q"));
    expect(await searchBox.isDisplayed()).toBe(true);
    searchBox.sendKeys("Cheese!", Key.ENTER);
  });

  test('the page title should start with "Cheese!"', async () => {
    await browser.wait(until.urlContains("search"), 5000);

    const title = await browser.getTitle();
    const words = title.split(" ");
    expect(words[0]).toBe("Cheese!");
  });
});
