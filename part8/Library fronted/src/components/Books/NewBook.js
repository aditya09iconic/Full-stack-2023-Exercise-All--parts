import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../../queries'
import { useField } from '../../hooks.js'

const NewBook = ({ notifyWith }) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      notifyWith(error.message, 'error')
    }
  })

  const submit = (event) => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      }
    })

    notifyWith(`A new book ${title.value} written by ${author.value}`)

    title.reset()
    author.reset()
    published.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>title <input {...title.form} /></div>
        <div>author <input {...author.form} /></div>
        <div>published <input {...published.form} /></div>
        <div>
          <input {...genre.form} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
