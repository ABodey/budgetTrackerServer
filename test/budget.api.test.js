const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const db = require('./db');
const app = require('../lib/app');

describe.only('budget', () => {

    const request = chai.request(app);

    before(db.drop(connection));

    let budget = { name: 'doughnuts', amount: 30 };

    it('POST a budget', () => {
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
    
});