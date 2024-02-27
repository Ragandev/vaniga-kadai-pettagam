const pdf = require("pdf-creator-node");
const fs = require("fs");

const html = fs.readFileSync("templates/invoice/default.html", "utf8");


const generatePdf = (data, path) => {
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
  };

  const document = {
    html: html,
    data: data,
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
