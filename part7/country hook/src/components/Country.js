import React from 'react'

const Country = ({ country }) => {
  console.log(country)
  let component = (
    <div>
      not found...
    </div>
  )

  if (country) {
    const coun = country.data[0]
    component = (
      <div>
        <h3>{coun.name} </h3>
        <div>capital {coun.capital} </div>
        <div>population {coun.population}</div>
        <img src={coun.flag} height='100' alt={`flag of ${coun.name}`} />
      </div>
    )
  }

  return component
}

export default Country
