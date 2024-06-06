const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {connect}