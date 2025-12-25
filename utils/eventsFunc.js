import fs from "fs/promises";

export async function writeEvent(path, events) {
  await fs.writeFile(path, JSON.stringify(events, null, 2));
  return;
}

export async function readEvents(path) {
  const events = await fs.readFile(path, "utf-8");
  return JSON.parse(events);
}
