const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER, // changed from USER to DB_USER
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database'); // Fixed typo
});

app.get('/', (req, res) => {
    console.log('Received a request');
    res.send('Hello, World!');
});

app.post('/api/terms', (req, res) => {
    const { term, definition } = req.body;
    db.query(
        "INSERT INTO terms (term, definition) VALUES (?, ?)",
        [term, definition],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(201).json({
                id: result.insertId
            });
        }
    );
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});