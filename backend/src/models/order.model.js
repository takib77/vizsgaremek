const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: (new Date()).toLocaleString()
    },
    note: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
