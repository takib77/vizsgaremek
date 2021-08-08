const createError = require('http-errors');
const logger = require('../../config/logger');
const postService = require('./post.service');

exports.create = (req, res, next) => {
    const { title, body, author } = req.body;
    if (!title || !body || !author) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    };

    const postData = {
        title, body, author
    };

    return postService.create(postData)
        .then(post => {
            res.status(201);
            res.json(post);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findOne = (req, res, next) => {
    return postService.findOne(req.params.id)
        .then(post => {
            if (!post) {
                return next(new createError.NotFound("Post is not found"));
            }
            return res.json(post);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};
