const express = require('express');
const router = express.Router();
const respond = require('../utils/respond');
const Expense = require('../models/expense');
const Category = require('../models/category');

router
    .post('/', respond(
        req => Category.create(req.body)
    ))
    .get('/', respond(
        () => Category.find().lean()
    ))
    .get('/:id', respond(
        req => Category.findById(req.params.id)
            .lean()
    ))
    .delete('/:id', respond(
        req => Promise
            .all([
                Category.findByIdAndRemove(req.params.id).lean(),
                Expense.remove({ category : req.params.id })
            ])
            .then(([category]) => category)
    ))
    .put('/:id', respond(
        req => Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
            .lean()
    ));

module.exports = router;
