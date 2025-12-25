import express from "express";
import { readUsers, validateUser, writeUser } from "./utils/usersFunc.js";
import { readEvents, writeEvent } from "./utils/eventsFunc.js";

const app = express();
const PORT = 3000;
const users_PATH = "./dataBase/users.json";
const events_PATH = "./dataBase/events.json";
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
    const newUser = {
      username: username,
      password: password,
    };
    users.push(newUser);
    await writeUser(users_PATH, users);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error", info: error });
  }
});

app.post("/creator/events", async (req, res) => {
  try {
    const { eventName, ticketsForSale, password, username } = req.body;
    const events = await readEvents(events_PATH);
    const check = await validateUser(users_PATH, username, password);
    const event = events.some((e) => e.eventName === eventName);
    if (!check) {
      return res
        .status(404)
        .json({ message: "user name or passowrd uncorrect" });
    } else if (event) {
      return res
        .status(404)
        .json({ message: "Event name already exists. choice another name" });
    } else {
      const newEvent = {
        eventName: eventName,
        ticketsAvailable: ticketsForSale,
        createdBy: username,
      };
      events.push(newEvent);
      await writeEvent(events_PATH, events);
      return res.status(201).json({ message: "Event created successfully" });
    }
  } catch (error) {
    return res.status(500).json({message: error})
  }
});

// app.post("/users/tickets/buy", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`server runing on port:${PORT}...`);
});
