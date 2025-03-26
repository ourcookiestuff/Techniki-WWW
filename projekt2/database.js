const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)");
db.run("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, difficulty TEXT NOT NULL, time INTEGER NOT NULL, ingredients TEXT NOT NULL, steps TEXT NOT NULL, image TEXT, createdAt DATE NOT NULL, author TEXT NOT NULL)");

module.exports = db;
