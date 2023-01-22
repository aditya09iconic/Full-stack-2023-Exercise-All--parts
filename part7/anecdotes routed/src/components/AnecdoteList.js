import React from 'react'

import { AnecdoteTitle } from './Anecdote'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote =>
          <AnecdoteTitle key={anecdote.id} anecdote={anecdote} />
        )
      }
    </ul>
  </div>
)

export default AnecdoteList
