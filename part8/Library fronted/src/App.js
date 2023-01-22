import { Switch, Route } from "react-router-dom"
import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useState, useEffect } from 'react'

import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Authors from './components/Authors/Authors'
import Books from './components/Books/Books'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NewBook from './components/Books/NewBook'
import Notification from "./components/Notification"
import Recommend from './components/Authors/Recommend'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      notifyWith(`${book.title} added`)
      updateCacheWith(book)
    }
  })

  useEffect(() => {
    const token = window.localStorage.getItem("user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  const notifyWith = (message, type = "success", timer = 3000) => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, timer)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    notifyWith(`succeeded log out`)
  }

  return (
    <div>
      <Header logout={logout} token={token} />
      <Notification notification={notification} />

      <Switch>
        <Route path="/login">
          <LoginForm token={token} setToken={setToken} notifyWith={notifyWith} />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/newbook">
          <NewBook notifyWith={notifyWith} />
        </Route>
        <Route path="/recommend">
          <Recommend token={token} />
        </Route>
        <Route path="/">
          <Authors token={token} notifyWith={notifyWith} />
        </Route>
      </Switch>
    </div >
  )
}

export default App
