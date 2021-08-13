const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: String,
    goodFor: {
        type: String,
        required: true
    },
    weight: Number,
    size: String,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    active: Boolean,
    organic: Boolean
}, {
    timeStamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
