const fs = require("fs");
const csv = require("fast-csv");
const mongoose = require("mongoose");
const path = require("path");
const Items = require("../schema/Items");

const importItems = async (fileName) => {
  const csvStream = fs.createReadStream(
    path.join(__dirname + `/../uploads/${fileName}`)
  );
  csv
    .parseStream(csvStream, {
      headers: true,
    })
    .on("data", (rows) => {
      rows.forEach((row) => {
        try {
          //! Check Item is Exist
          let item = Items.findOne({ name: row.name });
          if (!item) {
            Items.updateOne({ name: row.name });
          } else {
            Items.updateOne({ name: row.name });
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
};

module.exports = importItems;
