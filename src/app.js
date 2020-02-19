const express = require('express');
const app = express();

let mysql= require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

app.get('/', (req, res) => {
    connection.connect();

    connection.query('SELECT * FROM t_prueba', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows)
    });

    connection.end();
});

app.listen(3000, () => console.log('Listening on port 3000'));

