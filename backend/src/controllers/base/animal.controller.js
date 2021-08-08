const express = require('express');
const createError = require('http-errors');
const animalService = require('./base.service');

// Get All animal
exports.findAll = (req, res, next) => {
    return animalService.findAll()
        .then(animals => {
            res.json(animals);
        })
};

// Get One animal
exports.findOne = (req, res, next) => {
    return animalService.findOne(req.params._id)
        .then(animal => {
            if (!animal) {
                return next(new createError.NotFound("Animal is not found"));
            }
            return res.json(animal);
        })
};

// Create a new animal
exports.create = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    };

    const newAnimal = {
        name, price
    };

    return animalService.create(newAnimal)
        .then(animal => {
            res.status(201);
            res.json(animal);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a animal
exports.update = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    };

    return animalService.update(req.params._id, req.body)
        .then(animal => {
            res.json(animal);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a animal
exports.delete = (req, res, next) => {
    return animalService.delete(req.params._id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Animal is not found")));
};
