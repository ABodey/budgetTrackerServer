const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required');

const schema = new Schema({
    name: RequiredString,
    amount: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Expense', schema);