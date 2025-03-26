const db = require('../database');

const Recipe = {
    getAll: (callback) => {
        db.all('SELECT * FROM recipes ORDER BY createdAt DESC LIMIT 8', (err, rows) => {
            callback(err, rows);
        });
    },
    findById: (id, callback) => {
        db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    },
    search: (query, callback) => {
        db.all('SELECT * FROM recipes WHERE LOWER(name) LIKE ?', [`%${query}%`], (err, rows) => {
            callback(err, rows);
        });
    },
    findByCategory: (category, callback) => {
        db.all('SELECT * FROM recipes WHERE category = ?', [category], (err, rows) => {
            callback(err, rows);
        });
    },
    create: (recipe, callback) => {

        db.run(
            `INSERT INTO recipes (name, category, difficulty, time, ingredients, steps, image, createdAt, author)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                recipe.title,
                recipe.category,
                recipe.difficulty,
                recipe.prepTime,
                JSON.stringify(recipe.ingredients),
                JSON.stringify(recipe.steps),
                recipe.image,
                recipe.createdAt,
                recipe.author
            ],
            (err) => {
                callback(err);
            }
        );
    }
};

module.exports = Recipe;
