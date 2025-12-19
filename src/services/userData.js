let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

exports.getAllUsers = () => users;


exports.addUser = (user) => {
    users.push(user);
    return user;
};


exports.updateUser = (id, updatedData) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;


    users[index] = { id, ...updatedData };
    return users[index];
};


exports.deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;

    return users.splice(index, 1)[0];
};