import { useMutation } from '@apollo/client'
import React, { useState } from "react"
import Select from "react-select"

import { EDIT_AUTHOR, ALL_AUTHORS } from '../../queries'
import { useField } from '../../hooks'

function EditBornYear({ authors, notifyWith }) {
  const born = useField('number')
  const [selectedOption, setSelectedOption] = useState(null)
  const options = authors.map(a => { return { 'label': a.name, 'value': a.id } })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notifyWith(error.message, 'error')
    }
  })

  function submit(event) {
    event.preventDefault()

    editAuthor({
      variables: {
        name: selectedOption.label,
        born: Number(born.value)
      }
    })

    notifyWith(`The born of ${selectedOption.label} is edited to ${born.value}`)
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select onChange={setSelectedOption} options={options} />
        <div>born <input {...born.form} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditBornYear 
