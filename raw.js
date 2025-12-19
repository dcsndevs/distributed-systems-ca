// Non-Modular Code Example for a Simple Server
const http = require('http');
// Sample in-memory data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];
// Function to handle incoming requests
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/users' && method === 'GET') {
    // Display all users
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (url === '/create-user' && method === 'POST') {
    // Create a new user
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created', user: newUser }));
    });
  } else if (url.startsWith('/update-user/') && method === 'PUT') {
    const userId = parseInt(url.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedUser = JSON.parse(body);
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...updatedUser };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User updated', user: users[userIndex] }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    });
  } else if (url.startsWith('/delete-user/') && method === 'DELETE') {
    const userId = parseInt(url.split('/')[2]);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User deleted', user: deletedUser[0] }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else {
    // Invalid route
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};
// Create the server
const server = http.createServer(requestHandler);
// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
