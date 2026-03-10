const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // get different types of files in response

  // 1. CSS
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');

    fs.readFile('..' + req.url, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200);
      res.end(data);
    });

    return;
  }

  // 2. Images
  if (req.url.startsWith('/img')) {
    fs.readFile('..' + req.url, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200);
      res.end(data);
    });

    return;
  }

  // 3. HTML routing
  res.setHeader('Content-Type', 'text/html');

  let path = '../html/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'index.html';
      break;
    case '/events':
      path += 'events.html';
      break;
    case '/projects':
      path += 'projects.html';
      break;
    case '/video-archive':
      path += 'video-archive.html';
      break;
    case '/contact-us':
      path += 'contact-us.html';
      break;
    default:
      path += '404.html';
      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
