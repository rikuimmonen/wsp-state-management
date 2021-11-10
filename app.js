'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
