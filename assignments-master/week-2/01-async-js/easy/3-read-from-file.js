import fs from "fs"
(async () => {


    async function readFile() {
        fs.readFile("easy/1-counter.js", "utf-8", (err, data) => {
            console.log(err)
            console.log(data)
        })

    }
    readFile();
    console.log("hello")


})()