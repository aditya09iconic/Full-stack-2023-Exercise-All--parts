import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {
  const notification = props.notification

  const style = {
    'border': 'solid',
    'padding': 10,
    'borderWidth': 1
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

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps,
  null
)(Notification)
