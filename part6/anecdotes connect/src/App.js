import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { initialize } from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'
import FilterAnecdotes from './components/FilterAnecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    < div >
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdotes />
      <Anecdotes />
      <NewAnecdote />
    </div >
  )
}


export default App
