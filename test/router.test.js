const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;

describe('GET /', () => {
  it('responds with "{ data: \'Express\'}"', (done) => {
    request.get('/api/index')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).deep.equal({ data: 'Express'});
        done();
      });
  });
});