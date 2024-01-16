const joi = require("joi")

const adminvalidator = joi.object({
    name : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).max(255).required()
})

module.exports = adminvalidator