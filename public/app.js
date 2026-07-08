// old way of importing modules, i.e. express
// const express = require("express")

// ECMA-way of importing modules, i.e. express
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// const absolutePath = __dirname + '/html/index.html';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.resolve('./public/html/index.html'));
  // response.send();
});

app.get('/:pageName', (request, response) => {
  const fileSlug = request.params.pageName;

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
