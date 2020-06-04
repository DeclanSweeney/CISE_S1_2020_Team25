const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const { app } = require('../server');

describe('Articles route', () => {
    describe('get /articles', () => {
        it('should get all articles', (done) => {
            request(app).get('/api/articles').end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });
    });
});