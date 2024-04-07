const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch(
    {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
      args: ['--start-maximized']
    });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://minzdrav.astrobl.ru/o-ministerstve/podvedomstvennye-ucrezdeniya')
  const hospitals = await page.$$('div.row.pt-4 > .portlet');
  let id = 1;
  for (const hospital of hospitals) {
    try {
      const title = await page.evaluate(el => el.querySelector("div > a.color-dark > h4").innerText, hospital)
      const number = await page.evaluate(el => el.querySelector("div > div.d-flex.flex-wrap > div:nth-child(1)").textContent, hospital)
      const street = await page.evaluate(el => el.querySelector("   div.row.pt-4  div > div > div:nth-child(4) > a").innerText, hospital)
      const leaderName = await page.evaluate(el => el.querySelector("div.row.pt-4  div  div > div.d-flex.align-items-center.mt-3 > div:nth-child(2) > h6").innerText, hospital)
      const leaderJobTitle = await page.evaluate(el => el.querySelector("div.row.pt-4  div  div > div.d-flex.align-items-center.mt-3 > div:nth-child(2) > small").innerText, hospital)
      const email = await page.evaluate(el => el.querySelector("div.row.pt-4 div div > div.d-flex.flex-wrap > div:nth-child(3) > a").innerText, hospital)
      console.log(count + '\n' + title + '\n' + number + '\n' + street + '\n' + leaderName + '\n' + leaderJobTitle + '\n' + email + '\n' + '--------------------------------------------------');
      id += 1
    } catch (e) {

    }
  }
  await browser.close()
})();