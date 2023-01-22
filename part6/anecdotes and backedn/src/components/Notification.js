import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let component = null
  if (notification) {
    component = (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return component
}

export default Notification
