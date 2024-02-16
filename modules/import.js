const fs = require("fs");
const csv = require("fast-csv");
const mongoose = require("mongoose");
const path = require("path");
const Items = require("../schema/Items");

const importItems = async (fileName) => {
  try {
    const csvStream = fs.createReadStream(
      path.join(__dirname + `/../uploads/${fileName}`)
    );

    csv.parseStream(csvStream, { headers: true }).on("data", async (rows) => {
      for (const row of rows) {
        try {
          let item = await Items.findOne({ name: row.name });

          if (!item) {
            await Items.create(row);
          } else {
            await Items.updateOne({ name: row.name }, { $set: row });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = importItems;
