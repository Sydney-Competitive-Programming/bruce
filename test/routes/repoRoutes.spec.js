const submission = require('../../repo/submissions');
const repoRoutes = require('../../routes/repoRoutes');

jest.mock('../../repo/submissions');

const getRoute = function (r) {
    return repoRoutes.filter(function (x) {
        return x.route === r;
    })[0]; // referencing the 'route' property/object key
};

describe('repo routes', function () {
    const playerId = 'tonka7su';
    const date = '02-02-2019';
    const challengeId = '666';
    const code = "[open('y','a').write(' '.join(sorted(l[:-2].split(' '),key=lambda s:s.strip('\"').strip(\"'\").lower()))+'\n') for l in open('x').readlines()]";

   test('should submit a code snippit', function (done) {
       // Given

       // mock request
       const req = {
           body: { playerId, date, challengeId, code }
       };

       // mock response
       const res = {};
       res.json = jest.fn();
       const resolveSpy = jest.spyOn(res, 'json');

       // mock submission response
       const subResp = { playerId, date, challengeId, code };
       submission.submit.mockResolvedValue(subResp);

       // When
       return getRoute('/')
           .post(req, res)
           .then(function () {
               // Then
               expect(resolveSpy).toBeCalled();
               expect(resolveSpy).toBeCalledWith(subResp);
               done();
           })
   });

    // test('should fetch code snippits by id and date', function (done) {
    //     // Given
    //
    //     // mock request
    //     const req = {
    //         params: {
    //             playerId: playerId,
    //             date: date,
    //             challengeId: challengeId
    //         }
    //     };
    //
    //     // mock response
    //     const res = {};
    //     res.json = jest.fn();
    //     const resolveSpy = jest.spyOn(res, 'json');
    //
    //     // mock submission response
    //     const subResp = { playerId, date, challengeId, code };
    //     submission.fetch.mockResolvedValue(subResp);
    //     // submission.fetch = jest.fn().mockReturnValue(subResp);
    //
    //     // When
    //     return getRoute('/meetup/:playerId/:date')
    //         .get(req, res)
    //         .then(function () {
    //             // Then
    //             expect(submission.fetch).toBeCalledWith(playerId, date, challengeId);
    //             expect(resolveSpy).toBeCalled();
    //             expect(resolveSpy).toBeCalledWith(subResp);
    //             done();
    //         })
    // });

    test('should fetch a code snippit by id and challenge id', function (done) {
        // Given

        // mock request
        const req = {
            params: {
                playerId: playerId,
                challengeId: challengeId
            }
        };

        // mock response
        const res = {};
        res.json = jest.fn();
        const resolveSpy = jest.spyOn(res, 'json');

        // mock submission response
        const subResp = { playerId, date, challengeId, code };
        submission.fetch.mockResolvedValue(subResp);
        // submission.fetch = jest.fn().mockReturnValue(subResp);

        // When
        return getRoute('/:playerId/:challengeId')
            .get(req, res)
            .then(function () {
                // Then
                expect(submission.fetch).toBeCalledWith(playerId, challengeId);
                expect(resolveSpy).toBeCalled();
                expect(resolveSpy).toBeCalledWith(subResp);
                done();
            })
    })
});