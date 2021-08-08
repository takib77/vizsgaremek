const User = require('../../models/user.model');

exports.findAll = () => User.find().populate('address');

exports.findOne = id => User.findById(id).populate('address');

exports.create = userData => {
    const user = new User(userData);
    return user.save();
};

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => User.findByIdAndRemove(id);
