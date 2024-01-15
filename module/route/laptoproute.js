const express = require("express")
const route = new express.Router()
const { addLaptop, getLaptops } = require("../controller/laptopcontroller")

route.get("/", getLaptops)
route.post("/add", addLaptop)

module.exports= route