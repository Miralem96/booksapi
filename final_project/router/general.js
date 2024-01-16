const express = require('express');
const bodyParser = require('body-parser');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.use(bodyParser.json());
public_users.use(bodyParser.urlencoded({ extended: true }));


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Validate if the username is not empty and follows the required format
  if (username.length < 3) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  // Add the new user to the users array
  users.push({ username, password });

  return res.status(201).json({ message: "User registered successfully" });
});



public_users.get('/', function (req, res) {
  const bookList = books.getAllBooks(); 
  const formattedBookList = bookList.map(book => ({
    title: book.title,
    author: book.author,
    ISBN: book.ISBN,
    
  }));

  return res.status(300).json({ books: formattedBookList });
});

// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented"});
 //});

 public_users.get('/isbn/:isbn', function (req, res) {
  // Retrieve ISBN from request parameters
  const isbn = req.params.isbn;
  console.log(req.params)

  // Find the book with the given key (considered as ISBN)
  const bookList = books.getAllBooks();
  const book= bookList.map((obj) => obj.id === 1 && obj)
  console.log("Found Book:", book);

  // Check if the book is found
  if (book.length > 0) {
    // Format the book details
    const bookDetails = {
      title: book[0].title,
      author: book[0].author,
      ISBN: isbn, 
      reviews: book[0].reviews || {}
    };

    // Return the book details
    return res.status(300).json({ book: bookDetails });
  } else {
    // If the book is not found, return an error message
    return res.status(404).json({ message: "Book not found" });
  }
});


  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  // Retrieve books by the specified author
  const bookList = books.getAllBooks();
  const booksByAuthor = bookList.filter(book => book.author === author);

  // Check if any books are found
  if (booksByAuthor.length > 0) {
    // Format the list of books by the author
    const formattedBooksByAuthor = booksByAuthor.map(book => ({
      title: book.title,
      author: book.author,
      ISBN: book.id,
      reviews: book.reviews || {}
    }));

    // Return the list of books by the author
    return res.status(300).json({ books: formattedBooksByAuthor });
  } else {
    // If no books are found, return an error message
    return res.status(404).json({ message: `No books found by ${author}` });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  // Retrieve books with the specified title
  const bookList = books.getAllBooks();
  const booksByTitle = bookList.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

  // Check if any books are found
  if (booksByTitle.length > 0) {
    // Format the list of books by title
    const formattedBooksByTitle = booksByTitle.map(book => ({
      title: book.title,
      author: book.author,
      ISBN: book.id,
      reviews: book.reviews || {}
    }));

    // Return the list of books by title
    return res.status(300).json({ books: formattedBooksByTitle });
  } else {
    // If no books are found, return an error message
    return res.status(404).json({ message: `No books found with title ${title}` });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  // Retrieve the book with the specified ISBN
  const bookList = books.getAllBooks();
  const book = bookList.find(book => book.id === parseInt(isbn));

  // Check if the book is found
  if (book) {
    // Format the book review details
    const bookReview = {
      title: book.title,
      author: book.author,
      ISBN: isbn,
      reviews: book.reviews || {}
    };

    // Return the book review details
    return res.status(300).json({ review: bookReview.reviews });
  } else {
    // If the book is not found, return an error message
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});

//module.exports.general = public_users;
module.exports.public_users = public_users;
