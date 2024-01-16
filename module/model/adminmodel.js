const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    }, 
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    type : {
        type : String,
        default : "Admin",
        immutable : true
    }
})

const modelAdmin = mongoose.model("Admin", adminSchema)
module.exports = modelAdmin