//define how the wish document should look like
//require mongoose cos it let us to create models and schemas
const mongoose = require('mongoose')
//create a new schema instance
const Schema = mongoose.Schema
const wishSchema = new Schema({
    title: {
        type: String,  //set the required input type
        required: true //set it as required input field
    },
    content: {
        type: String,
        required: true
    },
    statue: {
        type: String,
        required: true
    }
}, {timestamps: true})//note the time when a new schema was created
//export the schema to build a model
module.exports = mongoose.model('Wish', wishSchema)