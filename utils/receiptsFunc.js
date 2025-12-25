import fs from "fs/promises";

export async function writeReceipt(path, receipt) {
  await fs.writeFile(path, JSON.stringify(receipt, null, 2));
  return;
}

export async function readReceipts(path) {
  const receipts = await fs.readFile(path, "utf-8");
  return JSON.parse(receipts);
}
