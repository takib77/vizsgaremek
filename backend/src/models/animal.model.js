const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    img: String,
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    active: Boolean
}, {
    timeStamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);
