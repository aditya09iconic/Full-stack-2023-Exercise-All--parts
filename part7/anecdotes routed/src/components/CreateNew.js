import { useHistory } from 'react-router-dom';
import React from 'react'

import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('text')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      'content': content.value,
      'author': author.value,
      'url': url.value,
      'votes': 0
    })
    props.notifyWith(`a new anecdote ${content.value} created!`)
    history.push('/')
  }

  const reset = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author <input type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url <input type={url.type} value={url.value} onChange={url.onChange} />
        </div>
        <div>
          <button type='submit'>create</button>
          <button type='button' onClick={reset}>reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew
