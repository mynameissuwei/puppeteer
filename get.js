const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //不打开浏览器
  });
  const page = await browser.newPage();
  await page.goto("https://jx3.seasunwbl.com/buyer?t=role");

  const roleItems = await page.$$(
    ".app-web-components-role-item-styles-index-m__userSelectNone--x29XJ"
  );
  for (let i = 0; i < roleItems.length; i++) {
    //点击列
    await roleItems[i].click();

    // wait for the modal to open
    await page.waitForSelector(".ant-modal-body");

    const modalText = await page.$eval(".ant-modal-body", (el) => {
      console.log(el, "eleme");
    });

    //获取弹框文本
    const alertText = await page.evaluate(() => {
      //   const code = document.querySelector(
      //     ".app-web-components-modal-components-role-detail-styles-role-info-m__flex70p--3evP9"
      //   ).innerText;
      console.log(
        document.querySelector(
          ".app-web-components-modal-components-role-detail-styles-role-info-m__flex70p--3evP9"
        )
      );
      //   return code;
    });

    console.log(alertText, modalText);
    await page.click(".ant-modal-close-x");
  }

  await browser.close();
})();
