import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { create, deletePhone, getAll, update } from './services/phonebook';
import Notification from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

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
    const personObject = {
        name: newName,
        number: newNumber
      };
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const shouldUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (shouldUpdate) {
        update(existingPerson.id, personObject)
        .then(updatedData => {
          setPersons(persons.map(person => person.id === existingPerson.id ? updatedData : person));
          setNotification({message: 'Number updated successfully', type: 'success'});
        })
        .catch(() => {
          setNotification({message: `Information of ${existingPerson.name} has already been removed from the server`, type: 'error'});
        });
      }
    } else {
      create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNotification({message: 'Number added successfully', type: 'success'});
      })
      .catch(err => {
        setNotification({message: err.message, type: 'error'});
      })
    }
    setNewName('');
    setNewNumber('');
    setTimeout(() => setNotification({
      message: '',
      type: ''
    }), 3000);
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
      <Notification message={notification.message} type={notification.type}/>
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