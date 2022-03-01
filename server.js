const http = require('http');
const app = require('./app');
const colors = require('colors');


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,console.log(`Server running on port  : ${port}` .red.underline.bold));

  