import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

import { notify } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)


const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let res = anecdotes
    if (filter) {
      res = anecdotes.filter(anecdote =>
        anecdote.content.includes(filter))
    }

    return res
  })

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notify(`You voted '${anecdote.content}'`))
  }

  return (
    <div>
      <div>
        {
          anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote}
              handleClick={() => handleVote(anecdote)} />
          )
        }
      </div>
    </div>
  )
}

export default Anecdotes
