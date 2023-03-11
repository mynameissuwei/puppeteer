const axios = require("axios");
const puppeteer = require("puppeteer");

(async () => {
  let wsKey = await axios.get("http://localhost:9222/json/version");
  let browser = await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
  });
  console.log(wsKey.data.webSocketDebuggerUrl, "asdf");

  let page = await browser.newPage();
  await page.goto("https://blogweb.cn");

  // await page.close()
  // await browser.disconnect()
})();
