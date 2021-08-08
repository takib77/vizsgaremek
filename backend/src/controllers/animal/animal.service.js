const Animal = require('../../models/animal.model');

exports.findAll = () => Animal.find();

exports.findOne = _id => Animal.findById(_id);

exports.create = animalData => {
    const animal = new Animal(animalData);
    return animal.save();
};

exports.update = (_id, updateData) => Animal.findByIdAndUpdate(_id, updateData, { new: true });

exports.delete = _id => Animal.findByIdAndRemove(_id);
