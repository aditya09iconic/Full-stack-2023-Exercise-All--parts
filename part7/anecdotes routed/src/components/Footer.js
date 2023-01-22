import React from 'react'

const Footer = () => {
  const sourceCode = 'https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'
  const courseUrl = 'https://courses.helsinki.fi/fi/tkt21009'

  return (
    <div>
      Anecdote app for <a href={courseUrl}>Full Stack - websovelluskehitys</a>.
      <br />
      See <a href={sourceCode}>{sourceCode}</a> for the source code.
    </div>
  )
}

export default Footer
