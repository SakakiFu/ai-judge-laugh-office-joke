// Entry for the make.fun bounty "Make the AI Judge Laugh"
// (slug: u-rama-melon-make-the-ai-judge-laugh-302d0825).
//
// The entry is a single one-line joke about office life. Running this
// program writes the joke to entry.txt inside the output directory
// the grader provides (MAKEFUN_OUTPUT_DIR), or in this file's own
// directory when that variable is not set. The program is
// deterministic: it reads no input files and uses no clock, no
// randomness and no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const JOKE =
  "I put 'per my last email' in my email signature, so now every email I send is technically a sequel.";

function main(): void {
  // This bounty's gate accepts UTF-8 text of 1 to 200 characters.
  if (JOKE.length < 1 || JOKE.length > 200) {
    throw new Error(
      `joke is ${JOKE.length} characters, outside the 1-200 gate`,
    );
  }
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? here;
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  const payload = JOKE + "\n";
  const bytes = Buffer.from(payload, "utf8");
  writeFileSync(outPath, bytes);
  const back = readFileSync(outPath);
  if (!back.equals(bytes)) {
    throw new Error("entry.txt read back does not match the bytes written");
  }
  console.log(`wrote ${bytes.length} bytes to ${outPath}`);
}

main();
