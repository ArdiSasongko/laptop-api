const asyncHandler = require("express-async-handler")
const usermodel = require("../model/usermodel")
const Response = require("../model/response")
const uservalidator = require("../middleware/uservalidator")
const loginvalidator = require("../middleware/loginvalidator")
const bcrypt = require("bcrypt")
const jwtToken = require("jsonwebtoken")

const register = asyncHandler (async (req,res) => {
    try {
        const request = await uservalidator.validateAsync(req.body)

        const username = await usermodel.findOne({ username : request.username })

        if(username) {
            const response = new Response.Error(true, "username already used, please try another one")
            return res.status(400).json(response)
        }

        const email = await usermodel.findOne({ email : request.email })

        if(email) {
            const response = new Response.Error(true, "email already used, please try another one")
            return res.status(400).json(response)
        }

        const hashedpassword = await bcrypt.hash(request.password, 12)
        request.password = hashedpassword

        const newuser = new usermodel(request)
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
        const request = await loginvalidator.validateAsync(req.body)
        const username = request.username
        const user = await usermodel.findOne({ username })

        if(user && (bcrypt.compare(request.password, user.password))) {
            const jwt = jwtToken.sign({
                user : {
                    id : user.id,
                    username : user.username,
                    email : user.email
                }
            }, process.env.KEY, { expiresIn : 15000})

            const result = { token : jwt, id : user.id }
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