// old way of importing modules, i.e. express
// const express = require("express")

// ECMA-way of importing modules, i.e. express
import express, { response } from 'express';
import { request } from 'http';
import path from 'path';

const app = express();
const PORT = 8080;

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
