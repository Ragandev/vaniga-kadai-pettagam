const fs = require("fs");
const pdfmake = require("pdfmake");
const generalsetting = require("../schema/generalsetting");
const user = require("../schema/Users");
const dbConnect = require("../config/db");
dbConnect();
require("dotenv").config();

// Set PDFMake fonts
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};
const printer = new pdfmake(fonts);

// Function to fetch company data
const fetchCompanyData = async () => {
  try {
    return await generalsetting.findOne();
  } catch (error) {
    console.error("Error fetching company data:", error);
    return null;
  }
};

// Function to fetch user data
const fetchUserData = async () => {
  try {
    return await user.findOne();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Generate PDF
const generatePdf = async () => { 
  try {
    // Fetch company data
    const companyData = await fetchCompanyData();
    const userData = await fetchUserData();

    if (!companyData) {
      console.error("Company data not found!");
      return;
    }

    // Construct image URL
    const templatePath = process.env.BASEURL + "uploads/logo/";
    const imagePath = templatePath + companyData.logo;

    // Check if imagePath is valid
    if (!fs.existsSync(imagePath)) {
      console.error("Image file not found:", imagePath);
      return;
    }

    // Convert image to data URL
    const imageData = fs.readFileSync(imagePath).toString("base64");
    const imageUrl = `data:image/png;base64,${imageData}`;

// Define document content
const docDefinition = {
  content: [
    { text: "INVOICE", style: "title" },
    { text: "\n\n" },
    {
      columns: [
        {
          image: imageUrl,
          width: 200,
          alignment: "center",
        },
        {
          text: [
            { text: companyData.companyname + "\n", style: "header" },
            { text: companyData.address +"\n", style: "subheader" },
            { text: companyData.gstnumber + "\n", style: "subheader" },
          ],
          alignment: "right",
        },
      ],
    },
    { text: "\n\n" },
    { text: "Bill To", style: "header" },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, eum.",
    { text: "\n" },
    { text: "Ship To", style: "header" },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, eum.",
    { text: "\n" },
    { text: "Invoice Details", style: "header" },
    { text: "Invoice Number : Infy/24-25/4552", style: "subheader" },
    { text: "Date : 19/2/2024", style: "subheader" },
    { text: "\n" },
    {
      table: {
        headerRows: 1,
        widths: ["auto", "*", "auto", "auto", "auto"],
        body: [
          ["S.No", "Item", "Qty", "Price", "Total"],
          [1, "Lenova Laptop", 50000, 10, 500000],
          [2, "Lenova Laptop", 50000, 10, 500000],
          [3, "Lenova Laptop", 50000, 10, 500000],
          [4, "Lenova Laptop", 50000, 10, 500000],
          [5, "Lenova Laptop", 50000, 10, 500000],
        ],
      },
    },
    { text: "\n" },
    { text: "Thank you for your business", style: "header" },
    "Terms & Conditions",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, atque? lorem",
    { text: "\n" },
    { text: "Sub Total: ₹223000", style: "subheader" },
    { text: "Tax: 18%", style: "subheader" },
    { text: "\n" },
    { text: "Payment Info:", style: "header" },
    "Account : 5412454584545488454",
    "A/C Name : India Bank",
    "Bank Details : abc Street, Near to Coimbatore",
    { text: "\n\n" },
    {
      columns: [
        { text: "Phone | Address | Website", alignment: "left" },
        { text: "Authorised Sign", alignment: "right" },
      ],
    },
  ],
  styles: {
    title: {
      fontSize: 28,
      bold: true,
      alignment: "center",
    },
    header: {
      fontSize: 18,
      bold: true,
    },
    subheader: {
      fontSize: 12,
    },
  },
};

// Create PDF buffer
const pdfDoc = printer.createPdfKitDocument(docDefinition);
const chunks = [];

// Listen for data events to collect PDF chunks
pdfDoc.on("data", (chunk) => {
  chunks.push(chunk);
});

// Listen for end event to know when the PDF is generated
pdfDoc.on("end", () => {
  const pdfBuffer = Buffer.concat(chunks);

  // Write the buffer to a file
  fs.writeFile("example.pdf", pdfBuffer, (err) => {
    if (err) {
      console.error("Error writing PDF file:", err);
    } else {
      console.log("PDF file saved successfully!");
    }
  });
});

// Handle errors during PDF generation
pdfDoc.on("error", (error) => {
  console.error("Error generating PDF:", error);
});

// Finalize PDF generation
pdfDoc.end();
} catch (error) {
console.error("Error generating PDF:", error);
}
};

// Generate PDF
generatePdf();