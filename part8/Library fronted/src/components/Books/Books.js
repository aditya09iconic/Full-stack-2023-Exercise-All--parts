import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'

import { ALL_BOOKS } from '../../queries'
import Book from './Book'
import FilterByGenre from './FilterByGenre'

const Books = () => {
  const [filterGenre, setFilterGenre] = useState()
  const [loadingResult, result] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: filterGenre }
  })

  useEffect(() => {
    loadingResult()
  }, [loadingResult])

  if (!result.called || result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  let genres = Array.prototype.concat.apply([], books.map(b => b.genres))
  genres = [...new Set(genres)]

  const onClick = (value) => {
    setFilterGenre(value)
    loadingResult()
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.map(book =>
              <Book key={book.title} book={book} />
            )
          }
        </tbody>
      </table>
      <FilterByGenre genres={genres} onClick={onClick} />
    </div>
  )
}

export default Books
