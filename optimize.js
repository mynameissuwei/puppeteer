const axios = require("axios");
const puppeteer = require("puppeteer");

(async () => {
  let wsKey = await axios.get("http://localhost:9222/json/version");
  let browser = await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
  });
  let page = await browser.newPage();
  await page.goto("https://jx3.seasunwbl.com/buyer?t=role");

  const roleItems = await page.$$(
    ".app-web-components-role-item-styles-index-m__userSelectNone--x29XJ"
  );
  console.log(roleItems, "roleItems");
  //   for (let i = 0; i < roleItems.length; i++) {
  //     await roleItems[i].click();

  //     await page.waitForSelector(".ant-modal");

  //     // const alertText = await page.evaluate(() => {
  //     //   const code = Array.from(
  //     //     document.querySelectorAll(
  //     //       ".app-web-components-modal-components-role-detail-styles-role-info-m__flex70p--3evP9"
  //     //     )
  //     //   );
  //     //   let result = code.map((item) => {
  //     //     return { code: item.innerText };
  //     //   });
  //     //   return result[1];
  //     // });
  //     await page.click(".ant-modal-close-x");
  //   }
})();
