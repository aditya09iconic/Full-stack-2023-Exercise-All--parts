import React, { useState } from 'react'

const CreateBlog = props => {
  const { addBlog } = props

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={event => addBlog(event, title, author, url)}>
        <div>title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit" id='create'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog
