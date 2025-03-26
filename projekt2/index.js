const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./controllers/userController');
const recipeRoutes = require('./controllers/recipeController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', userRoutes);
app.use('/', recipeRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: Resource not found</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
