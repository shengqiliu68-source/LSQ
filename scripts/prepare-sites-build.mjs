import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const cloudflareWorker = resolve("dist/dabiaoge_global_custom/index.js");
const sitesServer = resolve("dist/server/index.js");

await mkdir(resolve("dist/server"), { recursive: true });
await copyFile(cloudflareWorker, sitesServer);
