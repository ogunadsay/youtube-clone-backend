import "dotenv/config.js";
import express, { json } from "express"
import videos from "./videos.js"

const app = express()
app.use(json())

app.use("/videos", videos)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT)
})

app.get("/status", (req, res)=>{
    const status = {
        "status" : "Running"
    }

    res.send(status)
})

