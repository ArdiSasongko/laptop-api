const asyncHandler = require("express-async-handler")
const adminModel = require("../model/adminmodel")
const Response = require("../model/response")
const adminValidator = require("../middleware/adminvalidator")
const loginValidator = require("../middleware/loginvalidator")
const bcrypt = require("bcrypt")
const jwtToken = require("jsonwebtoken")

const register = asyncHandler (async (req,res) => {
    try {
        const request = await adminValidator.validateAsync(req.body)

        const name = await adminModel.findOne({ name : request.name})
        if(name) {
            const response = new Response.Error(true, "Name already used")
            return res.status(400).json(response)
        }

        const email = await adminModel.findOne({ email : request.email })
        if(email) {
            const response = new Response.Error(true, "Name already used")
            return res.status(400).json(response)
        }

        const hashedpassword= await bcrypt.hash(request.hashedpassword, 12)
        request.password = hashedpassword

        const newAdmin = new adminModel(request)
        const result = await newAdmin.save()

        const response = new Response.Success(false, "Register Admin Success", result)
        return res.status(200).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

const login = asyncHandler (async (req,res) => {
    try {
        const request = await loginValidator.validateAsync(req.body)
        const email = request.email
        const user = await adminModel.findOne({ email })

        if(email && (await bcrypt.compare(request.password, user.password))) {
            const jwt = jwtToken.sign({
                user : {
                    id : user.id,
                    email : user.email
                }
            }, process.env.KEY, { expiresIn : 15000 })

            const result = { id : user.id, token : jwt}
            const response = new Response.Success(false, "Login Success", result)
            return res.status(200).json(response)
        }else {
            const response = new Response.Error(true, "Invalid Data")
            return res.status(400).json(response)
        }
    } catch (error) {
        const response = new Response.Error(true, "Invalid Data")
        return res.status(400).json(response)
    }
})

module.exports = { register, login }