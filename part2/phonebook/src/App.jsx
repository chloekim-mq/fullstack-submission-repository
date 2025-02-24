import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
    })
}
, [])

  const addPerson = (event) => {
      event.preventDefault()

      if (persons.find(person => person.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
      }

      const personObject = {
          name: newName,
          number: newNumber
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
          console.log(response)
      })
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }

    const handleRemove = (id, name) => {
      if (window.confirm(`Delete ${name} ?`)) {
        personService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          )
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleRemove={handleRemove} />
    </div>
  )
}

export default App