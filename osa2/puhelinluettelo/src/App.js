import React, { useState, useEffect } from "react"
import { getAllPersons, createPerson, updatePerson, deletePerson } from "./services/persons"
import Notification from "./components/Notification"

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with <input onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input onChange={(e) => props.setNewName(e.target.value)} />
      </div>
      <div>
        number: <input onChange={(e) => props.setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, onDeletePerson }) => {
  return (
    <div>
      {personsToShow().map((person) => (
        <Person key={person.name} person={person} onDelete={onDeletePerson} />
      ))}
    </div>
  )
}

const Person = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const notify = (message, length = 5000) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, length)
  }

  const showError = (error, length = 5000) => {
    setError(error)
    setTimeout(() => {
      setError(null)
    }, length)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const existing = persons.find((p) => p.name === newName)
    if (!existing) {
      createPerson({
        name: newName,
        number: newNumber,
      }).then((person) => {
        setPersons(persons.concat(person))
        notify(`Added ${person.name}`)
      })
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(existing.id, {
          name: newName,
          number: newNumber,
        })
          .then((updated) => {
            setPersons([...persons.filter((p) => p.id !== existing.id), updated])
            notify(`Updated the number of ${updated.name} to ${updated.number}`)
          })
          .catch(() => {
            showError(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter((p) => p.id !== existing.id))
          })
      }
    }
  }

  const personsToShow = () => {
    if (filter === "") return persons
    return persons.filter((val) => val.name.toLowerCase().includes(filter.toLowerCase()))
  }

  useEffect(() => {
    getAllPersons().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const onDeletePerson = (id) => {
    const toDelete = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${toDelete.name} ?`)) {
      deletePerson(toDelete.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          notify(`Deleted ${toDelete.name}`)
        })
        .catch(() => {
          showError(`Information of ${toDelete.name} has already been removed from server`)
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifMessage={notification} errorMessage={error} />
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDeletePerson={onDeletePerson} />
    </div>
  )
}

export default App
