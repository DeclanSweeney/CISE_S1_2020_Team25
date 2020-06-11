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

        it('should get all articles that contain author eqalu to: \"Postman\"', () => {
            request(app).get('/api/articles').send({ author: "Postman" }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });

        it('should get all articles that contain \"man\" in the author', () => {
            request(app).get('/api/articles').send({ author: "" + new RegExp(".*" + "man" + ".*") }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });

        it('should get all articles that doesn\'t contain \"man\" in the author', () => {
            request(app).get('/api/articles').send({ author: "" + new RegExp("^((?!" + "man" + ").)*$") }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });
        
        it('should get all articles that authors\' starts with \"Post\"', () => {
            request(app).get('/api/articles').send({ author: "" + new RegExp("^" + "Post") }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });
        
        
        it('should get all articles that authors\' end with \"man\"', () => {
            request(app).get('/api/articles').send({ author: "" + new RegExp("man" + "$") }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });

        it('should get all articles that end with \"test\" in the title', () => {
            request(app).get('/api/articles').send({ author: "" + new RegExp("test" + "$") }).end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            });
        });
    });

    describe('post /articles', () => {
        it('should create a new article', () => {
            let article = {
                title: "Unit Test",
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