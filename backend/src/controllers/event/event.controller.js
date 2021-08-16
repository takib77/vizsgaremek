const createError = require('http-errors');
const eventService = require('../event/event.service');
const eventModel = require('../../models/event.model');

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

// Get All event
exports.findAll = (req, res, next) => {
    return eventService.findAll()
        .then(events => {
            res.json(events);
        })
};

// Get One event
exports.findOne = (req, res, next) => {
    return eventService.findOne(req.params.id)
        .then(event => {
            if (!event) {
                return next(new createError.NotFound("Event is not found"));
            }
            return res.json(event);
        })
};

// Create a new event
exports.create = (req, res, next) => {
    if (!checkModel(eventModel, req.body, next)) {
        return;
    };

    return eventService.create(req.body)
        .then(event => {
            res.status(201);
            res.json(event);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update an event
exports.update = (req, res, next) => {
    if (!checkModel(eventModel, req.body, next)) {
        return;
    };

    return eventService.update(req.params.id, req.body)
        .then(event => {
            res.json(event);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete an event
exports.delete = (req, res, next) => {
    return eventService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Event is not found")));
};
