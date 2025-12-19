require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

const customMorganFormat = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms', 
    JSON.stringify(req.body)
  ].join(' ')
});
app.use(customMorganFormat);

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      return res.json(persons);
    })
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
     return res.json(person);
  })
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id).then(() => {
    return res.status(204).end();
  })
  .catch(err => next(err))
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    let msg = '';
    if (!body.name) msg += 'name is missing; ';
    if (!body.number) msg += 'number is missing; ';
    return res.status(400).json({
      error: msg
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(newPerson => {
    return res.json(newPerson);
  }) 
})

app.get('/info', (req, res) => {
  Person.find({}).then(people => {
    return res.send(`
    <p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}</p>
    `);
  })
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

