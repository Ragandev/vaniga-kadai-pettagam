const pdf = require("pdf-creator-node");
const fs = require("fs");

const html = fs.readFileSync("templates/invoice/default.html", "utf8");

const generatePdf = (company, user, items, invoice, path) => {
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
  };

  const document = {
    html: html,
    data: { company: company, user: user, items: items, invoice: invoice },
    path: path,
  };

  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = generatePdf;
