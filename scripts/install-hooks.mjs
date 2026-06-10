#!/usr/bin/env node
import { chmodSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const hooksDir = join(repoRoot, ".git/hooks");

if (!existsSync(hooksDir)) {
  console.log("Not a git repository, skipping hook install");
  process.exit(0);
}

const source = join(repoRoot, "scripts/pre-push");
const destination = join(hooksDir, "pre-push");

copyFileSync(source, destination);

try {
  chmodSync(destination, 0o755);
} catch {
  // Windows may not support POSIX executable bits; copying the hook is enough.
}

console.log("Installed git hooks: pre-push");
