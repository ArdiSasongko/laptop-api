const express = require("express")
const route = new express.Router()
const { addLaptop, getLaptops, updateLaptop, deleteLaptop } = require("../controller/laptopcontroller")

route.get("/", getLaptops)
route.post("/add", addLaptop)
route.route("/:id").put(updateLaptop).delete(deleteLaptop)

module.exports= route