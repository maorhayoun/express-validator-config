var express = require('express');
var expressValidator = require('express-validator');
var validatorConfig = require('../index');

var app = express();
app.use(expressValidator());
var validator = validatorConfig({
  configuration: {
    '/': {
      query: {
        name:  {
          notEmpty: true
        }
      }
    }
  }
});

app.get('/', validator, function (req, res, next) {
  res.send(`Hello ${req.query.name}!`);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
  next(err);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
