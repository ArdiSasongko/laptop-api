const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler (async (req,res,next) => {
    let token
    let authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]

        if(!token){
            res.status(404)
            throw new Error("Token unavailable")
        }

        jwt.verify(token, process.env.KEY, (err,decode) => {
            if(err) {
                res.status(401)
                throw new Error("Unauthorized")
            }
            req.user = decode.user
            next()
        })
    } else {
        res.status(401)
        throw new Error("invalid Header Authorization")
    }
})

module.exports = validateToken