const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const os = require('os');

let router = express.Router();

// Swagger definition aka OpenAPI v2.0
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md

let options = {
    swaggerDefinition: {
        info: {
            title: 'Bruce',
            version: '1.0.0',
            description: 'Backend API for Sydney Competitive Programming',
            contact: {
                email: "si@sipham.pw"
            },
            license: {
                name: "Unlicense",
                url: "https://unlicense.org/"
            }
        },
        host: os.hostname(),
        basePath: '/',
        schemes: [
            "http"
        ]
    },
    apis: [
        './routes/repoRoutes.js'
    ]
};

let swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.use('/', express.static(__dirname));

module.exports = router;
