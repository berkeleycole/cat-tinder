var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var validator = require('express-validator')
var app = express();
var Cat = require('./models').Cat


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
});

app.get('/cats', (req, res) => {
  Cat.findAll().then( (cats) =>{
    res.json({cats:cats})
  })
})

app.get('/cat/:id', (req, res) => {
  Cat.findAll({
    where: {
        id: req.params["id"],
    }
  }).then( (cat) =>{
    res.json(cat)
  })
})

app.post('/cats', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('age', 'Is required').notEmpty()
  req.checkBody('enjoys', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) =>{
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

module.exports = app
