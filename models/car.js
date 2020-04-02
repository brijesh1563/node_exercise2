const mongoose = require('mongoose');

const Cars = mongoose.model('Cars', new mongoose.Schema({
    company: {
        type: String,
        required: true, 
    },
    model: {
        type: String,
        required: true,
    }
}));

exports.Cars = Cars;