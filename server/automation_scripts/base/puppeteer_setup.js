import puppeteer from "puppeteer";

export async function initBrowser(headless = true) {
  const browser = await puppeteer.launch({
    headless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // executablePath: '/usr/bin/chromium-browser' // adjust for Pi
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  return { browser, page };
}

export async function closeBrowser(browser) {
  await browser.close();
}
