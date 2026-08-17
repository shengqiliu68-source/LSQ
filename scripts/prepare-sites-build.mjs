import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const cloudflareWorker = resolve("dist/dabiaoge_global_custom/index.js");
const sitesServer = resolve("dist/server/index.js");

await mkdir(resolve("dist/server"), { recursive: true });
await copyFile(cloudflareWorker, sitesServer);

// Sites serves static files before the worker. Materialize the SPA entry file
// for every public route so direct visits and browser refreshes never depend
// on a host-level rewrite being available.
const clientRoot = resolve("dist/client");
const spaEntry = resolve(clientRoot, "index.html");
const routes = [
  "cases",
  "custom/packaging",
  "custom/products",
  "custom/cards",
  "custom/summary",
  "inquiry",
  "procurement",
  "order-tracking",
];

const caseEntries = await readdir(resolve(clientRoot, "cases"), {
  withFileTypes: true,
});
for (const entry of caseEntries) {
  if (entry.isDirectory()) routes.push(`cases/${entry.name}`);
}

for (const route of routes) {
  const routeDirectory = resolve(clientRoot, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(spaEntry, resolve(routeDirectory, "index.html"));
}
