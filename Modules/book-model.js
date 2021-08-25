'use strict'

const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });



//Schema

const bookSchema = new mongoose.Schema({
    userEmail : String,
    bookName: String,
    description: String
});



//Modal

const bookModel = mongoose.model('bookData',bookSchema);


module.exports = bookModel;