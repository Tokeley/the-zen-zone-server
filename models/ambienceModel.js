const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ambienceSchema = new Schema({
    title: {
        type: String,
        requierd: true
    },
    audioPath: {
        type: String,
        requierd: true
    },
    imagePath: {
        type: String,
        requierd: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Ambience', ambienceSchema)