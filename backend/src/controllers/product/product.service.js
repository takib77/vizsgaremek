const Product = require('../../models/product.model');

exports.findAll = () => Product.find().populate();

exports.findOne = id => Product.findById(id).populate();

exports.create = productData => {
    const product = new Product(productData);
    return product.save();
};

exports.update = (id, updateData) => Product.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Product.findByIdAndRemove(id);
