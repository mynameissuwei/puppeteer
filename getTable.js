const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true, //不打开浏览器
  });
  const page = await browser.newPage();
  await page.goto("https://jx3.seasunwbl.com/buyer?t=role");

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
  console.log(result);
  await browser.close();
})();
