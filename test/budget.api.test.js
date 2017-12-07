const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const db = require('./db');
const app = require('../lib/app');

describe('expense', () => {

    const request = chai.request(app);

    before(db.drop(connection));

    let expense = { name: 'doughnuts', amount: 30 };

    it('/POST a expense', () => {
        return request
            .post('/api/expense')
            .send(expense)
            .then(({ body }) => {
                assert.isOk(body._id);
                for(const key of ['name', 'url']) {
                    assert.equal(body[key], expense[key]);
                }
                expense = body;
            });
    });
    it('/Delete expense', () => {
        const url = `/api/expense/${expense._id}`;
        return request.delete(url)
            .then(() => request.get(url))
            .then(
                () => { throw new Error('unexpected success response');},
                res => assert.equal(res.status, 404)
            );
    });
});