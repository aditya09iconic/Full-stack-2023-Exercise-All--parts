import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import { Person } from './model.js'
import { unknownEndpoint, errorHandler } from './middleware.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))


app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people <br /> ${Date()}`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})


app.get('/api/persons/query/:name', (req, res, next) => {
  const name = req.params.name

  Person.findOne({ "name": name })
    .then(result => {
      res.json(result)
    }).catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  }).catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
