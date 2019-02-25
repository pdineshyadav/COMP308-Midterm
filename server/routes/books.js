/* File Name :- routes/books.js
    Student Name :- Dinesh Palle
    Student ID :- 300705307
    Web App Name :- Favourite Books */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
      //Finds for errors
      book.find( (err, books) => {
        if (err) {
          return console.error(err);
        }
        // If no errors it renders
        else {
          res.render('books/details', {
            title: 'Books',
            books: books
          });
        }
      });
    
  
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  //Creates new Book
  book.create(newBook, (err, book) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the books list
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //Finds the book by ID
    let id = req.params.id;
    book.findById(id, (err, bookObject) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      // If no errors, It renders the book
      else {
        res.render('books/details', {
          title: 'Edit Book',
          books: bookObject
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  // Updates the book using it's ID
  book.update({_id: id}, updatedBook, (err) => {
    if(err) {
        console.log(err);
        res.end(err);
    }
    else {
        // refresh the books list
        res.redirect('/books');
    }
});

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Deletes the book using it's ID
    let id = req.params.id;
    book.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the books list
          res.redirect('/books');
      }
  });
});


module.exports = router;
