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
 
            // console.log('gggggggggg',booksInfo);


            console.log(booksInfo);



            res.send(booksInfo)
            
        }
    })
}



// addBookHandler ();

server.post('/books', addBookHandler);

 function addBookHandler (req,res){
    console.log('yyyyyyyyyyyyyyy',req.body)
    let {userEmail , bookName , description } =req.body;

    

    bookModel.create({userEmail:userEmail,bookName:bookName,description:description}).then(
        

    data=>{console.log('oooooooooooo',data)}
   ).catch(error=>{console.log(error)

   })

   bookModel.find({userEmail:userEmail}, function(error,booksInfo){
        if(error){
            console.log('data not exist')
        }else{
            // console.log('hallooooooooooooooooooooo')
            // console.log(booksInfo);
            res.send(booksInfo)
        }
    })

}


server.delete('/books/:bookID', deleteBookHandler);

function deleteBookHandler (req,res){
    console.log(req.params)



    let userName= req.query.userEmail;

    let bookDataID = req.params.bookID

    console.log(';;;;;;;;;;;gggggg',userName , bookDataID)
    
     bookModel.remove({_id:bookDataID},(error,booksData)=>{
        if (error) {
            console.log('data can`t be deleted')
            
        }else{
            console.log('fffffffffffff',booksData)
            bookModel.find({userEmail:userName}, function(err,booksInfo){
                if(err){
                    console.log('data not exist')
                }else{
                    console.log('uuuuuuuuuu',booksInfo);
                    res.send(booksInfo)
                }
            })
        }
    })

    

}




server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
