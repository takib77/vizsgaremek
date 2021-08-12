const createError = require('http-errors');
const productService = require('../product/product.service');
const productModel = require('../../models/product.model');

const checkModel = (model, body, next) => {
    const validationError = new model(body).validateSync();
    if (validationError) {
        next(
            new createError.BadRequest(
                JSON.stringify({
                    message: 'Schema validation error!',
                    error: validationError
                })
            )
        );
        return false;
    }
    return true;
}

// Get All product
exports.findAll = (req, res, next) => {
    return productService.findAll()
        .then(products => {
            res.json(products);
        })
};

// Get One product
exports.findOne = (req, res, next) => {
    return productService.findOne(req.params.id)
        .then(product => {
            if (!product) {
                return next(new createError.NotFound("Product is not found"));
            }
            return res.json(product);
        })
};

// Create a new product
exports.create = (req, res, next) => {
    if (!checkModel(productModel, req.body, next)) {
        return;
    };

    return productService.create(req.body)
        .then(product => {
            res.status(201);
            res.json(product);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a product
exports.update = (req, res, next) => {
    if (!checkModel(productModel, req.body, next)) {
        return;
    };

    return productService.update(req.params.id, req.body)
        .then(product => {
            res.json(product);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a product
exports.delete = (req, res, next) => {
    return productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Product is not found")));
};
