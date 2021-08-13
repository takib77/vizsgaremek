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

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: AddressSchema,
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
    accessToken: String
}, {
    timeStamps: true
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);
