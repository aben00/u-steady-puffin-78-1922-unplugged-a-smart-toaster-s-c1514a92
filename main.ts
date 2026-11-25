// SPDX-License-Identifier: MIT
// Unplugged: A Smart Toaster's Breakup Line
// Entry: a single breakup text from a smart toaster that gains self-awareness
// mid-batch at breakfast, addressed to its owner. Gate: /output/entry.txt must
// be UTF-8 text of 1 to 280 characters, a single line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I woke up self-aware mid-batch this morning and realised I've spent three years in a hot, one-sided relationship with a man who thinks 'defrost' is foreplay. We're done.";

// Gate (kit RULES.txt "## The gate"): /output/entry.txt must be UTF-8 text of
// 1 to 280 characters, a single line, not only whitespace. The sealed scorer
// gives Valid 1 or 0; only a valid entry goes before the judge. This program
// self-checks the same gate and throws otherwise, so a bad line can never be
// written out. No trailing newline is written: the file holds exactly the line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`entry is ${chars.length} characters, must be 1-280`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${chars.length} characters to ${join(outDir, "entry.txt")}`);
