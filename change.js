const puppeteer = require("puppeteer");
const axios = require("axios");

(async () => {
  let wsKey = await axios.get("http://localhost:9222/json/version");
  let browser = await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
  });
  let page = await browser.newPage();
  await page.goto("https://jx3.seasunwbl.com/buyer?t=role");

  // 获取最后一页的页码
  const lastPageNumber = 100;
  const dataList = [];

  // 遍历每一页
  for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
    if (pageNumber > 1) {
      // 从第二页开始，点击分页
      await page.click(".ant-pagination-item-" + pageNumber);
      // 等待页面加载完成
      await page.waitForTimeout(1000);
    }

    // 获取页面数据
    let result = await page.evaluate(() => {
      const list = Array.from(
        document.querySelectorAll(
          ".app-web-components-role-item-styles-index-m__roleItem--1R4F8"
        )
      );
      const data = list.map((item) => {
        const level = item.querySelector(
          ".app-web-components-role-item-styles-index-m__roleItemLevel--3Orly"
        ).innerText;
        const school = item.querySelector(
          ".app-web-components-role-item-styles-index-m__fs14--2kvLR"
        ).innerText;
        const price = item.querySelector(
          ".app-web-components-role-item-styles-index-m__roleItemPrice--3EMVN"
        ).innerText;
        const time = item.querySelector(
          ".app-web-components-role-item-styles-index-m__roleItemLeftTime--27PUl"
        ).innerText;
        const focus = item.querySelector(
          ".app-web-components-like-styles-index-m__fs12--3Ei06"
        ).innerText;
        const status = item.querySelector(
          ".app-web-components-role-item-styles-index-m__roleItemStatus--2WpS5"
        ).innerText;

        return {
          level,
          school,
          price,
          time,
          focus,
          status,
        };
      });

      return data;
    });
    dataList.push(...result);
  }

  console.log(dataList);

  await browser.close();
})();
