const Persons = ({ filter, persons, handleRemove }) => {
    let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))    
    const personsToShow = filter === ''

    return (
      <div>
        {personsToShow ?
        persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleRemove(person.id, person.name)}>Delete</button> </p>)
        : filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={handleClick}>Delete</button> </p>)}
      </div>
    )
  }

export default Persons