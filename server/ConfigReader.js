"use strict"
const fs = require('fs');

let content;

module.exports = class ConfigReader {

  constructor() {
    content = fs.readFileSync("links.json");
  }

  getLinks() {
    return content;
  }
};