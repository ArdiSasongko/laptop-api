const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require("./module/config/dbconnect")
const dotenv = require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 5050

connectDB()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req,res) => {
    console.log("Response Success");
    res.status(200).send("Response Success!!")
})

app.listen(PORT, () => {
    console.log(`Server Running in http://localhost:${PORT}`);
})