const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: (new Date()).toLocaleString()
    },
    time: Number,
}, {
    timeStamps: true
});

module.exports = mongoose.model('Event', EventSchema);
