const User = require('../../models/user.model');

exports.findAll = () => User.find().populate();

exports.findOne = id => User.findById(id).populate();

exports.create = userData => {
    const user = new User(userData);
    return user.save();
};

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => User.findByIdAndRemove(id);
