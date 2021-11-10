'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express();
const port = 3000;
const username = 'foo';
const password = 'bar';

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false,
}));

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

app.get('/secret', (req, res) => {
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

app.post('/login', (req, res) => {
  if (req.body.password === password && req.body.username === username) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
