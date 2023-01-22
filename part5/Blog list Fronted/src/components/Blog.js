import React, { useState } from 'react'

const Blog = (props) => {
  const { blog, handleLikeChange, handleRemove } = props

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    'paddingTop': 10,
    'paddingLeft': 2,
    'border': 'solid',
    'borderWidth': 1,
    'marginBottom': 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogTitle'>
        <div>
          {blog.title} by {blog.author} <button id='view' onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='blogAll'>
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div id='likes'>
          {blog.likes} <button onClick={() => handleLikeChange(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
