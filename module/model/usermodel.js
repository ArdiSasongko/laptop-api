const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    type : {
        type : String,
        default : "User",
        immutable : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const usermodel = mongoose.model("User", userSchema)

module.exports = usermodel