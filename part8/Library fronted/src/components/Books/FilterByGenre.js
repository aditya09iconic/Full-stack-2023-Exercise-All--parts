import React from 'react'

const FilterByGenre = ({ genres, onClick }) => (
  <div>
    {
      genres.map(genre =>
        <button key={genre} onClick={() => onClick(genre)}>{genre}</button>
      )
    }
  </div>
)

export default FilterByGenre
