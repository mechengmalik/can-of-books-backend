'use strict'
const express = require("express");
const cors = require("cors");
require ("dotenv").config();
const axios = require("axios");
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const bookModel = require ('./Modules/book-model');
server.use(express.json());





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

    const book4 = new bookModel({
        userEmail:'trad.alhaiiari@gmail.com',
        bookName: 'home sweet home',
        description:"home sweet home home sweet home home sweet home home sweet home home sweet home "
        
        
    })
    book1.save();
    book2.save();
    book3.save();
    book4.save();
    
    
    
}
// bookCollection();

server.get('/',getHome)
function getHome(req,res){
    res.send ('home')
}
//http://localhost:3001/books?userEmail=mecheng.malik93@gmail.com
server.get('/books', getBooksHandler);

function getBooksHandler(req,res) {
    let userName = req.query.userEmail;

    bookModel.find({userEmail:userName},function(error,booksInfo){
        if (error){
            console.log('data not exist')
        }else {
            console.log(booksInfo);
            res.send(booksInfo)
            
        }
    })
}


// addBookHandler ();

server.post('/addbooks', addBookHandler);

async function addBookHandler (req,res){
    // consol.log(req.body)
    let {userEmail , bookName , description } =req.body;

    

    await bookModel.create({userEmail,bookName,description})

    bookModel.find({userEmail}), function(error,booksInfo){
        if(error){
            console.log('data not exist')
        }else{
            // console.log(booksInfo);
            res.send(booksInfo)
        }
    }

}

// deleteBookHandler()
server.delete('/deletebooks/:bookId', deleteBookHandler);

function deleteBookHandler (req,res){
    // consol.log(req.body)


    let userName= req.query.userEmail;

    let bookDataID = req.params.bookId

    

     bookModel.remove({_id:bookDataID},(error,booksData)=>{
        if (error) {
            consol.log('data can`t be deleted')
            
        }else{
            consol.log(booksData)
            bookModel.find({userEmail:userName}, function(err,booksInfo){
                if(err){
                    console.log('data not exist')
                }else{
                    console.log(booksInfo);
                    res.send(booksInfo)
                }
            })
        }
    })

    

}



server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
