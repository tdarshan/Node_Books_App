const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        minlength: 3,
        unique: true
    }, 
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;