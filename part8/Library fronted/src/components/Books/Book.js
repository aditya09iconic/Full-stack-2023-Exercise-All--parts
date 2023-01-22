import React from 'react'

const Book = ({ book }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

export default Book
