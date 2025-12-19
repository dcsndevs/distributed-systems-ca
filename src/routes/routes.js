const crudController = require('../controllers/crud');

//assignt the controller methods to variables
const { allUsers, createUser, updateUser, deleteUser } = require('../controllers/crud');


module.exports = (req, res) => {
    const { url, method } = req;


    if (url === '/users' && method === 'GET') {
        // Display all users
        allUsers(req, res);

    } else if (url === '/create-user' && method === 'POST') {
        // Create a new user
        createUser(req, res);

    } else if (url.startsWith('/update-user/') && method === 'PUT') {
        // Update a user
        updateUser(req, res);

    } else if (url.startsWith('/delete-user/') && method === 'DELETE') {
        deleteUser(req, res);

    } else {
        // Invalid route
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};