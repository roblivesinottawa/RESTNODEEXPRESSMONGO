const mongoose = require('mongoose')

// create a schema
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedToService: {
        type: String,
        required: true,
    },
    subscriberDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// the model function is needed so we can interact directly with the database using this schema
module.exports = mongoose.model('Subscriber', subscriberSchema)