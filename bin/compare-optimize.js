#!/usr/bin/env node
// @ts-check
/**
 * Compare the number of diagnostics produced by oxlint with
 * OXLINT_NO_OPTIMIZE=1 vs OXLINT_NO_OPTIMIZE=0.
 *
 * Usage: node compare-optimize.js "./oxlint <args> && ./oxlint <args>"
 * (Argument is the original command string from matrix.json)
 *
 * Exit code:
 *  0 - counts match for all oxlint invocations
 *  1 - mismatch found
 */

const { execSync } = require("node:child_process");

const cmd = process.argv[2];

if (!cmd) {
  console.error('USAGE: node compare-optimize.js "<matrix.command>"');
  process.exit(2);
}

let failed = false;

// Parse the summary line printed by oxlint, e.g.:
// "Found 0 warnings and 6 errors."
// Returns total diagnostics (warnings + errors) or null if not found.
const parseSummaryCount = (output) => {
  const match = output.match(
    /Found\s+(\d+)\s+warnings?\s+and\s+(\d+)\s+errors?\./
  );
  if (!match) return null;
  const warnings = Number(match[1]);
  const errors = Number(match[2]);
  return warnings + errors;
};

const run = (noOptimize) => {
  const env = { ...process.env, OXLINT_NO_OPTIMIZE: String(noOptimize) };
  try {
    // We intentionally do NOT inherit stdio to capture output.
    const out = execSync(cmd, {
      encoding: "utf8",
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return out;
  } catch (e) {
    // oxlint exits with 1 on diagnostics; we still want its output.
    if (e.stdout || e.stderr) {
      return (e.stdout || "") + (e.stderr || "");
    }
    throw e; // unexpected failure
  }
};

let out1, out0;
try {
  out1 = run(1);
  out0 = run(0);
} catch (err) {
  console.error("Unexpected execution failure for segment:", cmd);
  console.error(err);
  failed = true;
}

const c1 = parseSummaryCount(out1);
const c0 = parseSummaryCount(out0);

if (c1 == null || c0 == null) {
  failed = true;
  console.error("Failed to parse summary line in output for command:", cmd);
  if (c1 == null) console.error("  Missing summary for OXLINT_NO_OPTIMIZE=1");
  if (c0 == null) console.error("  Missing summary for OXLINT_NO_OPTIMIZE=0");
} else if (c1 !== c0) {
  failed = true;
  console.error("Mismatch in diagnostics count with/without optimization:");
  console.error(" Command:    ", cmd);
  console.error(" OXLINT_NO_OPTIMIZE=1 ->", c1);
  console.error(" OXLINT_NO_OPTIMIZE=0 ->", c0);
} else {
  console.log("[OK] same diagnostics total count:", c1, "for", cmd);
}

if (failed) {
  process.exit(1);
}

console.log("All oxlint invocations produced the same number of diagnostics.");
