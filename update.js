#!/usr/bin/env node

const assert = require("node:assert");
const exec = require("node:child_process").exec;
const { existsSync } = require("node:fs");

const matrix = require("./matrix.json");

assert(existsSync("repos"), "No repositories found, did you forget to run clone.js?");

for (const item of matrix) {
  const command = `cd repos/${item.path} && git pull`;

  console.log(`Running ${command}`);
  exec(command, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Updated ${item.repository}`);
  });
}
