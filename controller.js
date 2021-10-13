const pool = require('../../db');
const queries = require('./queries');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');


const getUsers = (req, res) => {
    pool.query(queries.getUsers,(error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
    })
};



const addUser = async (req, res) => {
    const { first_name, last_name, password, username } = req.body;
    const account_created = new Date();
    const hash = await bcrypt.hash(password,10);
    
    pool.query(queries.checkEmailExists, [username], (error, results) => {
        if(results.rows.length) {
            return res.status(400).send("Email already exists.");
        }

        pool.query(queries.addUser, [first_name, last_name, hash, username, account_created], (error, results) => {
            if(error) throw error;
            return res.status(201).send("User added successfully!");
        });
    });
};

const updateUser = async (req, res) => {
    const {first_name, last_name, password, username} = req.body;
    const account_updated = new Date();
    const hash = await bcrypt.hash(password,10);
    console.log('Update')
    pool.query(queries.updateUser,[first_name, last_name, hash, username, account_updated], (error, results) => {
        if(error) throw error;
        return res.status(204).send("User updated");
    });

};

const getUser = async (username) => {
    return new Promise(function(resolve, reject) {
        pool.query(queries.getUserByUsername, [username], (error, results) => {
            if (error) {
                console.log(error);
            }
            if (!results || !results.rows || !results.rows.length) {
                resolve(null);
            } else {
                const user = results.rows[0].username;
                const hashedPass = results.rows[0].password;
                resolve({user, hashedPass});
            }

        });
    })
    
};

const authenticate = async (username, password) => {
    const userInfo = await getUser(username);
    if (!userInfo) {
        return null;
    }
    const user = userInfo.user;
    const hashedPass = userInfo.hashedPass;
    const verify = await bcrypt.compare(password, hashedPass);
    if ( user && hashedPass && user === username && verify) {
        return user;
    } else {
        return null;
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    authenticate
};
