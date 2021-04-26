const functions = require('firebase-functions');
const app = require('express')();
const cors = require("cors");

const {
  getAllEBooks,
  postOneEBook,
} = require('./APIs/eBooks')

app.use(cors({ origin: true }));

app.get('/ebooks', getAllEBooks);
app.post('/ebook', postOneEBook);

exports.api = functions.https.onRequest(app);