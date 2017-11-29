const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Budget = require('../models/budget');

router
    .get('/', (req, res, next) => {
        Budget.find(req.query)
            .populate('name', 'amount')
            .lean()
            .then(budgets => res.send(budgets))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Budget.findById(id)
            .lean()
            .then(budget => {
                if(!budget) throw {
                    code: 404,
                    error: `budget ${id} does not exist`
                };
                res.send(budget);
            })
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Budget  .findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Budget(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });
