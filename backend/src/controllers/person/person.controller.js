const express = require('express');
const createError = require('http-errors');
const personService = require('./person.service');

// Get All person
exports.findAll = (req, res, next) => {
    return personService.findAll()
        .then(people => {
            res.json(people);
        })
};

// Get One person
exports.findOne = (req, res, next) => {
    return personService.findOne(req.params.id)
        .then(person => {
            if (!person) {
                return next(new createError.NotFound("Person is not found"));
            }
            return res.json(person);
        })
};

// Create a new person
exports.create = (req, res, next) => {
    const { last_name, first_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    };

    const newPerson = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    return personService.create(newPerson)
        .then(person => {
            res.status(201);
            res.json(person);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Update a person
exports.update = (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    };

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    return personService.update(req.params.id, update)
        .then(person => {
            res.json(person);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// Delete a person
exports.delete = (req, res, next) => {
    return personService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.NotFound("Person is not found")));
};
