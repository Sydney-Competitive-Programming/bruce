const AWS = require('aws-sdk');


function getDb() {
    const IS_OFFLINE = process.env.IS_OFFLINE;
    let dynamoDb;
    if (IS_OFFLINE === 'true'){
        dynamoDb = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        });
    } else {
        dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    return dynamoDb;
}

function fetch(playerId, challengeId) {
    const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;
    const params = {
        TableName: SUBMISSIONS_TABLE,
        Key: {
            playerId: playerId,
            challengeId: challengeId
        },
    };

    console.log('>>> ' + JSON.stringify(params));

    let dynamoDb = getDb();
    return dynamoDb.get(params).promise()
        .then(function (data) {
            console.log('get called successfully = ' + JSON.stringify(data.Item));
            return data.Item;
        })
        .catch(function (error) {
            console.log('get errored = ' + error);
            throw error;
        });
}

function submit(playerId, date, challengeId, code) {
    // let day = new Date(date);
    //
    // if (!(day instanceof Date) || isNaN(day)) {
    //     res.status(400).json({ error: '"date" must be a date'});
    // }

    const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;
    const params = {
        TableName: SUBMISSIONS_TABLE,
        Item: {
            playerId: playerId,
            date: date,
            challengeId: challengeId,
            code: code
        },
    };

    // console.log('params = ' + JSON.stringify(params));

    let dynamoDb = getDb();
    return dynamoDb.put(params).promise()
        .then(function (data) {
            // console.log('put called successfully = ' + JSON.stringify(data));
            return { playerId, date, challengeId, code };
        })
        .catch(function (error) {
            console.log('put errored = ' + error);
            throw error;
        });
}

module.exports = {
    fetch,
    submit
};