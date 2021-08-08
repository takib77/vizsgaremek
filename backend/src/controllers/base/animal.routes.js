const express = require("express");
const controller = require('./animal.controller');

const router = express.Router();

// read
router.get('/', (req, res, next) => {
    return controller.findAll(req, res, next);
});

router.get('/:_id', (req, res, next) => {
    return controller.findOne(req, res, next);
});

// create
router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

// update
router.put('/:_id', (req, res, next) => {
    return controller.update(req, res, next);
});

router.patch('/:_id', (req, res, next) => {
    return controller.update(req, res, next);
});

// delete
router.delete('/:_id', (req, res, next) => {
    return controller.delete(req, res, next);
});

module.exports = router;