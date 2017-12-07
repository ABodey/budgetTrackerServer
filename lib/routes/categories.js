const express = require('express');
const router = express.Router();
const respond = require('../utils/respond');
const Budget = require('../models/budget');
const Category = require('../models/category');


router
    .post('/', respond(
        req => new Category(req.body).save()
    ))
    .get('/', respond(
        () => Category.find().lean()
    ))
    .get('/:id', respond(
        req => Category.findById(req.params.id)
            .lean()
    ))
    .delete('/:id', respond(
        req => Category.findByIdAndRemove(req.params.id)
            .lean()
            .then(() => Budget.remove({ category : req.params.id }))
    ))
    .put('/:id', respond(
        req => Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .lean()
    ));

module.exports = router;    
