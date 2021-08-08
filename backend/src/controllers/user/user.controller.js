const createError = require('http-errors');
const userService = require('../user/user.service');
const userModel = require('../../models/user.model');

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

// Get All animal
exports.findAll = (req, res, next) => {
    return userService.findAll()
        .then(animals => {
            res.json(animals);
        })
};

// Get One animal
exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)
        .then(animal => {
            if (!animal) {
                return next(new createError.NotFound("Animal is not found"));
            }
            return res.json(animal);
        })
};

// Create a new animal
exports.create = (req, res, next) => {
    if (!checkModel(userModel, req.body, next)) {
        return;
    };

    return userService.create(req.body)
        .then(animal => {
            res.status(201);
            res.json(animal);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a animal
exports.update = (req, res, next) => {
    if (!checkModel(userModel, req.body, next)) {
        return;
    };

    return userService.update(req.params.id, req.body)
        .then(animal => {
            res.json(animal);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a animal
exports.delete = (req, res, next) => {
    return userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Animal is not found")));
};
