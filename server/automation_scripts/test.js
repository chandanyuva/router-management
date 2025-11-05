const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 50000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1353,
      height: 911
    })
  }
  {
    const targetPage = page;
    await targetPage.goto('chrome://new-tab-page/');
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator('::-p-aria(Search Google or type a URL)'),
      targetPage.locator('ntp-app >>>> #searchbox >>>> #input'),
      targetPage.locator(':scope >>> #searchbox >>>> :scope >>> #input')
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 275.5,
          y: 29,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator('::-p-aria(Search Google or type a URL)'),
      targetPage.locator('ntp-app >>>> #searchbox >>>> #input'),
      targetPage.locator(':scope >>> #searchbox >>>> :scope >>> #input')
    ])
      .setTimeout(timeout)
      .fill('hellow');
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down('Enter');
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up('Enter');
  }
  {
    const targetPage = page;
    await targetPage.goto('https://www.google.com/search?q=hellow&oq=hellow&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABixAxiABDINCAIQLhiDARixAxiABDIJCAMQABgKGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgcIBhAAGIAEMhAIBxAuGK8BGMcBGIAEGI4FMgcICBAAGIAEMhAICRAuGK8BGMcBGIAEGI4F0gEJMzYwNmowajE1qAIIsAIB8QUMm0ZoYrU9yw&sourceid=chrome&ie=UTF-8');
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
      targetPage.locator('#APjFqb'),
      targetPage.locator('::-p-xpath(//*[@id=\\"APjFqb\\"])'),
      targetPage.locator(':scope >>> #APjFqb')
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 63.33332824707031,
          y: 16.333332061767578,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
      targetPage.locator('#APjFqb'),
      targetPage.locator('::-p-xpath(//*[@id=\\"APjFqb\\"])'),
      targetPage.locator(':scope >>> #APjFqb')
    ])
      .setTimeout(timeout)
      .fill('hello');
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    }
    await targetPage.keyboard.down('Enter');
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up('Enter');
  }

  await browser.close();

})().catch(err => {
  console.error(err);
  process.exit(1);
});

