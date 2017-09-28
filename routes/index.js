var express = require('express')
var router = express.Router()

var db = require('../db')

// edit existing user
router.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id, req.app.get('connection'))
    .then(user => {
      const viewData = {
        action: '/users/' + id,
        name: user.name,
        email: user.email
      }
      res.render('formAction', viewData)
    })
})

router.post('/users/:id', (req, res) => {
  const formData = req.body
  const conn = req.app.get('connection')
  const id = Number(req.params.id)
  db.editUser(formData, id, conn)
    .then(function (formData) {
      return res.redirect('/users')
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// add new user

router.get('/users/new', function (req, res) {
  res.render('formAction', { Action: '/users/new' })
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

router.get('/users', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
