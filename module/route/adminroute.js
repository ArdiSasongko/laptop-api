const express = require("express")
const route = new express.Router()
const { register, login } = require("../controller/admincontroller")
const validatToken = require("../middleware/validatetoken")

route.post("/register", register)
route.post("/login", login)

module.exports = route