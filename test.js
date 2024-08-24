#!/usr/bin/env node

const assert = require("node:assert")
const { execSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");

const matrix = require("./matrix.json");

let binary = process.argv[2];

if (!binary) {
  console.error("USAGE: ./test.js PATH_TO_OXLINT_BINARY");
  process.exit(0);
}
binary = resolve(binary); // normalize relative paths

assert(existsSync("repos"), "No repositories found, did you forget to run clone.js?");

const args = process.argv.slice(3);

for (const item of matrix) {
  const oxlint = item.command.replace(/^.\/oxlint/, binary);
  const command = `cd repos/${item.path} && ${oxlint} ${args.join(' ')}`;
  console.log(command);
  execSync(command, { stdio: "inherit" });
}
