var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var validator = require('express-validator')
var app = express()
var Cat = require('./models').Cat
var User = require('./models').User
var path = require('path')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../cat-tinder-frontend/build')));

app.get('/api/cats', (req, res) => {
  Cat.findAll().then( (cats) =>{
    res.json({cats:cats})
  })
})

app.get('/api/cat/:id', (req, res) => {
  Cat.findAll({
    where: {
        id: req.params["id"],
    }
  }).then( (cat) =>{
    res.json(cat)
  })
})

app.post('/api/user', (req, res) => {
  req.checkBody('authToken', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        // find user by email
        User.find({ where: {authToken: req.body.authToken} }).then((user) => {
          if(user.authExpired()){
            res.status(400)
            res.json({errors: {message: "Please log in again"}})
          } else {
            res.status(201)
            res.json({user: user})
          }
        }).catch((error) => {
          res.status(400)
          res.json({errors: {message: "User not found"}})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/api/login', (req, res) => {
  req.checkBody('email', 'Is required').notEmpty()
  req.checkBody('password', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        // find user by email
        User.find({ where: {email: req.body.email} }).then((user) => {
            // check users password
            if(user.verifyPassword(req.body.password)){
              user.setAuthToken()
              user.save().then((user) => {
                // return user if success
                res.status(201)
                res.json({user: user})
              })
            } else {
              res.status(400)
              res.json({errors: {message: "User not found"}})
            }
        }).catch((error) => {
          res.status(400)
          res.json({errors: {message: "User not found"}})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/api/signup', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('email', 'Is required').notEmpty()
  req.checkBody('password', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        User.create({
          name: req.body.name,
          email: req.body.email,
          favcolor: req.body.favcolor,
          password: req.body.password
        }).then((user)=>{
          res.status(201)
          res.json({user: user})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/api/cats', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('age', 'Is required').notEmpty()
  req.checkBody('enjoys', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) => {
      if(validationErrors.isEmpty()){
        Cat.create({
          name: req.body.name,
          age: req.body.age,
          enjoys: req.body.enjoys
        }).then((cat)=>{
          res.status(201)
          res.json({cat: cat})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../cat-tinder-frontend/build', 'index.html'));
});

module.exports = app
