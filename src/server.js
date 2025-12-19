const routes = require('./routes/routes');

const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    routes(req, res);
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});