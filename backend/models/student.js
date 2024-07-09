const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Fields = new Schema({
    nisn: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: false })

const Model = mongoose.model('Students', Fields)
module.exports = Model