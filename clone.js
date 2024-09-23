#!/usr/bin/env node

const exec = require("child_process").exec;

const matrix = require("./matrix.json");

for (const item of matrix) {
  const command = `git clone --depth=1 --filter blob:limit=200k --no-tags -b ${item.ref} git@github.com:${item.repository}.git repos/${item.path}`;

  console.log(`Running ${command}`);
  exec(command, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Cloned ${item.repository}`);
  });
}
