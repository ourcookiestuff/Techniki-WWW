const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    Recipe.getAll((err, recipes) => {
        if (err) return console.error(err.message);
        res.render('index', { recipes: recipes });
    });
});

router.get('/add', (req, res) => {
    res.render('addRecipe');
});

router.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    Recipe.search(query, (err, recipes) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Błąd podczas wyszukiwania przepisów.');
        }
        res.render('index', { recipes: recipes });
    });
});

router.get('/category', (req, res) => {
    const category = req.query.category;
    Recipe.findByCategory(category, (err, recipes) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Błąd podczas wyszukiwania przepisów.' });
        }
        res.render('catalogScreen', { recipes: recipes, categoryName: category });
    });
});

router.post('/add-recipe/submit', upload.single('recipeImage'), (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Musisz być zalogowany, aby dodać przepis.');
    }

    const { recipeData } = req.body;

    const recipe = JSON.parse(recipeData);
    recipe.image = req.file ? `/uploads/${req.file.filename}` : null;
    recipe.createdAt = recipe.date || new Date().toISOString();
    recipe.author = req.session.user.name;

    let difficultyText;
    switch (recipe.difficulty) {
        case '1':
            difficultyText = 'Łatwy';
            break;
        case '2':
            difficultyText = 'Średni';
            break;
        case '3':
            difficultyText = 'Trudny';
            break;
        default:
            difficultyText = 'Nieokreślony';
    }

    recipe.difficulty = difficultyText;

    Recipe.create(recipe, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Błąd podczas zapisywania przepisu.');
        }
        res.status(200).send('Przepis został zapisany.');
    });
});

router.get('/recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    Recipe.findById(recipeId, (err, recipe) => {
        if (err || !recipe) {
            return res.status(404).json({ message: 'Przepis nie znaleziony' });
        }
        res.render('recipeDetails', { recipe: recipe });
    });
});

module.exports = router;
