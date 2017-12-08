const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required');

const schema = new Schema({
    name: RequiredString,
    amount: Number
});

module.exports = mongoose.model('Category', schema);
