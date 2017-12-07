const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequiredString = {
    type: String,
    required: true
};


const schema = new Schema({
    name: RequiredString,
    amount: Number
});

module.exports = mongoose.model('Category', schema);
