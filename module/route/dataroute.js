const express = require("express")
const route = new express.Router()
const validateToken = require("../middleware/validatetoken")
const { getDataUser } = require("../controller/usercontroller")

route.route("/users").get(validateToken, getDataUser)

module.exports = route