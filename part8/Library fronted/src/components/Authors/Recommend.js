import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_BOOKS, CURRENT_USER } from '../../queries'
import Book from '../Books/Book'

const Recommend = ({ token }) => {
  const bookResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(CURRENT_USER)
  const history = useHistory()

  if (bookResult.loading || meResult.loading) return <div>loading...</div>

  if (!token) {
    history.push('/')
  }

  const me = meResult.data.me
  const books = bookResult.data.allBooks.filter(b =>
    b.genres.includes(me.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>patterns</b></div>
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
    </div>
  )
}

export default Recommend
