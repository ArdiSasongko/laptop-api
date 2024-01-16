const asyncHandler = require("express-async-handler")
const userModel = require("../model/usermodel")
const Response = require("../model/response")
const userValidator = require("../middleware/uservalidator")
const loginValidator = require("../middleware/loginvalidator")
const bcrypt = require("bcrypt")
const jwtToken = require("jsonwebtoken")

const register = asyncHandler (async (req,res) => {
    try {
        const request = await userValidator.validateAsync(req.body)

        const username = await userModel.findOne({ username : request.username })

        if(username) {
            const response = new Response.Error(true, "username already used, please try another one")
            return res.status(400).json(response)
        }

        const email = await userModel.findOne({ email : request.email })

        if(email) {
            const response = new Response.Error(true, "email already used, please try another one")
            return res.status(400).json(response)
        }

        const hashedpassword = await bcrypt.hash(request.password, 12)
        request.password = hashedpassword

        const newuser = new userModel(request)
        const result = await newuser.save()

        const response = new Response.Success(false, "Success to register", result)
        return res.status(202).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

const login = asyncHandler (async (req,res) => {
    try {
        const request = await loginValidator.validateAsync(req.body)
        const email = request.email
        const user = await userModel.findOne({ email })

        if(user && (bcrypt.compare(request.password, user.password))) {
            const jwt = jwtToken.sign({
                user : {
                    id : user.id,
                    username : user.username,
                    email : user.email
                }
            }, process.env.KEY, { expiresIn : 15000})

            const result = { id : user.id, token : jwt }
            const response = new Response.Success(false, "Login Success", result)
            return res.status(200).json(response)
        }else {
            const response = new Response.Error(true, "Invalid Data")
            return res.status(400).json(response)
        }

    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(400).json(response)
    }
})

module.exports = { register, login }