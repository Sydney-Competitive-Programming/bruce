const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

// if (typeof process.env.SUBMISSIONS_TABLE === 'undefined') {
//     process.env.SUBMISSIONS_TABLE = 'submission-table-local';
//     process.env.IS_OFFLINE = true;
//     const dynamodbLocal = require("dynamodb-localhost");
//     // dynamodbLocal.install(); /* This is one time operation. Safe to execute multiple times which installs DynamoDB once. All the other methods depends on this. */
//     dynamodbLocal.start({
//         port: 8000,
//         inMemory : true,
//         // dbPath : 'local/'
//     });
// }

const registerRoutes = require('./util/registerRoutes');

const repo = require('./routes/repoRoutes');
// const docs = require('./docs');

app.use(bodyParser.json({ strict: false }));

app.use('/subs', registerRoutes(repo));
// app.use('/docs', docs);

app.get('/', function (req, res) {
    res.send('Pham-factor motherfuckers!')
});

module.exports.handler = serverless(app);
// module.exports = app;