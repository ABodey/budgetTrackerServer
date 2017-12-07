const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const expense = require('../models/expense');

router
    .get('/', (req, res, next) => {
        expense.find()
            .lean()
            .then(expenses => res.send(expenses))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        expense.findById(id)
            .lean()
            .then(expense => {
                if(!expense) throw {
                    code: 404,
                    error: `expense ${id} does not exist`
                };
                res.send(expense);
            })
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        expense.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        expense.create(req.body)
            .then(saved => res.send(saved))
            .catch(err => {
                next(err);
            });
    })
    .put('/:id', bodyParser, (req, res, next) => {
        expense.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;    
