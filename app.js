const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require("./module/config/dbconnect")
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT || 5050

const app = express()

connectDB()

app.use(cors())

app.use( bodyParser.urlencoded ({ extended : false}))
app.use( bodyParser.json() )

app.use("/laptop", require("./module/route/laptoproute"))
app.use("/user", require("./module/route/userroute"))
app.use("/admin", require("./module/route/adminroute"))

app.get("/", (req,res) => {
    console.log("Response Success");
    res.status(200).send("Response Success!!")
})

app.listen(PORT, () => {
    console.log(`Server Running in http://localhost:${PORT}`);
})