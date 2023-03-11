const axios = require("axios");
const puppeteer = require("puppeteer");

(async () => {
  let wsKey = await axios.get("http://localhost:9222/json/version");
  let browser = await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
  });
  console.log(wsKey.data.webSocketDebuggerUrl, "asdf");

  let page = await browser.newPage();
  const document = await page.evaluate(() => document);

  await page.goto("https://jx3.seasunwbl.com/buyer?t=role");

  const roleItems = await page.$$(
    ".app-web-components-role-item-styles-index-m__userSelectNone--x29XJ"
  );

  for (let i = 0; i < roleItems.length; i++) {
    //点击列
    await roleItems[i].click();

    // wait for the modal to open
    await page.waitForSelector(".ant-modal");

    const alertText = await page.evaluate(() => {
      const code = Array.from(
        document.querySelectorAll(
          ".app-web-components-modal-components-role-detail-styles-role-info-m__flex70p--3evP9"
        )
      );
      const price = document.querySelector(
        ".app-web-components-modal-components-role-detail-styles-price-m__highLightColor--3UgBG"
      ).innerText;

      const focus = document.querySelector(
        ".app-web-components-modal-components-role-detail-styles-index-m__flexWrap--11f5u"
      ).innerText;
      console.log(focus, "price");

      let result = code.map((item) => {
        return item.innerText;
      });
      console.log(code, "code");
      console.log(result, "result");
      return result[1];
    });
    console.log(alertText, "123");

    // await page.click(".ant-modal-close-x");
  }
  // await page.close()
  // await browser.disconnect()
})();
