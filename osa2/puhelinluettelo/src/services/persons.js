import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAllPersons = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export const createPerson = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

export const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}
