const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:admin123@laptop-shop.8yk1fel.mongodb.net/laptop")
        console.log(`Database connected ${conn.connection.host}, ${conn.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports= connectDB