import { BrowserRouter as Router } from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './css/index.css'

ReactDOM.render(
  <Router >
    <App />
  </Router >,
  document.getElementById('root')
)