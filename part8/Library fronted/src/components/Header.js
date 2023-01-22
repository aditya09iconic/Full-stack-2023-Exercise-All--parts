import { Link } from "react-router-dom"
import React from 'react'

const Header = ({ logout, token }) => {
  return (
    <div>
      <Link to="/"><button>authors</button></Link>
      <Link to="/books"><button>books</button></Link>
      {
        !token &&
        <Link to="login"><button>login</button></Link>
      }
      {
        token &&
        <Link to="newbook"><button>add book</button></Link>
      }
      {
        token &&
        <Link to="recommend"><button>recommend</button></Link>
      }
      {
        token &&
        <button onClick={() => { logout() }}>logout</button>
      }
    </div>
  )
}

export default Header
