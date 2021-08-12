const createError = require('http-errors');
const userService = require('../user/user.service');
const userModel = require('../../models/user.model');
const addressModel = require('../../models/address.model');

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

// Get All user
exports.findAll = (req, res, next) => {
    return userService.findAll()
        .then(animals => {
            res.json(animals);
        })
};

// Get One user
exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)
        .then(user => {
            if (!user) {
                return next(new createError.NotFound("Animal is not found"));
            }
            return res.json(user);
        })
};

// Create a new user
exports.create = async (req, res, next) => {
    const address = new addressModel(req.body.address);
    await address.save();
    req.body.address = address._id;

    if (!checkModel(userModel, req.body, next)) {
        return;
    };

    return userService.create(req.body)
        .then(user => {
            res.status(201);
            res.json(user);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a user
exports.update = async (req, res, next) => {
    if (!checkModel(userModel, req.body, next)) {
        return;
    };
    //
    if (!checkModel(addressModel, req.body, next)) {
        return;
    };
    //
    return userService.update(req.params.id, req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a user
exports.delete = (req, res, next) => {
    return userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Animal is not found")));
};
