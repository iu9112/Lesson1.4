"use strict";

const fs        = require("fs");

const Transform = require("stream").Transform;
const Readable  = require("stream").Readable;
const Writable  = require("stream").Writable;

class MyReadable extends Readable {
  constructor(options) {
    super(options);
  }

  generateRandomNums() {
    let num = Math.floor(Math.random() * 1000);
    return num.toString()
  }

  _read() {
    setTimeout(() => {
      this.push(this.generateRandomNums());
    }, 1000);
  }
}

class MyWritable extends Writable {
  constructor() {
    super();
  }

  _write(chunk, encoding, next) {
    console.dir(chunk.toString());
    next();
  }
}

class MyTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
      let nData = chunk + "7";
      this.push(nData);
      callback();
  }
}

let r = new MyReadable;
let w = new MyWritable;
let t = new MyTransform;

r.pipe(t).pipe(w);