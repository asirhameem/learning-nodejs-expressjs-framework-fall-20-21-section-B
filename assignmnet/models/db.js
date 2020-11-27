const mysql = require('mysql');

function getConnection(callback) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'clothing_store'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });

    callback(connection);
}

module.exports = {
    getResults: function(sql, callback) {
        getConnection(function(connection) {
            connection.query(sql, function(error, results) {
                callback(results);
            });

            connection.end(function(err) {
                console.log('connection closed!');
            });
        });
    },
    execute: function(sql, callback) {
        getConnection(function(connection) {
            connection.query(sql, function(error, status) {
                if (status) {
                    callback(true);
                } else {
                    callback(false);
                }
            });

            connection.end(function(err) {
                console.log('connection closed!');
            });
        });
    }
}