'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const passport = require('./utils/pass');
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('eväste asetettu');
});

app.get('/getCookie', (req, res) => {
  // console.log(req.cookies);
  res.send('evästeessä "color" lukee ' + req.cookies.color);
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('eväste poistettu');
});

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    },
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
