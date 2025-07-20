const { chromium } = require('playwright');

async function getTableSum(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const sum = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll("table"));
    let total = 0;

    for (const table of tables) {
      const cells = table.querySelectorAll("td");
      for (const cell of cells) {
        const num = parseFloat(cell.textContent.trim());
        if (!isNaN(num)) total += num;
      }
    }
    return total;
  });

  await browser.close();
  return sum;
}

(async () => {
  const base = 'https://datadash-iitm.github.io/qa-tables/seed';
  let grandTotal = 0;

  for (let i = 10; i <= 19; i++) {
    const url = `${base}${i}`;
    const sum = await getTableSum(url);
    console.log(`Seed ${i} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("🔢 Grand Total =", grandTotal);
})();
