"use strict";

const fs = require("fs");
const crypto = require("crypto");
const Transform = require("stream").Transform;


const input = fs.readFile("./data/data.txt", "utf8", (err, content) => {
    if (err) throw err;
    tr.write(content);
});

let output = fs.createWriteStream("./data/data1.txt");

class CT extends Transform {
    constructor() {
        super();
    }
    makeHash(err, data) {
        let cData = crypto.createHash("md5").update(data).digest("hex");
        console.log(`MD5 of ${data.toString()}: ${cData}`);
        output.write(cData, "utf8", () => {
            output.end();
            console.log("Done writing the file");
        });
    }

    _transform(chunk, encoding, callback) {
        callback(null, chunk);
    }
}

let tr = new CT;

tr.on("data", (chunk) => tr._transform(chunk, "utf8", tr.makeHash));

tr.on("error", (err) => {
    console.error(`Unexpected ${err}`);
});