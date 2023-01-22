import service from '../services/anecdotes'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const filterState = state.filter(as => as.id !== id)
      const newState = [...filterState, action.data]
      return newState.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

const initialize = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      'type': 'INIT',
      data,
    })
  }
}

const create = (content) => {
  return async dispatch => {
    const data = await service.createNew(content)
    dispatch({
      'type': 'NEW',
      data
    })
  }
}

const vote = (anecdote) => {
  return async dispatch => {
    const data = await service.updateVotes(anecdote)
    dispatch({
      'type': 'VOTE',
      data
    })
  }
}

export { create, vote, initialize }
export default reducer
