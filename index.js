npmconst serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true'){
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    });
    console.log(dynamoDb);
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
}

console.log('>>>>> table=', SUBMISSIONS_TABLE);

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
    res.send('Pham-factor motherfuckers!')
});

// Get Submission endpoint
app.get('/subs/:submissionId/:date', function (req, res) {
    const params = {
        TableName: SUBMISSIONS_TABLE,
        Key: {
            submissionId: req.params.submissionId,
            date: req.params.date,
        },
    };

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error:'Could not get submission'});
        }
        if (result.Item) {
            const {submissionId, date, code} = result.Item;
            res.json({ submissionId, date, code});
        } else {
            res.status(400).json({ error: "Submission not found" });
        }
    });
});

app.post('/subs', function (req, res) {
    const { submissionId, date, code } = req.body;

    let day = new Date(date);

    if (typeof submissionId !== 'string') {
        res.status(400).json({ error: '"submissionId" must be a string'});
    } else if (typeof date !== 'string' && day instanceof Date) {
        res.status(400).json({ error: '"date" must be a date'});
    } else if (typeof code !== 'string') {
        res.status(400).json({ error: '"code" must be a string'});
    }

    const params = {
        TableName: SUBMISSIONS_TABLE,
        Item: {
            submissionId: submissionId,
            date: date,
            code: code,
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not create submission' });
        }
        res.json({ submissionId, date, code });
    });
});

module.exports.handler = serverless(app);