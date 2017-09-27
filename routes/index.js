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

router.post('/users/new', function (req, res) {
  const newUserData = req.body
  db.addUser(newUserData, req.app.get('connection'))
    .then(function (users) {
      return res.redirect('/users/')
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
