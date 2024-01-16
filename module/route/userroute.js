const express = require("express")
const route = new express.Router()
const { register, login } = require("../controller/usercontroller")

route.post("/register", register)
route.post("/login", login)

module.exports = route