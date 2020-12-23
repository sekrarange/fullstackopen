import React, { useState } from 'react'

const Filter = ({setFilter}) => {
  return (
    <div>
      filter shown with <input onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = props => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input onChange={e => props.setNewName(e.target.value)} />
      </div>
      <div>
        number: <input onChange={e => props.setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <div>
      {personsToShow().map((person) =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const addPerson = e => {
    e.preventDefault()
    if (!persons.find(p => p.name === newName)) {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = () => {
    if (filter === "") return persons
    return persons.filter(val => val.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App