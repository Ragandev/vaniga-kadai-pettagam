const PDFDocument = require("pdfkit");
const fs = require("fs");

let a = {
  company: {
    name: "Ragan Dimension",
    address: "123, anyStreet, Any Town, America - 325410",
    gst: "AAADADA4565522SS",
  },
  user: {
    name: "Example Vendor",
    address: "123 Main Street, City, Country",
    phone: "+1234567890",
  },
  invoice: {
    number: "AABBCC-123",
    date: "15-0-2024",
  },
  items: [
    {
      item: "IQOO 9 SE",
      unit: "Pcs",
      qty: 1,
      unitprice: 34000,
      tax: 18,
      subtotal: 34000,
    },
    {
      item: "IQOO 9 SE",
      unit: "Pcs",
      qty: 1,
      unitprice: 34000,
      tax: 18,
      subtotal: 34000,
    },
    {
      item: "IQOO 9 SE",
      unit: "Pcs",
      qty: 1,
      unitprice: 34000,
      tax: 18,
      subtotal: 34000,
    },
    {
      item: "IQOO 9 SE",
      unit: "Pcs",
      qty: 1,
      unitprice: 34000,
      tax: 18,
      subtotal: 34000,
    },
    {
      item: "IQOO 9 SE",
      unit: "Pcs",
      qty: 1,
      unitprice: 34000,
      tax: 18,
      subtotal: 34000,
    },
  ],
  total: 34000 * 3,
};

const generateInvoice = async (data, filePath, type) => {
  const doc = new PDFDocument({ size: "A4", margin: 20 });
  doc.pipe(fs.createWriteStream(filePath));
  doc.font("Helvetica").lineGap(5);

  doc
    .fontSize(20)
    .fillColor("#ffc809")
    .text(type, { align: "center", bold: true })
    .moveDown();

  doc
    .fontSize(12)
    .fillColor("black")
    .text(`${data.company.name}`, { bold: true, float: "left" })
    .text(`${data.company.address}`)
    .text(`${data.company.gst}`)
    .moveDown();

  doc
    .text(`Invoice Number: ${data.invoice.number}`, 20, 76, { align: "right" })
    .text(`Date: ${data.invoice.date}`, { align: "right" })
    .moveDown();

  doc.moveDown();

  doc
    .fontSize(12)
    .text("Bill To:")
    .text(`${data.user.name}`)
    .text(`${data.user.address}`)
    .text(`${data.user.phone}`)
    .moveDown();

  doc.rect(20, 230, 555, 0).stroke();
  doc.rect(20, 255, 555, 0).stroke();

  // Table Headers
  const tableHeaders = [
    "#",
    "Item",
    "Unit",
    "Qty",
    "Unit Price",
    "Tax",
    "Total",
  ];

  const tableRows = data.items.map((item, index) => [
    index + 1,
    item.item,
    item.unit,
    item.qty,
    item.unitprice,
    item.tax,
    item.subtotal,
  ]);

  // Draw table
  const tableTop = 240;
  const rowHeight = 25;
  const columnWidth = 80;
  const startX = 20;
  let startY = tableTop;

  doc.font("Helvetica-Bold");
  tableHeaders.forEach((header, i) => {
    doc.fillColor("#ffc809");
    doc.text(header, startX + i * columnWidth, startY);
  });

  doc.font("Helvetica");
  startY += rowHeight;
  tableRows.forEach((row) => {
    row.forEach((cell, i) => {
      doc.fillColor("black");
      doc.text(cell.toString(), startX + i * columnWidth, startY);
    });
    startY += rowHeight;
  });

  doc.rect(20, startY, 555, 0).stroke();

  let subTotal = 0;
  data.items.forEach((item) => {
    subTotal += item.subtotal;
  });

  console.log(subTotal);

  doc.moveDown();

  doc.text(`Sub Total : ${subTotal}`, { align: "left" });

  doc.end();
};

generateInvoice(a, "a.pdf", "INVOICE");
