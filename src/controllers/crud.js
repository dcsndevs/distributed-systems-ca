const userOptions = require('../services/userData');


exports.allUsers = (req, res) => {
    const users = userOptions.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};


exports.createUser = (req, res) => {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
        const user = JSON.parse(body);
        const newUser = userOptions.addUser(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created', user: newUser }));
    });
};


exports.updateUser = (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
    const updatedData = JSON.parse(body);
    const updatedUser = userOptions.updateUser(userId, updatedData);


        if (!updatedUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'User not found' }));
        }


        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User updated', user: updatedUser }));
    });
};


exports.deleteUser = (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
    const deletedUser = userOptions.deleteUser(userId);


    if (!deletedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User not found' }));
    }


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted', user: deletedUser }));
};