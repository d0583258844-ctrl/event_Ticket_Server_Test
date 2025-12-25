import express from "express";
import { readUsers, validateUser, writeUser } from "./utils/usersFunc.js";

const app = express();
const PORT = 3000;
const users_PATH = "./dataBase/users.json";
// const events_PATH = "./dataBase/events.json";
// const receipts_PATH = "./dataBase/receipts.json";

app.use(express.json());

app.post("/user/register", async (req, res) => {
  try {
    const { password, username } = req.body;
    const users = await readUsers(users_PATH);
    const user = users.find((u) => u.username === username);
    if (user) {
      return res
        .status(404)
        .json({ message: "User name already exist, enter new name." });
    }
    if (!username || !password) {
      return res
        .status(404)
        .json({ message: "you must send both: name & password" });
    }
    const newData = {
      username: username,
      password: password,
    };
    users.push(newData);
    await writeUser(users_PATH, users);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error", info: error });
  }
});

// app.post("/creator/events", async (req, res) => {});

// app.post("/users/tickets/buy", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`server runing on port:${PORT}...`);
});
