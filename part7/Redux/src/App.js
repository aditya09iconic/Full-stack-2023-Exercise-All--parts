import React, { useState, useEffect } from "react"

import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, 3000)
  }


  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <LoginForm
        notifyWith={notifyWith}
        user={user}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {
        user &&
        <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
      }
    </div>
  )
}

export default App
