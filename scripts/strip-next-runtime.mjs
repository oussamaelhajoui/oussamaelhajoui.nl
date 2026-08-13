import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../out/", import.meta.url));

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
    }),
  );
  return nested.flat();
}

for (const file of await htmlFiles(outDir)) {
  const source = await readFile(file, "utf8");
  const withoutRuntime = source
    .replace(/<link[^>]+(?:rel="preload"[^>]+as="script"|as="script"[^>]+rel="preload")[^>]*>/gi, "")
    .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, (tag, attributes) =>
      /type="application\/ld\+json"|data-keep-script/i.test(attributes) ? tag : "",
    );
  await writeFile(file, withoutRuntime);
}

console.log("Removed the unused Next.js client runtime from the static HTML export.");
