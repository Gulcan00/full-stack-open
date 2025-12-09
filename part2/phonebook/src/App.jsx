import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { create, deletePhone, getAll } from './services/phonebook';
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAll()
    .then(data => setPersons(data));
  }, [])

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
      create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
      })
      setNewName('');
      setNewNumber('');
    }
  }

  const deletePerson = (id, name) => {
    const shouldDelete = confirm(`Delete ${name}?`);
    if (shouldDelete) {
      deletePhone(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)));
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App