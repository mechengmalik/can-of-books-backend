'use strict'
const express = require("express");
const cors = require("cors");
require ("dotenv").config();
const axios = require("axios");
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const bookModel = require ('./Modules/book-model');





function bookCollection(){

    const book1 = new bookModel({
        userEmail:'mecheng.malik93@gmail.com',
        bookName: 'flower',
        description:"flower flower flower flower flower "

    })

    const book2 = new bookModel({
        userEmail:'mecheng.malik93@gmail.com',
        bookName: 'cars',
        description:"cars cars cars cars cars cars "

    })

    const book3 = new bookModel({
        userEmail:'mecheng.malik93@gmail.com',
        bookName: 'home sweet home',
        description:"home sweet home home sweet home home sweet home home sweet home home sweet home "

    })
    book1.save();
    book2.save();
    book3.save();



}
server.get('/',getHome)
function getHome(req,res){
    res.send ('home')
}
//http://localhost:3001/books?userEmail=mecheng.malik93@gmail.com
server.get('/books', getBooksHandler);

function getBooksHandler(req,res) {
    let userName = req.query.userEmail;

    bookModel.find({userEmail:userName},function(error,ownerData){
        if (error){
            console.log('data not exist')
        }else {
            res.send(ownerData)
            
        }
    })
}
// bookCollection();

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
