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
    const id = uuidv4();

    const hash = await bcrypt.hash(password,10);
    
    pool.query(queries.checkEmailExists, [username], (error, results) => {
        if(results.rows.length) {
            return res.status(400).send("Email already exists.");
        }

        pool.query(queries.addUser, [id, first_name, last_name, hash, username, account_created], (error, results) => {
            if(error) throw error;
            return res.status(201).send("User added successfully!");
        });
    });
};

const updateUser = async (req, res) => {
    const {first_name, last_name, password, username} = req.body;
    const account_updated = new Date();

    const hash = await bcrypt.hash(password,10);

    pool.query(queries.getUserByUsername, [username], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            return res.status(400).send("User doesn't exist");
        }

        pool.query(queries.updateUser,[first_name, last_name, hash, username, account_updated], (error, results) => {
            if(error) throw error;
            return res.status(204).send("User updated");
        });
    });

};


module.exports = {
    getUsers,
    addUser,
    updateUser,
};