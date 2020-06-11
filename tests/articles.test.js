const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const { app } = require('../server');

describe('Articles route', () => {
    describe('get /articles', () => {
        it('should get all articles', () => {
            request(app).get('/api/articles').end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });
    });

    describe('post /articles', () => {
        it('should create a new article', () => {
            let article = {
                title: "Unit Test 2112313123",
                author: "Sinan; Declan",
                journal: "www.sinan.com",
                month: "June",
                year: 2020
            };
            
            request(app).post('/api/articles').send(article).end((err, res) => {
                expect(res.status).to.eq(200);
                done();
            });
        });
    });
});