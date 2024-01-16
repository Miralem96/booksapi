const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Import bcrypt library

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').public_users;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
  // Check for a valid session or token
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, send an authentication error
    res.status(401).json({ message: "Sucessfully" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

