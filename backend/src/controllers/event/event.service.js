const Event = require('../../models/event.model');

exports.findAll = () => Event.find().populate();

exports.findOne = id => Event.findById(id).populate();

exports.create = eventData => {
    const event = new Animal(eventData);
    return event.save();
};

exports.update = (id, updateData) => Event.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Event.findByIdAndRemove(id);
