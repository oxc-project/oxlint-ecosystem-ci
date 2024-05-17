#!/usr/bin/env node

const exec = require("child_process").exec;

const matrix = require("./matrix.json");

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
