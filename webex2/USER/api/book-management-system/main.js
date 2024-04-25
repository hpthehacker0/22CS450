const express = require('express');
const dbHelper = require('./helpers/db-helper');
const bodyParser = require('body-parser');
const {
  bookList,
  addBook,
  deleteBook,
  updateBook,
  fetchSingleBook
} = require('./book/controllers/book-controller');
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  next();
});

app.listen(3001, (err) => {
  if (err) {
    console.log('console error', err);
    return;
  }
  console.log('Express framework started here');
  dbHelper
    .connection()
    .then(() => {
      console.log(`DB Connected`);
      app.get('/api/book/', bookList);
      app.post('/api/book/', addBook);
      app.get('/api/book/:id', fetchSingleBook);
      app.put('/api/book/:id', updateBook);
      app.delete('/api/book/:id', deleteBook);
    })
    .catch((err) => {
      console.log('DB connection failed. The error is', err);
    });
});
