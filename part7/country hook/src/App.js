import axios from 'axios'
import React, { useState } from 'react'

import { useField } from './hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.eu/rest/v2/name/${nameInput.value}?fullText=true`

  const fetch = async (e) => {
    e.preventDefault()
    let response = null
    try {
      response = await axios.get(url)
    } finally {
      setCountry(response)
    }
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App