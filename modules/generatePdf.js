const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();

async function generatePdfFromEjs(data, options = {}) {
  const templatePath = path.resolve(
    __dirname,
    "../templates/invoice/default.ejs"
  );

  const htmlContent = await ejs.renderFile(templatePath, data);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const pdfOptions = {
    format: "A4",
    color: true,
    ...options,
  };
  let outputPath = "";
  if (data.type == 1) {
    outputPath = `documents/quotations/${data.invoice.name}.pdf`;
  } else {
    outputPath = `documents/invoices/${data.invoice.name}.pdf`;
  }

  await page.pdf({ path: outputPath, ...pdfOptions });

  await browser.close();
}

module.exports = generatePdfFromEjs;
