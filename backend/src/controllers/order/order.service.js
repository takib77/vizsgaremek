const Order = require('../../models/order.model');

exports.findAll = () => Order.find().populate();

exports.findOne = id => Order.findById(id).populate();

exports.create = orderData => {
    const order = new Order(orderData);
    return order.save();
};

exports.update = (id, updateData) => Order.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Order.findByIdAndRemove(id);
