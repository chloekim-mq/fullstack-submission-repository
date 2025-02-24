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
      
      const existingPerson = persons.find(person => person.name === newName)
      //if (persons.find(person => person.name === newName)) {
          //alert(`${newName} is already added to phonebook`)
          //return
      //}
      
      if (existingPerson) {
        const id = existingPerson.id
        const updatedPerson = { ...existingPerson, number: newNumber }

        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          )
          setNewName('')
          setNewNumber('')
        })
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
  }

      personService
      .create(newPerson)
      .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
      })

      axios
      .post('http://localhost:3001/persons', newPerson)
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