const express = require('express');
const morgan = require('morgan');
const app = express();

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

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
    return res.json(phonebook);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebook.find(p => p.id === id);

  if (person) {
    return res.json(person);
  } else {
    return res.status(404).end();
  }
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

