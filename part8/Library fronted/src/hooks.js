import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState()

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue()
  }

  return {
    form: {
      type,
      value,
      onChange
    },
    value,
    reset
  }
}

export { useField }
