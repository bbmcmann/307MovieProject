const express = require("express");
const cors = require("cors");
const db = require("./routes/user-services.js");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.get("/users", async (req, res) => {
    let id;
    try {
        const result = await db.getUsers(id);
        res.send({"users_list": result});
    } catch (error) {
        console.log(error);
        res.status(505).send("An error occurred in the server");
    }
});

app.post("/users", async (req, res) => {
    const userToAdd = req.body;
    const result = await db.addUser(userToAdd);
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(500).end();
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await db.getUsers(id);
        res.send({"users_list": result});
    } catch (error) {
        console.log(error);
        res.status(505).send("An error occurred on the system");
    }
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await db.deleteUserById(id);
    if (!result) {
        res.status(404).send("Resource not found");
    } else {
        res.status(204).end();
    }
});

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
});
