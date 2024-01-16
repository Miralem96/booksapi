const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Make sure to install the 'bcrypt' package

const regd_users = express.Router();

// Sample users array (replace with your actual user data)
let users = [
  { username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { username: 'user2', password: bcrypt.hashSync('password2', 10) }
];

const isValid = (username) => {
  // Basic validation example (replace with your actual validation logic)
  return username.length >= 3;
};

const authenticatedUser = (username, password) => {
  const user = users.find(user => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    return true;
  }

  return false;
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Validate if the username is valid
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  // Check if the user is registered and the password is correct
  if (authenticatedUser(username, password)) {
    // Generate a JWT token
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ message: "Successfully logged in", token });
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

/// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.user.username; // Assuming you store the username in the session after authentication
  const isbn = req.params.isbn;
  const reviewText = req.body.review;

  // Validate if the review text is provided
  if (!reviewText) {
    return res.status(400).json({ message: "Review text is required" });
  }

  // Retrieve the book with the specified ISBN
  const bookList = books.getAllBooks();
  const book = bookList.find((book) => book.id === parseInt(isbn));

  // Check if the book is found
  if (book) {
    // Check if the user has already reviewed the book
    if (!book.reviews) {
      book.reviews = {};
    }

    if (book.reviews[username]) {
      // If the user has already reviewed, update the existing review
      book.reviews[username] = reviewText;
    } else {
      // If the user has not reviewed, add a new review
      book.reviews[username] = reviewText;
    }

    // Return success message with updated book details
    return res.status(300).json({
      message: "Review added/modified successfully",
      book: {
        title: book.title,
        author: book.author,
        ISBN: isbn,
        reviews: book.reviews,
      },
    });
  } else {
    // If the book is not found, return an error message
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});




module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;