"use strict";
const fs = require("fs");
const crypto = require("crypto");

const input = fs.createReadStream("./data/data.txt");
let output = fs.createWriteStream("./data/data1.txt"),
    data;

// Часть 1 - закоментить всё что ниже, если нужно через pipe
input.on("readable", () => {
  while (data = input.read()) {
    let hash = crypto.createHash("md5").update(data).digest("hex");
    console.log(`MD5 of ${data.toString()}: ${hash}`);
    output.write(data, "utf8", () => {
      output.end();
      console.log("Done writing the file");
    });
  }
});

input.on("error", (err) => {
  console.error(`Unexpected ${err}`);
});

input.on("end", () => {
  console.log("Done reading the file");
});

// Рализация методом pipe, убрать коммент

//input.pipe(output);