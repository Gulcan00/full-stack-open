import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
   { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
       filter shown with: <input value={search} onChange={handleSearchChange}/>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/><br />
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App