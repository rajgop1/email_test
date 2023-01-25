const express = require("express")
const app = express()
const router = require("./routes/router")
const cors = require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors());
const port = process.env.port ||  8000

app.use(router)
app.get("/", (req,res)=>{
    res.sendStatus(200)
})
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})
