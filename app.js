const puppeteer = require("puppeteer");

// links for docs "https://developer.chrome.com/docs/puppeteer/get-started/"

//taking ss for 1 page --------------------------------------------------------------------------------------------
const takeSS = async () => {
  //Establishing a browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://gaana.com/lyrics");
  await page.screenshot({
    path: "./screenhots/images.jpeg",
    fullPage: false,
    quality: 50,
    omitBackground: false,
  });

  await browser.close();
};
takeSS();

// take ss for multiple pages when we have hard coded urls given ----------------------------------------------------
async function takeScreenshots() {
  // URLs to screenshot
  const urls = [
    "https://gaana.com/lyrics",
    "https://google.com",
    "https://github.com",
  ];
  const browser = await puppeteer.launch();

  for (let i = 0; i < urls.length; i++) {
    const page = await browser.newPage();
    await page.goto(urls[i], { waitUntil: "networkidle2" });
    await page.screenshot({ path: `screenshot_${i}.png` });
    await page.close();
  }
  await browser.close();
}
takeScreenshots();

//taking ss for multiuple pages of a website goto to one page and then take ss of them -----------------------
const takeScreenshot = async () => {
  // Establishing a browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://gaana.com/lyrics");

  const rows = await page.$$("div.lry_ul a");
  // const rows = document.querySelectorAll("div.lry_ul a");
  const link = [];
  for (let i = 0; i < rows.length; i++) {
    link.push(rows[i].href);
  }

  console.log(link);

  for (let i = 0; i < link.length; i++) {
    await page.goto(link[i]);
    await page.screenshot({
      path: `screenshotsss_${i}.png`,
      fullPage: false,
    });
  }
  await browser.close();
};
takeScreenshot();
