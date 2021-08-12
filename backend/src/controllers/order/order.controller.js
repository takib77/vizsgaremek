const createError = require('http-errors');
const orderService = require('../order/order.service');
const orderModel = require('../../models/order.model');

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

// Get All order
exports.findAll = (req, res, next) => {
    return orderService.findAll()
        .then(orders => {
            res.json(orders);
        })
};

// Get One order
exports.findOne = (req, res, next) => {
    return orderService.findOne(req.params.id)
        .then(order => {
            if (!order) {
                return next(new createError.NotFound("Order is not found"));
            }
            return res.json(order);
        })
};

// Create a new order
exports.create = (req, res, next) => {
    if (!checkModel(orderModel, req.body, next)) {
        return;
    };

    return orderService.create(req.body)
        .then(order => {
            res.status(201);
            res.json(order);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a order
exports.update = (req, res, next) => {
    if (!checkModel(orderModel, req.body, next)) {
        return;
    };

    return orderService.update(req.params.id, req.body)
        .then(order => {
            res.json(order);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a order
exports.delete = (req, res, next) => {
    return orderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Order is not found")));
};
