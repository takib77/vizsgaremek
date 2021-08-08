const Animal = require('../../models/animal.model');

exports.findAll = () => Animal.find().populate();

exports.findOne = id => Animal.findById(id).populate();

exports.create = animalData => {
    const animal = new Animal(animalData);
    return animal.save();
};

exports.update = (id, updateData) => Animal.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Animal.findByIdAndRemove(id);
