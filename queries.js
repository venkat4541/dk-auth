const getUsers = "SELECT id, first_name, last_name, username, account_created, account_updated FROM users";
const checkEmailExists = "SELECT u FROM users u WHERE u.username = $1";
const addUser = "INSERT INTO users (id, first_name, last_name, password, username, account_created) VALUES ($1, $2, $3, $4, $5, $6)";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const updateUser = "UPDATE users SET first_name = $1, last_name = $2, password = $3, account_updated = $5 WHERE username = $4";

const getUserByCred = "SELECT id, first_name, last_name, username, account_created, account_updated FROM users WHERE username = $1 AND password = $2";


module.exports = {
    getUsers,
    checkEmailExists,
    addUser,
    getUserByUsername,
    getUserByCred,
    updateUser,
};
