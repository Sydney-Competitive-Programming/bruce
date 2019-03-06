const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);

const submissions = require('../../repo/submissions');

describe('repo submission', function () {
    const table = 'submission-table-dev';
    const playerId = 'tonka7su';
    const date = '02-02-2019';
    const challengeId = '666';
    const code = "[open('y','a').write(' '.join(sorted(l[:-2].split(' '),key=lambda s:s.strip('\"').strip(\"'\").lower()))+'\n') for l in open('x').readlines()]";

    beforeEach(function () {
        AWSMock.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
            callback(null, {})
        });

        AWSMock.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
            callback(null, {
                Item: {
                    playerId: playerId,
                    date: date,
                    challengeId: challengeId,
                    code: code
                }
            })
        });
    });

    afterEach(function () {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    test('should submit a code submission', function (done) {
        // Given
        process.env.IS_OFFLINE = true;
        process.env.SUBMISSIONS_TABLE = table;

        // When
        let subPromise = submissions.submit(playerId, date, challengeId, code);

        // Then
        subPromise
            .then(function (data) {
                expect(data).toEqual({ playerId, date, challengeId, code });
                done();
            });
    });

    test('should fetch a code submission', function (done) {
        // Given
        process.env.IS_OFFLINE = true;
        process.env.SUBMISSIONS_TABLE = table;

        // When
        let subPromise = submissions.fetch(playerId, challengeId);

        // Then
        subPromise
            .then(function (data) {
                expect(data).toEqual({ playerId, date, challengeId, code });
                done();
            })
    });
});