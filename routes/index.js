var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/users', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/users/new', function (req, res) {
  res.render('form')
})

module.exports = router
