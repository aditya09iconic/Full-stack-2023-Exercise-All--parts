import { useDispatch } from 'react-redux'
import React from 'react'

import { filterChange } from '../reducers/filterReducer'

const FilterAnecdotes = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default FilterAnecdotes
