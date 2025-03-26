const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/login', (req, res) => {
    res.render('loginScreen');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
        }
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        res.json({ message: 'Zalogowano pomyślnie' });
    });
});

router.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Błąd wylogowania' });
        }
        res.json({ message: 'Wylogowano pomyślnie' });
    });
});

router.get('/registration', (req, res) => {
    res.render('registrationScreen');
});

router.post('/registration', (req, res) => {
    const { name, email, password } = req.body;
    User.findByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Błąd bazy danych' });
        }
        if (user) {
            return res.status(400).json({ message: 'Użytkownik o tym adresie e-mail już istnieje.' });
        }
        User.create(name, email, password, (err, userId) => {
            if (err) {
                return res.status(500).json({ message: 'Błąd przy zapisie do bazy danych' });
            }
            res.status(200).json({ message: 'Użytkownik zarejestrowany pomyślnie.' });
        });
    });
});

module.exports = router;
