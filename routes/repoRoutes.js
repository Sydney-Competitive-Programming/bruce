const Joi = require('joi');

const submissions = require('../repo/submissions');

// JSDoc definition
// http://usejsdoc.org/

/**
 * @swagger
 * tags:
 * - name: subs
 *   description: submit/fetch code submissions
 */
let repoRoutes = [
    {
        route: '/',
        params: {
            body: {
                playerId: Joi.string().required(),
                date: Joi.date().raw().required(),
                challengeId: Joi.number().integer().min(1),
                code: Joi.string().required()
            }
        },
        /**
         * @swagger
         * /:
         *   post:
         *     summary: Submit a code submission
         *     description:
         *     tags: [subs]
         *     parameters:
         *       - in: body
         *         name: playerId
         *         type: string
         *         required: true
         *         description: User handle
         *       - in: body
         *         name: date
         *         type: string
         *         required: true
         *         description: Date dd-mm-yyyy of the submission
         *       - in: params
         *         name: challengeId
         *         type: string
         *         required: true
         *         description: Globally unique challenge id
         *       - in: body
         *         name: code
         *         type: String
         *         required: true
         *         description: Code snippit
         *     responses:
         *       '200':
         *         description: Code submitted successfully
         *         schema:
         *           success: success message
         *       '400':
         *         description: Code snippit not submitted
         *         schema:
         *           status: http status code
         *           statusText: http sttus
         *           error: error message
         *           errors: specific errors if any
         */
        post: function (req, res) {
            const { playerId, date, challengeId, code } = req.body;
            return submissions.submit(playerId, date, challengeId, code)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (error) {
                    res.status(400).json({ error: 'Could not create submission' });
                })
        }
    },
    // {
    //     route: '/meetup/:playerId/:date',
    //     params: {},
    //     /**
    //      * @swagger
    //      * /:submissionId/:date:
    //      *   post:
    //      *     summary: Fetch all code submission for a player by meetup
    //      *     description:
    //      *     tags: [subs]
    //      *     parameters:
    //      *       - in: params
    //      *         name: playerId
    //      *         type: string
    //      *         required: true
    //      *       - in: body
    //      *         name: date
    //      *         type: string
    //      *         required: true
    //      *         description: Date dd-mm-yyyy of the submission
    //      *     responses:
    //      *       '200':
    //      *         description: Code fetched successfully
    //      *         schema:
    //      *           success: success message
    //      *       '400':
    //      *         description: Code snippit not fetched
    //      *         schema:
    //      *           status: http status code
    //      *           statusText: http sttus
    //      *           error: error message
    //      *           errors: specific errors if any
    //      */
    //     get: function (req, res) {
    //         const { playerId, date } = req.params;
    //         return submissions.fetch(playerId, date)
    //             .then(function (data) {
    //                 res.json(data);
    //             })
    //             .catch(function (error) {
    //                 res.status(400).json({ error: "Submission not found" });
    //             })
    //     }
    // },
    {
        route: '/:playerId/:challengeId',
        params: {
            playerId: Joi.string().required(),
            challengeId: Joi.number().integer().min(1)
        },
        /**
         * @swagger
         * /:submissionId/:date:
         *   post:
         *     summary: Fetch a code submission
         *     description:
         *     tags: [subs]
         *     parameters:
         *       - in: params
         *         name: playerId
         *         type: string
         *         required: true
         *       - in: params
         *         name: challengeId
         *         type: string
         *         required: true
         *         description: Globally unique challenge id
         *     responses:
         *       '200':
         *         description: Code fetched successfully
         *         schema:
         *           success: success message
         *       '400':
         *         description: Code snippit not fetched
         *         schema:
         *           status: http status code
         *           statusText: http sttus
         *           error: error message
         *           errors: specific errors if any
         */
        get: function (req, res) {
            const { playerId, challengeId } = req.params;
            return submissions.fetch(playerId, parseInt(challengeId, 10))
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (error) {
                    res.status(400).json({ error: "Submission not found" });
                })
        }
    }
];

module.exports = repoRoutes;