// old way of importing modules, i.e. express
// const express = require("express")

// ECMA-way of importing modules, i.e. express
import express, { response } from 'express';
import { request } from 'http';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;

const videoSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, unique: true },
  duration: { type: Number, required: true },
  isWatched: { type: Boolean, default: false, required: true },
});

mongoose
  .connect('mongodb://127.0.0.1:27017/church-website')
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log(error));

// const absolutePath = __dirname + '/html/index.html';

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// app.get('/', (request, response) => {
//   response.sendFile(path.resolve('./public/html/index.html'));
//   // response.send();
// });

app.get('/', (request, response) => {
  response.render('index');
});

app.post('/contact-us', (request, response) => {
  console.log('Contact form submission', request.body);
  response.send(
    'Thank you for writing a message to us. We will get back to you shortly.',
  );
});

app.get('/:pageName', (request, response) => {
  const fileSlug = request.params.pageName;

  // Ignore automatic browser favicon requests
  if (fileSlug === 'favicon.ico') {
    return response.sendStatus(204);
  }

  const filePath = path.resolve(`./public/html/${fileSlug}.html`);

  response.sendFile(filePath, (err) => {
    if (err) {
      response.status(404).sendFile(path.resolve('./public/html/404.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`👋 Started server on ${PORT}`);
});
