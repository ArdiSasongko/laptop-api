const joi = require("joi")

const loginvalidator = joi.object({
    username : joi.string().required(),
    password : joi.string().required()
})

module.exports = loginvalidator