const express = require("express");
const fs = require("fs/promises");
const app = express();
const z = require("zod")
const jwt = require("jsonwebtoken")
const { loadEnvFile } = require('node:process');
const mongoose = require("mongoose")
loadEnvFile('.env');
const fileName = "todo-local-db.txt"
// const bodyParser = require("body-parser")

const todos = [];
// const todosSchema = z.array({
//     id: z.string,
//     todo: z.string,
//     completed: z.boolean
// })
const todoSchema = z.array(z.object({
    // id: z.string(),
    todo: z.string(),
    // completed: z.boolean()
}))

const users = [];

// app.use(bodyParser.json())
app.use(express.json())

app.get("/", async (req, res) => {
    res.json(todos)
})

app.post("/new", async (req, res) => {
    const data = req.body.data;
    console.log(req.body)
    if (!data) {
        res.status(404).send("data not found")
        return
    }
    try {
        const result = todoSchema.safeParse(data)
        // res.send(result)
        res.json(JSON.parse(result.error.message))
    } catch {
        res.status(404).send("opps")
    }
})

mongoose.connect(process.env.MONGO_SERVER_URL).then((onfulfilled) => {
    console.log("connected to mongo db")
}).catch((onrejected) => {
    console.log(onrejected)
})

// const Users = new mongoose.Schema({
//     userName: String,
//     password: String,
//     name: String
// })
const dbUser = mongoose.model("users/Users",
    {
        userName: String,
        password: String,
        name: String
    }
);

const userExists = (userName, password) => {
    if (users[userName] === password) {
        return false
    }
    return true
}

app.post("/signin", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    if (!userExists(userName, password)) {
        res.status(401).json({ data: "user does not exists", jwtToken: null })
        return
    }

    const jwtToken = jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: "1d" })
    console.log(jwtToken)
    // users.push({ userName, password })
    const user = new dbUser({
        userName: userName,
        password: password,
        name: req.body.name
    })
    user.save().then(() => {
        console.log("user saved")
        res.json({ jwtToken })
    }).catch((onrejected) => {
        console.log(onrejected)
        res.json({ jwtToken: null, message: "user not saved" })
    })
})

app.get("/users", (req, res) => {
    const authorizationToken = req.headers["authorization"];
    try {
        jwt.verify(authorizationToken, process.env.JWT_SECRET);
        console.log(jwt.decode(authorizationToken))
        dbUser.find({ userName: jwt.decode(authorizationToken).userName }).then((onfulfilled) => {
            console.log("users found")
            res.json({ users: onfulfilled })
        }).catch((onrejected) => {
            console.log(onrejected)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: true, message: "unauthorized" });
        return;
    }
})

app.listen(3200, () => {
    console.log("trying so hard on 3000")
})