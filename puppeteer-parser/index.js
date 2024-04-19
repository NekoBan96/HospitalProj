const puppeteer = require('puppeteer');
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "alisher11",
    host: "localhost",
    port: 5432,
    database: "hospitalProject"
});

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        userDataDir: "./tmp",
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://minzdrav.astrobl.ru/o-ministerstve/podvedomstvennye-ucrezdeniya');

    const hospitals = await page.$$('div.row.pt-4 > .portlet');

    for (const hospital of hospitals) {
        try {
            const hospitalName = await page.evaluate(el => el.querySelector("div > a.color-dark > h4").innerText, hospital)
            const number = await page.evaluate(el => el.querySelector("div > div.d-flex.flex-wrap > div:nth-child(1)").textContent, hospital)
            const street = await page.evaluate(el => el.querySelector("   div.row.pt-4  div > div > div:nth-child(4) > a").innerText, hospital)
            const leaderName = await page.evaluate(el => el.querySelector("div.row.pt-4  div  div > div.d-flex.align-items-center.mt-3 > div:nth-child(2) > h6").innerText, hospital)
            const leaderJobTitle = await page.evaluate(el => el.querySelector("div.row.pt-4  div  div > div.d-flex.align-items-center.mt-3 > div:nth-child(2) > small").innerText, hospital)
            const email = await page.evaluate(el => el.querySelector("div.row.pt-4 div div > div.d-flex.flex-wrap > div:nth-child(3) > a").innerText, hospital)

            const query = `
                INSERT INTO hospitals (hospital_name, geo_pos, leader_name, leader_job_title, email, tel_num)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;

            await pool.query(query, [hospitalName, street, leaderName, leaderJobTitle, email, number]);

        } catch (e) {
            console.error(e);
        }
    }

    await browser.close();
    await pool.end();
})();