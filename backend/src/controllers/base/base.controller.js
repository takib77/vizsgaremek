const createError = require('http-errors');
const baseService = require('./base.service');

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

module.exports = (model, populateList = []) => {
    const entityService = baseService(model, populateList);
    return {

        // Get All entity
        findAll: (req, res, next) => {
            return entityService.findAll()
                .then(entitys => {
                    res.json(entitys);
                })
        },

        // Get One entity
        findOne: (req, res, next) => {
            return entityService.findOne(req.params.id)
                .then(entity => {
                    if (!entity) {
                        return next(
                            new createError.NotFound("Entity is not found"));
                    }
                    return res.json(entity);
                })
        },

        // Create a new entity
        create: (req, res, next) => {
            if (!checkModel(model, req.body, next)) {
                return;
            };

            return entityService.create(req.body)
                .then(entity => {
                    res.status(201);
                    res.json(entity);
                })
                .catch(err => next(
                    new createError.InternalServerError(err.message)));
        },

        // Update an entity
        update: (req, res, next) => {
            if (!checkModel(model, req.body, next)) {
                return;
            };

            return entityService.update(req.params.id, req.body)
                .then(entity => {
                    res.json(entity);
                })
                .catch(err => next(
                    new createError.InternalServerError(err.message)));
        },

        // Delete an entity
        delete: (req, res, next) => {
            return entityService.delete(req.params.id)
                .then(() => res.json({}))
                .catch(err => next(
                    new createError.NotFound("Data is not found")));
        }

    }
}

