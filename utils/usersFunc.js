import fs from "fs/promises";

export async function writeUser(path, users) {
  await fs.writeFile(path, JSON.stringify(users, null, 2));
  return;
}

export async function readUsers(path) {
  const users = await fs.readFile(path, "utf-8");
  return JSON.parse(users);
}

export async function validateUser(path, username, password) {
  const users = await readUsers(path);
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password === password) {
      return true;
    } else {
      return false;
    }
  }
}
