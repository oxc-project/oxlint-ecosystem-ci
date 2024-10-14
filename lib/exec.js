const matrix = require("../matrix.json");
const assert = require("assert");
const { exec } = require("child_process");
const fs = require("fs");

const isStringArray = arr =>
  Array.isArray(arr) && arr.every(i => typeof i === "string");

/**
 * Execute a command in each repository
 * @param {string | string[]} command the command to run. If an array, it will be joined with `&&`.
 */
const execEachRepo = async command => {
  assert(
    typeof command === "string" || isStringArray(command),
    "cmd must be a string or array of strings"
  );
  const cmd = Array.isArray(command) ? command.join(" && ") : command;

  assert(
    fs.existsSync("repos"),
    "No repositories found, did you forget to run `pnpm clone`?"
  );

  for (const item of matrix) {
    const command = `cd repos/${item.path} && ${cmd}`;
    console.log(command);

    exec(command, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Finished: ${item.repository}`);
    });
  }
};

module.exports = { execEachRepo };
