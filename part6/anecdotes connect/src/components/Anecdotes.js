import { connect } from 'react-redux'
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


const Anecdotes = (props) => {
  const handleVote = (anecdote) => {
    props.vote(anecdote)
    props.notify(`You voted '${anecdote.content}'`)
  }

  return (
    <div>
      <div>
        {
          props.anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote}
              handleClick={() => handleVote(anecdote)} />
          )
        }
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  let res = state.anecdotes
  if (state.filter) {
    res = state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter))
  }

  return {
    'anecdotes': res
  }
}


export default connect(
  mapStateToProps,
  { vote, notify }
)(Anecdotes)
