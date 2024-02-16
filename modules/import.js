const fs = require("fs");
const csv = require("fast-csv");
const mongoose = require("mongoose");
const Items = require("../schema/Items");

const importItems = async (fileName) => {
    const csvStream = fs.createReadStream(`../uploads/${fileName}`);
    csv.parseStream(csvStream, {
        headers: true
    }).on('data', (row)=>{
        console.log(row);
    })
};

module.exports = importItems;
