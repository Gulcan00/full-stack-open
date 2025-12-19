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

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter(p => p.id !== id);

  return res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 100000);
}

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

  if (phonebook.some(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: String(generateId()),
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(person);
  return res.json(person);
})

app.get('/info', (req, res) => {
  return res.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
    `);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

