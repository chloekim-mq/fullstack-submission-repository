const Persons = ({ filter, persons }) => {
    let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))    
    const personsToShow = filter === ''

    return (
      <div>
        {personsToShow ? persons.map(person => <p key={person.name}>{person.name} {person.number}</p>) : filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
  }

export default Persons