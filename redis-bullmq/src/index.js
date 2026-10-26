import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello World")
})

// post /jobs/email
app.post("/jobs/email", async (req, res) => {
    try {
        const { to, subject, body } = req.body

        res.status(202).json({
            message: "job adiciotn ",
            jobId: 123,
            to, subject, body
        })
    } catch (error) {
        res.status(500).json({
            message: "job addition failed"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
