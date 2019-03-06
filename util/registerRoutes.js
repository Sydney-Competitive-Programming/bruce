const express = require('express');
const validate = require('express-validation');

function registerRoutes(routes) {
    let router = express.Router();

    routes.forEach(function (r) {
        Object.keys(r)
            .filter(function (verb) {
                return !['route', 'params'].includes(verb);
            })
            .forEach(function (verb) {
                router[verb](r.route, validate(r.params), r[verb]);
            })
    });
    return router;
}

module.exports = registerRoutes;