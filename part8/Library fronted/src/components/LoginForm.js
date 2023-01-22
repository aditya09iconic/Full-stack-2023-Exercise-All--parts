import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'

import { LOGIN } from '../queries'
import { useField } from '../hooks'

const LoginForm = ({ token, setToken, notifyWith }) => {
  const username = useField('text')
  const password = useField('password')
  const history = useHistory()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notifyWith(error.message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      history.push('/')
    }
  }, [history, result.data, setToken])

  if (token) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })

    notifyWith(`${username.value} succeeded log in`)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input {...username.form} />
        </div>
        <div>
          password <input {...password.form} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm