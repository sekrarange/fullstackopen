import { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    if (!country) return
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${
          country.capitalInfo.latlng[0]
        }&lon=${country.capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [country])

  if (!country) return null

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img
        style={{ border: "1px solid black" }}
        src={country.flags.png}
        alt={country.flags.alt}
      />
      {!!Object.keys(weather).length && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {weather.main.temp} Celsius</div>
          {weather.weather.map((weather, idx) => (
            <img key={idx} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
          ))}
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data))
  }, [])

  useEffect(() => {
    setFilteredCountries(
      searchTerm
        ? allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : []
    )
  }, [allCountries, searchTerm])

  return (
    <>
      <div>
        find countries <input onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map((country, idx) => (
          <div key={idx}>
            {country.name.common}{" "}
            <button onClick={() => setFilteredCountries([country])}>show</button>
          </div>
        ))
      ) : (
        <Country country={filteredCountries[0]} />
      )}
    </>
  )
}

export default App
