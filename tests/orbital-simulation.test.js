const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

const result = spawnSync("python3", ["tests/test_orbital_simulation.py"], {
  cwd: process.cwd(),
  encoding: "utf8",
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
assert.equal(result.status, 0, "Python orbital-density simulation checks pass");
