const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const db = require('./db');
const app = require('../lib/app');

describe('budget', () => {

    const request = chai.request(app);

    before(db.drop(connection));

    let budget = { name: 'doughnuts', amount: 30 };

    it('/POST a budget', () => {
        return request
            .post('/api/budget')
            .send(budget)
            .then(({ body }) => {
                assert.isOk(body._id);
                for(const key of ['name', 'url']) {
                    assert.equal(body[key], budget[key]);
                }
                budget = body;
            });
    });
    it('/Delete budget', () => {
        const url = `/api/budget/${budget._id}`;
        return request.delete(url)
            .then(() => request.get(url))
            .then(
                () => { throw new Error('unexpected success response');},
                res => assert.equal(res.status, 404)
            );
    });
});