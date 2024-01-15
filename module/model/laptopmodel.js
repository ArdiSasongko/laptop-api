const mongoose = require("mongoose")

const laptopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    Createdate: {
        type: Date,
        default: Date.now,
    }
})

const laptopModel = mongoose.model("Laptop", laptopSchema)

module.exports = laptopModel