import fs from "fs/promises";

fs.writeFile("easy/testing.md", "utf-8").then((err, data) => {
    console.log(data)
})