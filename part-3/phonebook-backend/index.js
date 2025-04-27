const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body'](req, res),
    ].join(' ')
  })
)

// Handle known paths

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => next(error))
})

app.get('/api/info', (req, res, next) => {
  Person.countDocuments({})
    .then((length) => {
      const numData = `Phonebook has data for ${length} people`
      const date = Date()
      res.send(`<div>${numData}</div><div>${date}</div>`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const params = req.params
  Person.findById(params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  const person = new Person({
    name,
    number,
  })
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const params = req.params
  Person.findByIdAndUpdate(
    params.id,
    {
      name: req.body.name,
      number: req.body.name,
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

// Handle unknown paths
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Handle errors
const errorHandler = (error, req, res, next) => {
  console.log('Error:', error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server listening on port ', PORT)
})
