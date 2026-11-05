import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

// Searches tracked and new files; anything in .gitignore (like .env.local) is skipped.
function findInRepo(pattern, ...excluded) {
  const { status, stdout, stderr } = spawnSync(
    "git",
    ["grep", "--untracked", "-I", "-l", "-E", pattern, "--", ".", ...excluded.map((f) => `:!${f}`)],
    { encoding: "utf8" }
  );
  // git grep exits 1 when nothing matches, and higher on a real failure.
  assert.ok(status === 0 || status === 1, `git grep failed: ${stderr}`);
  return stdout.split("\n").filter(Boolean);
}

test("no file contains a database URL with a password in it", () => {
  assert.deepEqual(findInRepo("postgres(ql)?://[^[:space:]\"'`]*:[^[:space:]\"'`@]+@"), []);
});

test("no script has a default admin password", () => {
  assert.deepEqual(findInRepo("admin123", "scripts/no-secrets.test.mjs"), []);
});

test("no code falls back to a default JWT secret", () => {
  assert.deepEqual(findInRepo("fallback-secret", "src/lib/jwt.test.mjs", "scripts/no-secrets.test.mjs"), []);
});
