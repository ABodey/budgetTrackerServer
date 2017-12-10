const express = require('express');
const router = express.Router();
const respond = require('../utils/respond');
const Expense = require('../models/expense');

router
    .post('/', respond(
        req => Expense.create(req.body)
    ))
    .get('/',  respond(
        () => Expense.find().lean()
    ))
    .get('/:id',  respond(
        req => Expense.findById(req.params.id)
            .lean()
    ))
    .delete('/:id',  respond(
        req => Expense.findByIdAndRemove(req.params.id)
            .lean()
    ))
    .put('/:id', respond(
        req => Expense.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .lean()
    ));

module.exports = router;
