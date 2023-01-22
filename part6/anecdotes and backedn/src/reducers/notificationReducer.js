const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data.message
    case 'MUTE':
      return null
    default:
      return state
  }
}

const setNotification = (message) => ({
  'type': 'NOTIFY',
  'data': { message }
})

const clearNotification = () => ({
  'type': 'MUTE'
})

const notify = (message, timer = 3) => {
  return async dispatch => {
    await dispatch(setNotification(message))
    setTimeout(
      async () => await dispatch(clearNotification()),
      timer * 1000
    )
  }
}

export { notify }
export default reducer
