#!/usr/bin/env node

const execSync = require("child_process").execSync;

const matrix = require("./matrix.json");

const binary = process.argv[2];

if (!binary) {
  console.error("USAGE: ./test.js PATH_TO_OXLINT_BINARY");
  return;
}

const args = process.argv.slice(3);

for (const item of matrix) {
  const oxlint = item.command.replace(/^.\/oxlint/, binary);
  const command = `cd repos/${item.path} && ${oxlint} ${args.join(' ')}`;
  console.log(command);
  execSync(command, { stdio: "inherit" });
}
