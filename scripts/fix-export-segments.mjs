// Next 16 static export writes per-segment prefetch payloads as nested folders
// (e.g. `hipaa/__next.hipaa/__PAGE__.txt`), but the client router requests them
// as flat dotted filenames (`hipaa/__next.hipaa.__PAGE__.txt`). Static hosts
// like GitHub Pages can't rewrite, so every <Link> prefetch 404s. This copies
// each nested segment file to the flat name the router asks for.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full, [name]);
    else walk(full);
  }
}

// Copy every file under `segmentDir` to `<routeDir>/<parts joined with ".">`.
function flatten(routeDir, segmentDir, parts) {
  for (const name of readdirSync(segmentDir)) {
    const full = join(segmentDir, name);
    if (statSync(full).isDirectory()) {
      flatten(routeDir, full, [...parts, name]);
    } else {
      const target = join(routeDir, [...parts, name].join("."));
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(`fix-export-segments: wrote ${copied} flat segment files`);
}
