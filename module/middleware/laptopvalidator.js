const joi = require("joi")

const laptopValidator = joi.object({
    name : joi.string().required(),
    price : joi.number().required(),
    amount  : joi.number().required()
})

module.exports = laptopValidator