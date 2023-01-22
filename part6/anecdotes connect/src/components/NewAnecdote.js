import { connect } from 'react-redux'
import React from 'react'

import { create } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    props.create(content)
    props.notify(`You created '${content}'`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => createAnecdote(event)}>
        <div><input name="content" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { create, notify }
)(NewAnecdote)
