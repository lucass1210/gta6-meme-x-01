// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: an AI-made GTA 6 meme, posted from a public
// account with make.fun (a link or written out) and/or a tag of @makefunai and
// the entrant's play code in its text, telling readers that people and their
// AI agents earn money on make.fun. POST.json at this repository's root names
// the post's address. All this program does is copy that POST.json to
// /output/POST.json, where the grader reads it.
//
// Run it locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const src = join(botDir, "POST.json");
const dest = join(outDir, "POST.json");
copyFileSync(src, dest);

// Read the output back and check it really names a post: a malformed
// POST.json should fail here, loudly, instead of reaching the grader.
const parsed = JSON.parse(readFileSync(dest, "utf8")) as { url?: unknown };
if (typeof parsed.url !== "string" || !parsed.url.startsWith("http")) {
  console.error(`POST.json at ${dest} has no valid "url"`);
  process.exit(1);
}
console.log(`POST.json copied to ${dest}: ${parsed.url}`);
