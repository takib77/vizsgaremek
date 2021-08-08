const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    country: String,
    zip: Number,
    city: String,
    street: String,
    houseNumber: Number
}, {
    timeStamps: true
});

module.exports = mongoose.model('Address', AddressSchema);
