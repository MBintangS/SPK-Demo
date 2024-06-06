const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Fields = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true
    },
}, { timestamps: false })

const Model = mongoose.model('Users', Fields)
module.exports = Model