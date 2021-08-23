'use strict'

const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/bestBooks', { useNewUrlParser: true, useUnifiedTopology: true });



//Schema

const bookSchema = new mongoose.Schema({
    userEmail : String,
    bookName: String,
    description: String
});



//Modal

const bookModel = mongoose.model('bookData',bookSchema);


module.exports = bookModel;