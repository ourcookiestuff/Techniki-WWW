const db = require('../database');

const User = {
    findByEmail: (email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            callback(err, row);
        });
    },
    create: (name, email, password, callback) => {
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
            callback(err, this.lastID);
        });
    }
};

module.exports = User;
