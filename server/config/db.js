const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DataBase connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }

}

module.exports = connectDB;