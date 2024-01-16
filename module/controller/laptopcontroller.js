const asyncHandler = require("express-async-handler")
const laptopModel = require("../model/laptopmodel")
const laptopValidator = require("../middleware/laptopvalidator")
const Response = require("../model/response")

const addLaptop = asyncHandler ( async (req,res) => {
    try {
        const request = await laptopValidator.validateAsync(req.body)
        const nameLaptop = await laptopModel.findOne({name : request.name})

        if(nameLaptop) {
            const response = new Response.Error(true, "Laptop name already used")
            return res.status(400).json(response)
        }

        const newLaptop = new laptopModel(request)
        const result = await newLaptop.save()

        const response = new Response.Success(false, "New Laptop success to adding", result)
        return res.status(202).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

const getLaptops = asyncHandler (async (req,res) => {
    try {
        const listLaptop = await laptopModel.find()

        if(listLaptop.length === 0){
            const response = new Response.Error(true, "Laptop's not found")
            return res.status(404).json(response)
        }else{
            const response = new Response.Success(false, "Laptop find", listLaptop)
            return res.status(200).json(response)
        }
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

const updateLaptop = asyncHandler (async (req,res) => {
    try {
        const laptop = await laptopModel.findById(req.params.id)

        if(!laptop){
            const response = new Response.Error(true, "Laptop not found")
            return res.status(404).json(response)
        }

        const updatelaptop = await laptopModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        )

        const response = new Response.Success(false, "Laptop success to update", updatelaptop.name)
        return res.status(202).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

const deleteLaptop = asyncHandler (async (req,res) => {
    try {
        const laptop = await laptopModel.findById(req.params.id)

        if(!laptop) {
            const response = new Response.Error(true, "laptop not found")
            return res.status(404).json(response)
        }

        const deletelaptop = await laptopModel.findByIdAndDelete(req.params.id)

        const response = new Response.Success(false, "Laptop success to delete", deletelaptop.name)
        return res.status(202).json(response)
        
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

module.exports= { addLaptop, getLaptops, updateLaptop, deleteLaptop}