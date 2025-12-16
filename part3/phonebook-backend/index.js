const express = require('express');
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

