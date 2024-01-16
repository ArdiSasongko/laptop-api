const joi = require("joi")

const loginvalidator = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required()
})

module.exports = loginvalidator