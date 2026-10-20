const express = require("express");
const fs = require("fs/promises");
const app = express();
const fileName = "todo-local-db.txt"
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.get("/", async (req, res) => {
    const data = await fs.readFile('todo-local-db.txt', 'utf-8');
    if (data) {
        res.send(data)
    } else {
        res.send("<i>hiiii</i>");
    }
})

app.post("/new", async (req, res) => {
    const data = req.body?.data;
    console.log(data, req.body)
    try {
        await fs.appendFile(fileName, `${data}\n`, 'utf-8');
        res.send(data)
    } catch {
        res.status(404).send("opps")
    }
})

app.listen(3000, () => {
    console.log("trying so hard on 3000")
})